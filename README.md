# backendDevsApp
Semana Omministack Backend app Dev. NodeJs

14/01/2020 - Semana Omministack RocketSeat.

Geral:
https://rocketseat.com.br/week-10/aulas#2

Backend: com NodeJs
API - Restfull ...
Regras ...

Dados Lidos como Json:
Javascript Object Notation ...
Json: estrutura de dados !

Code: (Editor: Visual Studio Code)
command, shift, p:   (install command prompt ...)
para funcionar o comando: code . , na pasta atual (Terminal)...

Para começar:
1)
yarn init -y   //-y para não ficar perguntando coisas...

Instalar o express...
2)
yarn add express

Dica VSCode:
Control aspas invertida... chama o command, dentro do Code...
Control shift p: para instalar extensões:
*Dracula ... (Thema interessante)
*Material Icon Theme ... 

---------------------
Para rodar a aplicação:
devemos escolher uma porta para observar...
No caso foi configurado para porta 3333.

no prompt de commando:
node index.js  //Roda sua index ... 

para ver: (No browser)
localhost:3333

Vai para as rotas que você definir.

É interessante definir as respostas dos
seus métodos como json...

No chrome para ver em formato Json, bonitinho... 
Tem que instalar uma extensão, no Chrome: (JSON Viewer.)

//Para monitorar as alterações do arquivo, tem que instalar...:
yarn add nodemon -D // -D dependencia de desenvolvimento

para rodar monitorando:
yarn nodemon index.js

Para não precisar escrever yarn nodemon xxx toda vez, 
é possível , no package.json, criar um Atalho ... via script.
no arquivo package.json

Exemplo:

{
"name": "backend",
"version": "1.0.0",
"main": "index.js",
"license": "MIT",
"scripts": {
    "dev": "nodemon index.js"   //nao precisa do yarn na frente
},
"dependencies": {
"express": "^4.17.1"
},
"devDependencies": {
"nodemon": "^2.0.2"
}
}

para rodar seu script dev:
yarn dev

Para finalizar o commando do terminal: ctrl C

Para verificar se a porta do MongoDB esta OK: (verificar bloqueios de Proxy)
http://portquiz.net:27017/

yarn add axios //Faz chamada para outras APIS.

Baixar: (Para acesso ao banco de dados)
mongodb Atlas ...
mongodb compass community (Client)

Link mongo db:
mongodb+srv://rgsguima:<pass>@omnistack-kts1s.mongodb.net/week10

Para pegar a latitude longitude:
https://www.google.com/maps

Editora:
latitude: -25.4481276
longitude: -49.2942842

No mongoDb, primeiro ele lê a longitude, depois a latitude...
