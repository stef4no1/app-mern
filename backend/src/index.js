'use strict'

const express = require('express');

const app = express();

const port = 3900; //el puerto

app.listen(port, ()=> {
    console.log('Lanzando la app en el puerto ' + port);
})