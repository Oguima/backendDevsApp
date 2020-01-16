//TODA aplicação possui Rotas...
//end principal: exemplo.  www.omiinistack.com/users
///users:  é o recurso a ser utilizado ... a Rota
//Express: ajuda na criação das rotas... e instalações.

const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

//MongoDB: (Não relacional)
//mondodb atlas ... (https://www.mongodb.com/cloud/atlas)
//yarn add mongoose
//user: rgsguima / rgsguima
//mongodb+srv://rgsguima:<password>@omnistack-kts1s.mongodb.net/test?retryWrites=true&w=majority
//mongodb+srv://rgsguima:rgsguima@omnistack-kts1s.mongodb.net/test?retryWrites=true&w=majority

//Client: mongodb compass community

mongoose.connect('mongodb+srv://rgsguima:rgsguima@omnistack-kts1s.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({ origin: 'http://localhost:3000'})) //App Web na porta 3000...
app.use(express.json()); //entende Json ... importante tem que estar antes das rotas...
app.use(routes); //passa a usar as rotas definidas..

//escolhendo a porta... localhost:3333
app.listen(3333);

//obs: para acesso a porta, tem que instar o cors... yarn add cors





