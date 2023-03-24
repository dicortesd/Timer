import { dbConn } from '../config/db.config';

export class Tiempo {
    id_tarea: string;
    inicio: string;
    final: string;
    id_usuario: string;
    observaciones: string;

    constructor(tiempo: Tiempo) {
        this.id_tarea = tiempo.id_tarea;
        this.inicio = tiempo.inicio;
        this.final = tiempo.final;
        this.id_usuario = tiempo.id_usuario;
        this.observaciones = tiempo.observaciones;
    }

    static create(nuevoTiempo: Tiempo, result: any) {
        dbConn.query("INSERT INTO tiempos SET ?", nuevoTiempo, function (err: any, res: any) {
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
        dbConn.query("Select * from tiempos WHERE id = ?", id, function (err: any, res: any) {
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
        dbConn.query("SELECT * from tiempos", function (err: any, res: any) {
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

    static update(id: any, tiempo: any, result: any) {
        dbConn.query("UPDATE tiempos SET id_tarea=?,inicio=?,final=?,id_usuario=?,observaciones=? WHERE id=?", [tiempo.id_tarea, tiempo.inicio, tiempo.final, tiempo.id_usuario, tiempo.observaciones, id], function (err: any, res: any) {
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
        dbConn.query("DELETE FROM tiempos WHERE id = ?", [id], function (err: any, res: any) {
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
