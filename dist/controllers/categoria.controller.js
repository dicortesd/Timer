"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findById = exports.create = exports.findAll = void 0;
const categoria_model_1 = require("../models/categoria.model");
const findAll = function (req, res) {
    categoria_model_1.Categoria.findAll(function (err, categoria) {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        else {
            console.log('res', categoria);
            res.send(categoria);
        }
    });
};
exports.findAll = findAll;
const create = function (req, res) {
    const new_categoria = new categoria_model_1.Categoria(req.body);
    // handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        categoria_model_1.Categoria.create(new_categoria, function (err, categoria) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: "Categoria añadida exitosamente" });
            }
        });
    }
};
exports.create = create;
const findById = function (req, res) {
    categoria_model_1.Categoria.findById(req.params.id, function (err, categoria) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(categoria);
        }
    });
};
exports.findById = findById;
const update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        categoria_model_1.Categoria.update(req.params.id, new categoria_model_1.Categoria(req.body), function (err, categoria) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: 'categoria modificada exitosamente' });
            }
        });
    }
};
exports.update = update;
const remove = function (req, res) {
    categoria_model_1.Categoria.remove(req.params.id, function (err, categoria) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: 'Categoria borrada exitosamente' });
        }
    });
};
exports.remove = remove;
