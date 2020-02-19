const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');
//por padrão o controller tem 5 funcoes...: pode ser 
//index, - lista 
//show, - um único
//store, - criar
//update, - alterar
//destroy - deletar 

module.exports = {

    async index(request, response) {
        const devs = await Dev.find(); //daria para colocar filtros aqui.

        return response.json(devs);
    },

    async store(request, response) {
    /*
    {
        "github_username" : "oguima",
        "techs": "ReactJS, React Native, Node.js"
        "latitude": -25.4481276
        "longitude": -49.2942842
    }
    */

    //Desestruturação JS6
    const { github_username , techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({ github_username });

    //Apenas se não encontrar, cadastra ...
    if (!dev) {

        //Para consumir a API do GitHub: yarn add axios //Faz chamada para outras APIS.
        //Template Strings
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        //Debug:
        console.log(apiResponse.data); //Devolve os dados recebidos do Git...
        /*
        {
    login: 'Oguima',
    id: 2325202,
    node_id: 'MDQ6VXNlcjIzMjUyMDI=',
    avatar_url: 'https://avatars2.githubusercontent.com/u/2325202?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/Oguima',
    html_url: 'https://github.com/Oguima',
    followers_url: 'https://api.github.com/users/Oguima/followers',
    following_url: 'https://api.github.com/users/Oguima/following{/other_user}',
    gists_url: 'https://api.github.com/users/Oguima/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/Oguima/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/Oguima/subscriptions',
    organizations_url: 'https://api.github.com/users/Oguima/orgs',
    repos_url: 'https://api.github.com/users/Oguima/repos',
    events_url: 'https://api.github.com/users/Oguima/events{/privacy}',
    received_events_url: 'https://api.github.com/users/Oguima/received_events',
    type: 'User',
    site_admin: false,
    name: 'Rafael Guimarães dos Santos',
    company: 'Guima Games',
    blog: 'https://guima-games.firebaseapp.com/',
    location: 'Curitiba Paraná',
    email: null,
    hireable: true,
    bio: 'Desenvolvedor Mobile,  amante de interatividades e jogos.',
    public_repos: 15,
    public_gists: 0,
    followers: 1,
    following: 19,
    created_at: '2012-09-11T13:52:28Z',
    updated_at: '2020-01-08T14:14:53Z'
    }
        */

        console.log("Body:" + request.body.github_username + '\n' + request.body.techs);
    
        //Quais dados pegar da API...
        
        /*
        let { name, avatar_url, bio } = apiResponse.data; //let é uma variavel...
        //Como o name pode estar vazio...
        if (!name) {
            name = apiResponse.data.login; //Pega o login, que é obrigatório...
        }*/

        //Desestruturação JS6., pega o name, se nao achar pega o login ... 
        const { name = login, avatar_url, bio } = apiResponse.data; //let é uma variavel...

        //TRansforma a string separada por virgula, em array, removendo espacos em branco...
        const techsArray = parseStringAsArray(techs);  //techs.split(',').map(tech => tech.trim()); //map, percorre todo array
        
        //Para pegar a latitude e longitude enviada pelo usuário...
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        //caso o nome da variavel seja o mesmo nao precisa duplicar... name: name ...
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });

        //filtrar as conexões: precisa estar a 10km de distancia.
        //e que o novo dev possua ao menos uma das tecnologias filtradas...
        const sendSocketMessageTo = findConnections(
            { latitude, longitude} ,
            techsArray,
        )

        //console.log(sendSocketMessageTo);
        sendMessage(sendSocketMessageTo, 'new-dev' , dev );

        //Todas informaçOes:
        //console.log(name, avatar_url, bio, github_username);
    }
    
    //Para monitorar as alterações do arquivo, tem que instalar...:
    //yarn add nodemon -D // -D dependencia de desenvolvimento, fica em devDependencies
    //return response.json({message: 'Exemplo: Corpo:' + request.body.github_username}); //Resposta do servidor...
    return response.json(dev); //Devolve o ID ...
    }
};
