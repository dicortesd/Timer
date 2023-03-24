"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const db_config_1 = require("../config/db.config");
class Categoria {
    constructor(categoria) {
        this.nombre = categoria.nombre;
        this.valor_hora = categoria.valor_hora;
    }
    static create(nuevaCategoria, result) {
        db_config_1.dbConn.query("INSERT INTO categorias SET ?", nuevaCategoria, function (err, res) {
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
        db_config_1.dbConn.query("Select * from categorias WHERE id = ?", id, function (err, res) {
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
        db_config_1.dbConn.query("SELECT * from categorias", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                console.log('categorias: ', res);
                result(null, res);
            }
        });
    }
    static update(id, categoria, result) {
        db_config_1.dbConn.query("UPDATE categorias SET nombre=?,valor_hora=? WHERE id=?", [categoria.nombre, categoria.valor_hora, id], function (err, res) {
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
        db_config_1.dbConn.query("DELETE FROM categorias WHERE id = ?", [id], function (err, res) {
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
exports.Categoria = Categoria;
