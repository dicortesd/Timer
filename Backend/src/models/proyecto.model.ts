import { dbConn } from '../config/db.config';

export class Proyecto {
    id_cliente: string;
    nombre: string;
    descripcion: string;

    constructor(proyecto: Proyecto) {
        this.nombre = proyecto.nombre;
        this.id_cliente = proyecto.id_cliente;
        this.descripcion = proyecto.descripcion;
    }

    static create(nuevoProyecto: Proyecto, result: any) {
        dbConn.query("INSERT INTO proyectos SET ?", nuevoProyecto, function (err: any, res: any) {
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
        dbConn.query("Select * from proyectos WHERE id = ?", id, function (err: any, res: any) {
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
        dbConn.query("SELECT * from proyectos", function (err: any, res: any) {
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

    static update(id: any, proyecto: Proyecto, result: any) {
        dbConn.query("UPDATE proyectos SET nombre=?,id_cliente=?,descripcion=? WHERE id=?", [proyecto.nombre, proyecto.id_cliente, proyecto.descripcion, id], function (err: any, res: any) {
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
        dbConn.query("DELETE FROM proyectos WHERE id = ?", [id], function (err: any, res: any) {
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
