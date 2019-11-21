
const TareasService = require("../services/TareasService");
const GruposService = require("../services/GruposService");
const { body } = require('express-validator');
const TareasB = require("../beans/TareasB")
const TareasRoute  = function setRoutes(app) {
    app.get('/issuetracker/tareas/page/:page' , (req, res) => {
        TareasService.list(req.params.page, req, res, (error , response ) => {
            if (error){

            } else {
                let body = response.body;
                console.log(body)
                res.render('tareas/list', {
                    title: 'Lista de Tareas.',
                    layout: 'layout', // render without using a layout template
                    data: body
                  }
                )
            }
        });

    })
    
    app.post('/issuetracker/tarea/add', [body('nombre').not().isEmpty(), body('descripcion').not().isEmpty()], (req, res) => {
        let tarea  = new TareasB()
        tarea.setNombre(req.body.nombre);
        tarea.setDescripcion(req.body.descripcion);
        tarea.setEstado(req.body.estado);
        tarea.setPrioridad(req.body.prioridad);
        tarea.setLimite(req.body.limite);
        TareasService.save(tarea , req.body.tablero_id,  req, res, (error, response ) => {
            res.redirect(req.get('referer'));
        });

    })

    app.get('/issuetracker/tareas/new/:grupo_id' , (req, res) => {
        res.render('tareas/new', {
            title: 'Nuevo Proyecto.',
            layout: 'layout', // render without using a layout template
            grupo_id : req.params.grupo_id
          })
    })


}


module.exports = TareasRoute