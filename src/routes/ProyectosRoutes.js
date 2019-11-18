
const ProyectosService = require("../services/ProyectosService");
const GruposService = require("../services/GruposService");
const { body } = require('express-validator');
const ProyectosB = require("../beans/ProyectosB")
const ProyectosRoute  = function setRoutes(app) {
    app.get('/issuetracker/proyectos/:id' , (req, res) => {
        ProyectosService.getById(req.params.id , (error , response ) => {
            if (error){

            } else {
                let body = response;
                console.log(body)
                res.render('proyectos/detalle', {
                    title: 'Lista de Proyectos.',
                    layout: 'layout', // render without using a layout template
                    data: body
                  }
                )
            }
        });
    })

    app.get('/issuetracker/proyectos/page/:page' , (req, res) => {
        ProyectosService.list(req.params.page , (error , response ) => {
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
    
    app.post('/issuetracker/proyectos/save' ,[body('nombre').not().isEmpty(), body('descripcion').not().isEmpty()], (req, res) => {
        let pro = new ProyectosB();
        pro.setDescripcion(req.body.descripcion)
        pro.setNombre(req.body.nombre)
 
        ProyectosService.save(pro , req.body.grupo_id, (error, response ) => {
            console.log(response.body);
            if (error) {

            } else {
                res.redirect('/issuetracker/proyectos/bygrupo/'+req.body.grupo_id+'/1')
            }

        });

    })

    app.get('/issuetracker/proyectos/new/:grupo_id' , (req, res) => {
        res.render('proyectos/new', {
            title: 'Nuevo Proyecto.',
            layout: 'layout', // render without using a layout template
            grupo_id : req.params.grupo_id
          })
    })
    
    app.get('/issuetracker/proyectos/bygrupo/:grupo_id/:page' , (req, res) => {
        let lista = ProyectosService.listByGrupo(req.params.grupo_id,req.params.page , (error , response ) => {
            if (error){

            } else {
                let body = response.body;
                console.log(body)
                res.render('proyectos/list', {
                    title: 'Lista de Proyectos por Grupo.',
                    layout: 'layout', // render without using a layout template
                    data: body
                  }
                )
            }
        });

    })

}


module.exports = ProyectosRoute