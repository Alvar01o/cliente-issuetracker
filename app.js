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
const base = require("./src/services/BaseService");
const RequestMiddleware =  require("./src/middlewares/requestmiddleware");
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
app.use(session({secret:"sa54d65asd546", resave:false, saveUninitialized:false}));
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

app.post('/issuetracker/login' , (req, res) => {
	let userdata = req.body;
	
	RequestMiddleware.sendRequestSession({ url:base.config.get('host')+"grupo/page/1"}, userdata, req, (response) => {
		if(response.error == 'Unauthorized') {
			res.render('login', {
				message : response.message
			})
		} else {
			req.session.auth = { username: userdata.email , basic : "Basic " + Buffer.from(userdata.email + ":" + userdata.pass).toString("base64")}
			res.redirect('/issuetracker/home')
		}
	});
})

app.get('/issuetracker/register' , (req, res) => {
	res.render('signin', {

	})
})

app.get('/issuetracker' , (req, res) => {
		res.render('index', {
	})
})

app.get('/issuetracker/home' , (req, res) => {
		res.render('index', {
	})
})

app.get('/' , (req, res) => {
	res.redirect("/issuetracker/login");
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