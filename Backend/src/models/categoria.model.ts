import { dbConn } from '../config/db.config';

export class Categoria {
    nombre: string;
    valor_hora: string;

    constructor(categoria: Categoria) {
        this.nombre = categoria.nombre;
        this.valor_hora = categoria.valor_hora;
    }

    static create(nuevaCategoria: Categoria, result: any) {
        dbConn.query("INSERT INTO categorias SET ?", nuevaCategoria, function (err: any, res: any) {
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
        dbConn.query("Select * from categorias WHERE id = ?", id, function (err: any, res: any) {
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
        dbConn.query("SELECT * from categorias", function (err: any, res: any) {
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

    static update(id: any, categoria: Categoria, result: any) {
        dbConn.query("UPDATE categorias SET nombre=?,valor_hora=? WHERE id=?", [categoria.nombre, categoria.valor_hora, id], function (err: any, res: any) {
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
        dbConn.query("DELETE FROM categorias WHERE id = ?", [id], function (err: any, res: any) {
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
