import { dbConn } from '../config/db.config';

export class Tarea {
    id_proyecto: string;
    nombre: string;
    id_categoria: string;

    constructor(tarea: Tarea) {
        this.nombre = tarea.nombre;
        this.id_proyecto = tarea.id_proyecto;
        this.id_categoria = tarea.id_categoria;
    }

    static create(nuevaTarea: Tarea, result: any) {
        dbConn.query("INSERT INTO tareas SET ?", nuevaTarea, function (err: any, res: any) {
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
        dbConn.query("Select * from tareas WHERE id = ?", id, function (err: any, res: any) {
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
        dbConn.query("SELECT * from tareas", function (err: any, res: any) {
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

    static update(id: any, tarea: Tarea, result: any) {
        dbConn.query("UPDATE tareas SET nombre=?,id_proyecto=?,id_categoria=? WHERE id=?", [tarea.nombre, tarea.id_proyecto, tarea.id_categoria, id], function (err: any, res: any) {
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
        dbConn.query("DELETE FROM tareas WHERE id = ?", [id], function (err: any, res: any) {
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
