'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = 3900; //El puerto donde se abre el programa

var url = 'mongodb://localhost:27017/api_rest_reactnotas'; 

mongoose.Promise = global.Promise;

var article_routes = require('./routes/article');

// Cargamos el body-parser, es un middleware para analizar cuerpos a traves de la URL

app.use(bodyParser.urlencoded({extended: false}));

// Cualquier peticion la convertirmos a formato JSON:
app.use(bodyParser.json());

// Activamos el CORS para permitir las peticiones AJAX y HTTP desde el front-end:
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use('/api', article_routes);

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log('Conexion a la bdd realizada con exito!');
    app.listen(port, ()=> {
        console.log('Lanzando la app en el puerto ' + port);
    })
})