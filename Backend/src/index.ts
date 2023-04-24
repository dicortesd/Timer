import express from 'express';
import bodyParser from 'body-parser';

// create express app
const app = express();

// Setup server port
const port = 3000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root route
app.get('/', (req, res) => {  
	res.send("Hello World");
});

// Require usuario routes
import {default as usuarioRoutes} from './routes/usuario.routes';
import {default as clienteRoutes} from './routes/cliente.routes';
import {default as proyectoRoutes} from './routes/proyecto.routes';
import {default as tareaRoutes} from './routes/tarea.routes';
import {default as categoriaRoutes} from './routes/categoria.routes';
import {default as tiempoRoutes} from './routes/tiempo.routes';

// Se metió esta parte porque al hacer el llamado desde el frontend sacaba error de CORS
// https://stackoverflow.com/a/34647929
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
// using as middleware
app.use('/usuarios', usuarioRoutes);
app.use('/clientes', clienteRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/tareas', tareaRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/tiempos', tiempoRoutes);


// listen for requests
app.listen(port, () => {  
	console.log(`Server is listening on port ${port}`);
});