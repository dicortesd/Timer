import { dbConn } from '../config/db.config';

export class Cliente {
    nombre: string;
    correo: string;
    direccion: string;

    constructor(cliente: Cliente) {
        this.nombre = cliente.nombre;
        this.correo = cliente.correo;
        this.direccion = cliente.direccion;
    }

    static create(nuevoCliente: Cliente, result: any) {
        dbConn.query("INSERT INTO clientes SET ?", nuevoCliente, function (err: any, res: any) {
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
    static findById(id: String, result: any) {
        dbConn.query("Select * from clientes WHERE id = ?", id, function (err: any, res: any) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
    }


    static findAll(result: any) {
        dbConn.query("SELECT * from clientes", function (err: any, res: any) {
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

    static update(id: any, cliente: any, result: any) {
        dbConn.query("UPDATE clientes SET nombre=?,correo=?,direccion=? WHERE id=?", [cliente.nombre, cliente.correo, cliente.direccion, id], function (err: any, res: any) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
    }

    static remove(id: any, result: any) {
        dbConn.query("DELETE FROM clientes WHERE id = ?", [id], function (err: any, res: any) {
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
