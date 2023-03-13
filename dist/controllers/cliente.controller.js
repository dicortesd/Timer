"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findById = exports.create = exports.findAll = void 0;
const cliente_model_1 = require("../models/cliente.model");
const findAll = function (req, res) {
    cliente_model_1.Cliente.findAll(function (err, cliente) {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        else {
            console.log('res', cliente);
            res.send(cliente);
        }
    });
};
exports.findAll = findAll;
const create = function (req, res) {
    const new_cliente = new cliente_model_1.Cliente(req.body);
    // handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        cliente_model_1.Cliente.create(new_cliente, function (err, cliente) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: "Cliente añadido exitosamente" });
            }
        });
    }
};
exports.create = create;
const findById = function (req, res) {
    cliente_model_1.Cliente.findById(req.params.id, function (err, cliente) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(cliente);
        }
    });
};
exports.findById = findById;
const update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        cliente_model_1.Cliente.update(req.params.id, new cliente_model_1.Cliente(req.body), function (err, cliente) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: 'cliente modificado exitosamente' });
            }
        });
    }
};
exports.update = update;
const remove = function (req, res) {
    cliente_model_1.Cliente.remove(req.params.id, function (err, cliente) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: 'Cliente borrado exitosamente' });
        }
    });
};
exports.remove = remove;
