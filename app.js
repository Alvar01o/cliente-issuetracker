const path = require('path')
const express = require('express')
const hbs = require('express-hbs')
const app = express()
const userService = require('./src/services/UsuariosService')
const port = process.env.PORT || 3003
const viewsPath = path.join(__dirname , './public/views')
const partialsPath = path.join(__dirname , './public/partials')
const bodyParser = require('body-parser')

const rutasGrupos = require('./src/routes/GruposRoutes')
const rutasProyectos = require('./src/routes/ProyectosRoutes')
//handlebars engine and views location
app.engine('hbs', hbs.express4({
	partialsDir: partialsPath,
	layoutsDir: viewsPath+"/layout",
  }));
  app.set('view engine', 'hbs');
  app.set('views', viewsPath);

//Setup static directory to serve
app.use(express.static(path.join(__dirname , './public/assets') ) )
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
/*CARGAR RUTAS */
rutasGrupos(app);
rutasProyectos(app);

/* ROUTES FOR USERS SECION */
app.get('' , (req, res) => {
	userService.list(1);
	res.render('dashboard', {

	})
})

app.get('/users/new' , (req, res) => {
	res.render('users/ucreate', {
		title: 'Crear un Usuario.',
		layout: 'layout' // render without using a layout template
	  })
})

app.get('/users' , (req, res) => {
	userService.list(1);
	res.render('index', {

	})
})
//http routes
app.get('/users/list' , (req, res) => {
	userService.list(1);
	res.render('index', {

	})
})

/*
app.get('/products' , (req, res) => {

	if (!req.query.search) {
		return res.send({
			error:'You must provide  a search term'
		})
	}
	res.send({
		products:[]
	})
})

app.get('/about' , (req, res) => {
	res.render('about', {
		title: "About page",
		name : "Alvaro"
	})
})*/



app.get('*' , (req, res) => {
	res.render('404', {
		title: "Error Message",
		error : "404 Page not found.",
	})

})


app.listen(port , () => {
	console.log("Server is up on port "+ port)
})