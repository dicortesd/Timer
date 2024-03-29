import { dbConn } from '../config/db.config';

export class Proyecto {
    id_cliente: string;
    nombre: string;
    descripcion: string;
    usuarios?: [];
    estado: string; 

    constructor(proyecto: Proyecto) {
        this.nombre = proyecto.nombre;
        this.id_cliente = proyecto.id_cliente;
        this.descripcion = proyecto.descripcion;
        this.usuarios = proyecto.usuarios;
        this.estado = proyecto.estado;
    }

    static create(nuevoProyecto: Proyecto, result: any) {
        console.log("nuevo", nuevoProyecto);
        
        var usuarios = nuevoProyecto.usuarios;
        delete nuevoProyecto.usuarios;
        console.log("usuarios");

        dbConn.query("INSERT INTO proyectos SET ?", nuevoProyecto, function (err: any, res: any) {
            if (err) {
                console.log("error", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);

                if(usuarios) usuarios.forEach((item)=>{
                    console.log("error ", item);
                    dbConn.query("INSERT INTO usuarios_proyectos SET ?", 
                        {id_proyecto: res.insertId, id_usuario: item},
                        function (err: any, resup: any){
                            if (err) {
                                console.log("error", err);
                                result(err, null);
                            }
                            else{
                                console.log(resup.insertId);
                                //result(null, resup.insertId);
                            }
                        }
                    );
                });



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

    static findAll(query:any, result: any) {
                   //"SELECT us.*, (SELECT GROUP_CONCAT(up.id_proyecto SEPARATOR ',') FROM usuarios_proyectos up WHERE up.id_usuario=us.id) as proyectos FROM usuarios us", function (err: any, res: any) {
        console.log(query);
        let condicion = "true";
        if(query.id_cliente!= undefined) condicion += " AND pr.id_cliente = '" + query.id_cliente + "'";
        if(query.id_usuario!= undefined) condicion += " AND pr.id IN (SELECT id_proyecto FROM usuarios_proyectos WHERE id_usuario = '" + query.id_usuario + "')";

        dbConn.query("SELECT pr.*, (SELECT GROUP_CONCAT(up.id_usuario SEPARATOR ',') FROM usuarios_proyectos up WHERE up.id_proyecto=pr.id) as usuarios FROM proyectos pr WHERE " + condicion, function (err: any, res: any) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                for (let i in res) {
                    if(res[i].usuarios==null) res[i].usuarios = [];
                    else res[i].usuarios = JSON.parse('[' +  res[i].usuarios + ']');
                }

                console.log('proyectos : ', res);
                result(null, res);
            }
        });
    }

    static update(id: any, proyecto: Proyecto, result: any) {
        dbConn.query("UPDATE proyectos SET nombre=?,id_cliente=?,descripcion=?,estado=? WHERE id=?", [proyecto.nombre, proyecto.id_cliente, proyecto.descripcion, proyecto.estado, id], function (err: any, res: any) {
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
