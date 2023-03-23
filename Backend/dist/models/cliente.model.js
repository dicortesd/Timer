"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const db_config_1 = require("../config/db.config");
class Cliente {
    constructor(cliente) {
        this.nombre = cliente.nombre;
        this.correo = cliente.correo;
        this.direccion = cliente.direccion;
    }
    static create(nuevoCliente, result) {
        db_config_1.dbConn.query("INSERT INTO clientes SET ?", nuevoCliente, function (err, res) {
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
        db_config_1.dbConn.query("Select * from clientes WHERE id = ?", id, function (err, res) {
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
        db_config_1.dbConn.query("SELECT * from clientes", function (err, res) {
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
    static update(id, cliente, result) {
        db_config_1.dbConn.query("UPDATE clientes SET nombre=?,correo=?,direccion=? WHERE id=?", [cliente.nombre, cliente.correo, cliente.direccion, id], function (err, res) {
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
        db_config_1.dbConn.query("DELETE FROM clientes WHERE id = ?", [id], function (err, res) {
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
exports.Cliente = Cliente;
