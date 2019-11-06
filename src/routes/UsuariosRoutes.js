
const UsuariosService = require("../services/UsuariosService");
const { body } = require('express-validator');
const UserB = require("../beans/UserB")
const UsuariosRoute  = function setRoutes(app) {
    app.get('/issuetracker/usuarios/page/:page' , (req, res) => {
        UsuariosService.list(req.params.page , (error , response ) => {
            if (error){

            } else {
                let body = response.body;
                let pag=1
                res.render('usuarios/list', {
                    title: 'Lista de Grupos.',
                    layout: 'layout', // render without using a layout template
                    data: body,
                    message:req.flash('message'),
                    url:'/issuetracker/usuarios/page/',
                    pagination: Array.from({length: body.lastPage}, () => '/issuetracker/usuarios/page/'+ pag++ )
                })
            }
        });
    })

    app.get('/issuetracker/usuarios/page/:page/json' , (req, res) => {
        UsuariosService.list(req.params.page , (error , response ) => {
        if (error){

        } else {
            let body = response.body;
            console.log(body)
            res.send(body)
        }
    });
    })
    
    app.post('/issuetracker/usuarios/save' ,[body('nombre').not().isEmpty()], (req, res) => {
        let usuario= new UserB();
        usuario.setNombre(req.body.nombre)
        usuario.setApellido(req.body.apellido)
        usuario.setPass(req.body.pass)
        usuario.setEmail(req.body.email)
        UsuariosService.save(usuario , (error, response ) => {
            console.log(response.body);
            if (error) {

            } else {
                res.redirect('/issuetracker/usuarios/page/1')
            }

        });

    })

    app.get('/issuetracker/usuarios/new' , (req, res) => {
        res.render('usuarios/new', {
            title: 'Nuevo Grupo.',
            layout: 'layout' // render without using a layout template
          })
    })

    app.get('/issuetracker/usuarios/remove/:id' , (req, res) => {   
        UsuariosService.delete(req.params.id , (error , response) => {
            let b = JSON.parse(response.body);
            req.flash('message', b.message);
            res.redirect('/issuetracker/usuarios/page/1')
        })
    })
}


module.exports = UsuariosRoute