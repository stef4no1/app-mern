'use strict'

var Article = require('../models/article');

// Creando un objeto para disponer de todos los metodos de ruta que voy a definir

var controller = {
    //Metodo para guardar un articulo
    save: (req, res) =>{
        var params = req.body;

        var article = new Article();

        // Asignando los valores:
        article.title = params.title;
        article.content = params.content;
        article.author = params.author;

        // Guardamos el articulo:
        article.save((err, articleStored) => {
            if(err || !articleStored){
                return res.status(404).send({
                    status: 'error',
                    message: 'El articulo no se guardo'
                })
            }
            return res.status(200).send({
                status: 'success',
                articleStored
            })
        });
    }
}