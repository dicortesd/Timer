"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
const db_config_1 = require("../config/db.config");
class Tarea {
    constructor(tarea) {
        this.nombre = tarea.nombre;
        this.id_proyecto = tarea.id_proyecto;
        this.id_categoria = tarea.id_categoria;
    }
    static create(nuevaTarea, result) {
        db_config_1.dbConn.query("INSERT INTO tareas SET ?", nuevaTarea, function (err, res) {
            if (err) {
                console.log("error", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }
    static findById(id, result) {
        db_config_1.dbConn.query("Select * from tareas WHERE id = ?", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }
    static findAll(result) {
        db_config_1.dbConn.query("SELECT * from tareas", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('tareas: ', res);
                result(null, res);
            }
        });
    }
    static update(id, tarea, result) {
        db_config_1.dbConn.query("UPDATE tareas SET nombre=?,id_proyecto=?,id_categoria=? WHERE id=?", [tarea.nombre, tarea.id_proyecto, tarea.id_categoria, id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
    static remove(id, result) {
        db_config_1.dbConn.query("DELETE FROM tareas WHERE id = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }
}
exports.Tarea = Tarea;
