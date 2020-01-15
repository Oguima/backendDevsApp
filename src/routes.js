const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//Regras Restfull ... ajustes da semantica....
//Métodos HTTP: get, post, put, delete
//get - receber uma informação...
//post - criar alguma info  (Precisa de uma ferramenta... como o Insomminia.rest)
//put - editar um recurso
//delete - deletar ...

//GET: Testes diretamente no navegador ... outros usar o Insomminia.

//Tipos de paarâmetros: 3 tipos.
//Query Params:  para acessar:  req.query (Filtros, ordenação, paginação, ...)
//  /users?search=Rafael  //Incorporados na URL...
//Route Params: Put / Delete ... par editar ou deletar 1 ...  /users/1 ... não tem nome
 //o parametro fica na rota...
//Body: post / put ...  request.body

//arrow function.... req = requisiçAo,, e o response   (http://localhost:3333)
routes.get('/', (request, response) => {
    //return response.send("Hello World");

    //Para monitorar as alterações do arquivo, tem que instalar...:
    //yarn add nodemon -D // -D dependencia de desenvolvimento, fica em devDependencies
    return response.json({message: 'Hello backend'}); //Resposta do servidor...

});

//Rota /users ... , recebendo um query Params (http://localhost:3333/users)
routes.get('/users', (request, response) => {
   //return response.send("Hello World");

   //Debug:
   console.log(request.query); //devolve o json todo do parametro...

   //Para monitorar as alterações do arquivo, tem que instalar...:
   //yarn add nodemon -D // -D dependencia de desenvolvimento, fica em devDependencies
   return response.json({message: 'Devolvendo o request query, no log:' + request.query.search}); //Resposta do servidor...
});

//Recebendo um Route params  :id   ((http://localhost:3333/1))
routes.delete('/users/:id', (request, response) => {
   //return response.send("Hello World");

   //Debug:
   console.log("ID:" + request.params.id);

   //Para monitorar as alterações do arquivo, tem que instalar...:
   //yarn add nodemon -D // -D dependencia de desenvolvimento, fica em devDependencies
   return response.json({message: 'Exemplo: Deletar user:' + request.params.id}); //Resposta do servidor...
});


//Via Body: post / put ... enviar informacoes no corpo da requisição...
//Importante, para identificar JSOn, tem que avisar o express, disso com:
//app.use //app.use(express.json()); //(post http://localhost:3333/users)
routes.post('/users', (request, response) => {
   //return response.send("Hello World");

   /*
   {
       "name" : "Rafael",
       "email" : "rafael@outlook.com"
   }
   */
   //Debug:
   console.log("Body:" + request.body.name);

   //Para monitorar as alterações do arquivo, tem que instalar...:
   //yarn add nodemon -D // -D dependencia de desenvolvimento, fica em devDependencies
   return response.json({message: 'Exemplo: Corpo:' + request.body.name}); //Resposta do servidor...
});

/******************************************************
 * Cadastro dos Devs
 * Rotas, interessante ficarem no plural.
 */

routes.post('/devs', DevController.store);
//Lista dos Devs
routes.get('/devs', DevController.index);
//Search
routes.get('/search', SearchController.index);

module.exports = routes;