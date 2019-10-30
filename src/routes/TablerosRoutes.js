
const TablerosService = require("../services/TablerosService");
const GruposService = require("../services/GruposService");
const { body } = require('express-validator');
const TablerosB = require("../beans/TablerosB")
const TablerosRoute  = function setRoutes(app) {
    app.get('/tableros/page/:page' , (req, res) => {
        let lista = TablerosService.list(req.params.page , (error , response ) => {
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
    
    app.post('/tableros/save' ,[body('nombre').not().isEmpty(), body('descripcion').not().isEmpty()], (req, res) => {
        TablerosB.nombre = req.body.nombre;
        TablerosB.descripcion = req.body.descripcion;
        console.log( req.body);
        TablerosService.save(TablerosB , req.body.grupo_id, (error, response ) => {
            console.log(response.body);
            if (error) {

            } else {
                res.redirect('/tableros/page/1')
            }

        });

    })

    app.get('/tableros/new/:grupo_id' , (req, res) => {
        res.render('tableros/new', {
            title: 'Nuevo Proyecto.',
            layout: 'layout', // render without using a layout template
            grupo_id : req.params.grupo_id
          })
    })


}


module.exports = TablerosRoute