"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findById = exports.create = exports.findAll = void 0;
const tarea_model_1 = require("../models/tarea.model");
const findAll = function (req, res) {
    tarea_model_1.Tarea.findAll(function (err, tarea) {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        else {
            console.log('res', tarea);
            res.send(tarea);
        }
    });
};
exports.findAll = findAll;
const create = function (req, res) {
    const new_proyecto = new tarea_model_1.Tarea(req.body);
    // handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        tarea_model_1.Tarea.create(new_proyecto, function (err, tarea) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: "Tarea añadido exitosamente" });
            }
        });
    }
};
exports.create = create;
const findById = function (req, res) {
    tarea_model_1.Tarea.findById(req.params.id, function (err, tarea) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(tarea);
        }
    });
};
exports.findById = findById;
const update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        tarea_model_1.Tarea.update(req.params.id, new tarea_model_1.Tarea(req.body), function (err, tarea) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: 'tarea modificada exitosamente' });
            }
        });
    }
};
exports.update = update;
const remove = function (req, res) {
    tarea_model_1.Tarea.remove(req.params.id, function (err, tarea) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: 'tarea borrada exitosamente' });
        }
    });
};
exports.remove = remove;
