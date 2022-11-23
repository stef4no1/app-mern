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
    },

    // Metodo para listar los articulos:
    getArticles: (req, res) => {
        var query = Article.find({});

        query.sort('-date').exec((err, articles) =>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al extraer los datos'
                })
            }
            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                })
            }
            return res.status(200).send({
                status: 'success',
                articles
            })
        })
    },

    // Metodo para eliminar un articulo:
    delete: (req, res) => {
        // Recoger el id a traves de la url:
        var articleId = req.params.id;

        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) =>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar el articulo'
                })
            }
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha encontrado el articulo a eliminar'
                })
            }
            return  res.status(200).send({
                status: 'success',
                article: articleRemoved
            })
        })
    }
}