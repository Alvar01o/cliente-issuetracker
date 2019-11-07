
const GruposService = require("../services/GruposService");
const { body } = require('express-validator');
const GruposB = require("../beans/GruposB")
const GruposRoute  = function setRoutes(app) {
    
    app.get('/issuetracker/grupos/new' , (req, res) => {
        res.render('grupos/new', {
            title: 'Nuevo Grupo.',
            layout: 'layout' // render without using a layout template
          })
    })
    
    app.get('/issuetracker/grupos/:id' , (req, res) => {
        GruposService.getById(req.params.id , (error , response ) => {
            if (error){

            } else {
                let body = response;
                res.render('grupos/show', {
                    title: 'Vista de Detalles de Grupo.',
                    layout: 'layout', // render without using a layout template
                    data: body
                  }
                )
            }
        });
    })

    
    app.get('/issuetracker/grupos/page/:page' , (req, res) => {
        GruposService.list(req.params.page , (error , response ) => {
            if (error){

            } else {
                let body = response.body;
                let pag=1;                
                res.render('grupos/list', {
                    title: 'Lista de Grupos.',
                    layout: 'layout', // render without using a layout template
                    data: body,
                    message:req.flash('message'),
                    url:'/issuetracker/grupos/page/',
                    pagination: Array.from({length: body.lastPage}, () => '/issuetracker/grupos/page/'+ pag++ )
                  }
                )
            }
        });
    })

    
    app.post('/issuetracker/grupos/save' ,[body('nombre').not().isEmpty()], (req, res) => {
        let gr = new GruposB();
        gr.setNombre(req.body.nombre);
        GruposService.save(gr , (error, response ) => {
            if (error) {

            } else {
                res.redirect('/issuetracker/grupos/page/1')
            }
        });
    })

    app.post('/issuetracker/grupos/adduser' ,[body('grupo_id').not().isEmpty(), body('user_id').not().isEmpty()], (req, res) => {
        
        GruposService.saveUser(req.body.grupo_id , req.body.user_id , (error, response ) => {
            if (error) {

            } else {
                res.redirect('/issuetracker/grupos/page/1')
            }
        });
    })

    app.get('/issuetracker/grupos/remove/:id' , (req, res) => {   
        GruposService.delete(req.params.id , (error , response) => {
            let b = JSON.parse(response.body);
            req.flash('message', b.message);
            res.redirect('/issuetracker/grupos/page/1')
        })
    })

}


module.exports = GruposRoute