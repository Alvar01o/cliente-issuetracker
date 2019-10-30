
const UsuariosService = require("../services/UsuariosService");
const { body } = require('express-validator');
const UserB = require("../beans/UserB")
const UsuariosRoute  = function setRoutes(app) {
    app.get('/issuetracker/usuarios/page/:page' , (req, res) => {
            UsuariosService.list(req.params.page , (error , response ) => {
            if (error){

            } else {
                let body = response.body;
                console.log(body)
                res.render('usuarios/list', {
                    title: 'Lista de Grupos.',
                    layout: 'layout', // render without using a layout template
                    data: body
                  }
                )
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


}


module.exports = UsuariosRoute