const path = require('path')
const express = require('express')
const hbs = require('express-hbs')
const app = express()
const port = process.env.PORT || 3003
const viewsPath = path.join(__dirname , './public/views')
const partialsPath = path.join(__dirname , './public/partials')
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rutasGrupos = require('./src/routes/GruposRoutes')
const rutasProyectos = require('./src/routes/ProyectosRoutes')
const rutasTableros = require('./src/routes/TablerosRoutes')
const rutasUsuarios = require('./src/routes/UsuariosRoutes')
const rutasTareas = require('./src/routes/TareasRoutes')

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
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
/*CARGAR RUTAS */
rutasGrupos(app);
rutasProyectos(app);
rutasTableros(app);
rutasUsuarios(app);
rutasTareas(app);

/*extra routes*/
app.get('/issuetracker/login' , (req, res) => {
	res.render('login', {

	})
})

app.get('/issuetracker' , (req, res) => {
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