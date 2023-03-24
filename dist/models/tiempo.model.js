"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tiempo = void 0;
const db_config_1 = require("../config/db.config");
class Tiempo {
    constructor(tiempo) {
        this.id_tarea = tiempo.id_tarea;
        this.inicio = tiempo.inicio;
        this.final = tiempo.final;
        this.id_usuario = tiempo.id_usuario;
        this.observaciones = tiempo.observaciones;
    }
    static create(nuevoTiempo, result) {
        db_config_1.dbConn.query("INSERT INTO tiempos SET ?", nuevoTiempo, function (err, res) {
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
        db_config_1.dbConn.query("Select * from tiempos WHERE id = ?", id, function (err, res) {
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
        db_config_1.dbConn.query("SELECT * from tiempos", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('clientes : ', res);
                result(null, res);
            }
        });
    }
    static update(id, tiempo, result) {
        db_config_1.dbConn.query("UPDATE tiempos SET id_tarea=?,inicio=?,final=?,id_usuario=?,observaciones=? WHERE id=?", [tiempo.id_tarea, tiempo.inicio, tiempo.final, tiempo.id_usuario, tiempo.observaciones, id], function (err, res) {
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
        db_config_1.dbConn.query("DELETE FROM tiempos WHERE id = ?", [id], function (err, res) {
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
exports.Tiempo = Tiempo;
