"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proyecto = void 0;
const db_config_1 = require("../config/db.config");
class Proyecto {
    constructor(proyecto) {
        this.nombre = proyecto.nombre;
        this.id_cliente = proyecto.id_cliente;
        this.descripcion = proyecto.descripcion;
    }
    static create(nuevoProyecto, result) {
        db_config_1.dbConn.query("INSERT INTO proyectos SET ?", nuevoProyecto, function (err, res) {
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
        db_config_1.dbConn.query("Select * from proyectos WHERE id = ?", id, function (err, res) {
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
        db_config_1.dbConn.query("SELECT * from proyectos", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('proyectos : ', res);
                result(null, res);
            }
        });
    }
    static update(id, proyecto, result) {
        db_config_1.dbConn.query("UPDATE proyectos SET nombre=?,id_cliente=?,descripcion=? WHERE id=?", [proyecto.nombre, proyecto.id_cliente, proyecto.descripcion, id], function (err, res) {
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
        db_config_1.dbConn.query("DELETE FROM proyectos WHERE id = ?", [id], function (err, res) {
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
exports.Proyecto = Proyecto;
