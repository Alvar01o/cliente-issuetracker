
const GruposService = require("../services/GruposService");
const { body } = require('express-validator');
const GruposB = require("../beans/GruposB")
const GruposRoute  = function setRoutes(app) {
    app.get('/grupos/page/:page' , (req, res) => {
        let lista = GruposService.list(req.params.page , (error , response ) => {
            if (error){

            } else {
                let body = response.body;
                console.log(body)
                res.render('grupos/list', {
                    title: 'Lista de Grupos.',
                    layout: 'layout', // render without using a layout template
                    data: body
                  }
                )
            }
        });

    })
    
    app.post('/grupos/save' ,[body('nombre').not().isEmpty()], (req, res) => {
        GruposB.nombre = req.body.nombre;
        GruposService.save(GruposB , (error, response ) => {
            console.log(response.body);
            if (error) {

            } else {
                res.redirect('/grupos/page/1')
            }

        });

    })

    app.get('/grupos/new' , (req, res) => {
        res.render('grupos/new', {
            title: 'Nuevo Grupo.',
            layout: 'layout' // render without using a layout template
          })
    })


}


module.exports = GruposRoute