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

    static consultas(req:any, result: any) {
        console.log(req.query);
        let condicion = "ti.final IS NOT NULL";
        let from = "tiempos ti LEFT JOIN tareas t ON ti.id_tarea=t.id";
        let select = "";
        let strquery = "";
        let strTiempo="SUM(TIMESTAMPDIFF(HOUR, ti.inicio, ti.final)) as tiempo";
        if(req.query.id_proyecto!= undefined) condicion += " AND t.id_proyecto = '" + req.query.id_proyecto + "'";
        if(req.query.id_cliente!= undefined) {
            condicion += " AND t.id_proyecto IN (SELECT id FROM proyectos WHERE id_cliente = '" + req.query.id_cliente + "')";
        }
        if(req.query.id_usuario!= undefined){
            condicion += " AND ti.id_usuario = '" + req.query.id_usuario + "'";
        }
        if(req.query.inicio!= undefined){
            condicion += " AND ti.inicio >= '" + req.query.inicio + "'";
        }
        if(req.query.final!= undefined){
            condicion += " AND ti.final <= '" + req.query.final + "'";
        }
        if(req.query.tipo == undefined){
            let err={error:true, message: 'Por favor provea todos los campos requeridos.'};
            console.log("error: ", err);
            result(null, err);
            return;
        }
        switch(req.query.tipo){
            case "proyecto":
                select = "pr.id, pr.nombre, " + strTiempo;
                from += " LEFT JOIN proyectos pr ON t.id_proyecto = pr.id";
                break;
            case "cliente":
                select = "cl.id, cl.nombre, " + strTiempo;
                from += " LEFT JOIN proyectos pr ON t.id_proyecto = pr.id LEFT JOIN clientes cl ON pr.id_cliente=cl.id";
                break;
            case "usuario":
                select = "us.id, CONCAT(us.nombre,' ',us.apellido) as nombre, " + strTiempo;
                from += " LEFT JOIN usuarios us ON ti.id_usuario = us.id";
                break;
            default:
                let err={error:true, message: 'Tipo de consulta desconocido.'};
                console.log("error: ", err);
                result(null, err);
                return;
        }
        strquery = "SELECT " + select + " FROM " + from + " WHERE " + condicion + " GROUP BY 1,2";
        console.log("strquery = ", strquery);
        dbConn.query(strquery, function (err: any, res: any) {
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
}
