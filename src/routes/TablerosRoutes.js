
const TablerosService = require("../services/TablerosService");
const GruposService = require("../services/GruposService");
const { body } = require('express-validator');
const TablerosB = require("../beans/TablerosB")
const TablerosRoute  = function setRoutes(app) {
    app.get('/issuetracker/tableros/page/:page' , (req, res) => {
        TablerosService.list(req.params.page , req,res,(error , response ) => {
            if (error){

            } else {
                let body = response.body;
                console.log(body)
                res.render('tableros/list', {
                    title: 'Lista de Tableros.',
                    layout: 'layout', // render without using a layout template
                    data: body
                  }
                )
            }
        });

    })
    
    app.post('/issuetracker/tableros/:proyecto_id' ,[body('nombre').not().isEmpty(), body('descripcion').not().isEmpty()], (req, res) => {
        let tablero  = new TablerosB()
        tablero.setNombre(req.body.nombre);
        tablero.setDescripcion(req.body.descripcion);

        TablerosService.save(tablero , req.params.proyecto_id, req, res, (error, response ) => {

            if (error) {

            } else {
                res.redirect('/issuetracker/proyectos/'+req.params.proyecto_id)
            }

        });
    })

    app.get('/issuetracker/tableros/new/:grupo_id' , (req, res) => {
        res.render('tableros/new', {
            title: 'Nuevo Proyecto.',
            layout: 'layout', // render without using a layout template
            grupo_id : req.params.grupo_id
          })
    })


}


module.exports = TablerosRoute