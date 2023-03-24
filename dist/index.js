"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// create express app
const app = (0, express_1.default)();
// Setup server port
const port = 3000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(body_parser_1.default.json());
// define a root route
app.get('/', (req, res) => {
    res.send("Hello World");
});
// Require usuario routes
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const cliente_routes_1 = __importDefault(require("./routes/cliente.routes"));
const proyecto_routes_1 = __importDefault(require("./routes/proyecto.routes"));
const tarea_routes_1 = __importDefault(require("./routes/tarea.routes"));
const categoria_routes_1 = __importDefault(require("./routes/categoria.routes"));
const tiempo_routes_1 = __importDefault(require("./routes/tiempo.routes"));
// using as middleware
app.use('/usuarios', usuario_routes_1.default);
app.use('/clientes', cliente_routes_1.default);
app.use('/proyectos', proyecto_routes_1.default);
app.use('/tareas', tarea_routes_1.default);
app.use('/categoriass', categoria_routes_1.default);
app.use('/tiempos', tiempo_routes_1.default);
// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
