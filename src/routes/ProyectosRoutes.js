
const ProyectosService = require("../services/ProyectosService");
const GruposService = require("../services/GruposService");
const { body } = require('express-validator');
const ProyectosB = require("../beans/ProyectosB")
const ProyectosRoute  = function setRoutes(app) {
    app.get('/proyectos/page/:page' , (req, res) => {
        let lista = ProyectosService.list(req.params.page , (error , response ) => {
            if (error){

            } else {
                let body = response.body;
                console.log(body)
                res.render('proyectos/list', {
                    title: 'Lista de Proyectos.',
                    layout: 'layout', // render without using a layout template
                    data: body
                  }
                )
            }
        });

    })
    
    app.post('/proyectos/save' ,[body('nombre').not().isEmpty(), body('descripcion').not().isEmpty()], (req, res) => {
        ProyectosB.nombre = req.body.nombre;
        ProyectosB.descripcion = req.body.descripcion;
        console.log( req.body);
        ProyectosService.save(ProyectosB , req.body.grupo_id, (error, response ) => {
            console.log(response.body);
            if (error) {

            } else {
                res.redirect('/proyectos/page/1')
            }

        });

    })

    app.get('/proyectos/new/:grupo_id' , (req, res) => {
        res.render('proyectos/new', {
            title: 'Nuevo Proyecto.',
            layout: 'layout', // render without using a layout template
            grupo_id : req.params.grupo_id
          })
    })


}


module.exports = ProyectosRoute