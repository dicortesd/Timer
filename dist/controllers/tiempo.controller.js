"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findById = exports.create = exports.findAll = void 0;
const tiempo_model_1 = require("../models/tiempo.model");
const findAll = function (req, res) {
    tiempo_model_1.Tiempo.findAll(function (err, tiempo) {
        console.log('controller');
        if (err) {
            res.send(err);
        }
        else {
            console.log('res', tiempo);
            res.send(tiempo);
        }
    });
};
exports.findAll = findAll;
const create = function (req, res) {
    const new_tiempo = new tiempo_model_1.Tiempo(req.body);
    // handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        tiempo_model_1.Tiempo.create(new_tiempo, function (err, tiempo) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: "Tiempo añadido exitosamente" });
            }
        });
    }
};
exports.create = create;
const findById = function (req, res) {
    tiempo_model_1.Tiempo.findById(req.params.id, function (err, tiempo) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(tiempo);
        }
    });
};
exports.findById = findById;
const update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else {
        tiempo_model_1.Tiempo.update(req.params.id, new tiempo_model_1.Tiempo(req.body), function (err, tiempo) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ error: false, message: 'tiempo modificado exitosamente' });
            }
        });
    }
};
exports.update = update;
const remove = function (req, res) {
    tiempo_model_1.Tiempo.remove(req.params.id, function (err, tiempo) {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ error: false, message: 'tiempo borrado exitosamente' });
        }
    });
};
exports.remove = remove;
