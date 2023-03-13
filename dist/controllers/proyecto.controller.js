"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findById = exports.create = exports.findAll = void 0;
const proyecto_model_1 = require("../models/proyecto.model");
const findAll = function (req, res) {
    proyecto_model_1.Proyecto.findAll(function (err, proyecto) {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        else {
            console.log('res', proyecto);
            res.send(proyecto);
        }
    });
};
exports.findAll = findAll;
const create = function (req, res) {
    const new_proyecto = new proyecto_model_1.Proyecto(req.body);
    // handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        proyecto_model_1.Proyecto.create(new_proyecto, function (err, proyecto) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: "Proyecto añadido exitosamente" });
            }
        });
    }
};
exports.create = create;
const findById = function (req, res) {
    proyecto_model_1.Proyecto.findById(req.params.id, function (err, proyecto) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(proyecto);
        }
    });
};
exports.findById = findById;
const update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        proyecto_model_1.Proyecto.update(req.params.id, new proyecto_model_1.Proyecto(req.body), function (err, proyecto) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: 'proyecto modificado exitosamente' });
            }
        });
    }
};
exports.update = update;
const remove = function (req, res) {
    proyecto_model_1.Proyecto.remove(req.params.id, function (err, proyecto) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: 'Proyecto borrado exitosamente' });
        }
    });
};
exports.remove = remove;
