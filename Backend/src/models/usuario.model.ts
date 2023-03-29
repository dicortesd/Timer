import { dbConn } from '../config/db.config';
import * as bcrypt from 'bcrypt';

export class Usuario {
    nombre: string;
    apellido: string;
    correo: string;
    rol: string;
    contrasena: string;
    proyectos?: [];

    constructor(usuario: Usuario) {
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.correo = usuario.correo;
        this.rol = usuario.rol;
        this.contrasena = usuario.contrasena;
        this.proyectos = usuario.proyectos;
    }

    static verifyLogin(userData: any, result: any) {
        let contrasenaEncriptada = bcrypt.hashSync(userData.contrasena,10);
        console.log(userData.correo);
        console.log(contrasenaEncriptada);
        dbConn.query(
                "Select * FROM usuarios WHERE correo = ?", 
                [userData.correo], 
            function (err: any, res: any) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res);

                if(res.length==0){
                    result(null,"No existe el usuario.")
                } else {
                    if(bcrypt.compareSync(userData.contrasena,res[0].contrasena)){
                        result(null,{error:false, msg: "Exitoso", id_usuario: res[0].id});
                    } else {
                        result(null, {error: true, msg: "La contraseña no es"});
                    }
                }
            }
        });
    }

    static create(nuevoUsuario: Usuario, result: any) {
        var proyectos = nuevoUsuario.proyectos;
        delete nuevoUsuario.proyectos;
        nuevoUsuario.contrasena = bcrypt.hashSync(nuevoUsuario.contrasena,10);
        dbConn.query("INSERT INTO usuarios SET ?", nuevoUsuario, function (err: any, res: any) {
            if (err) {
                console.log("error", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                if(proyectos) proyectos.forEach((item)=>{
                    dbConn.query("INSERT INTO usuarios_proyectos SET ?", 
                        {id_usuario: res.insertId, id_proyecto: item},
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
        dbConn.query("Select us.*, (SELECT GROUP_CONCAT(up.id_proyecto SEPARATOR ',') FROM usuarios_proyectos up WHERE up.id_usuario=us.id) as proyectos FROM usuarios us WHERE us.id = ? ", id, function (err: any, res: any) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                for (let i in res) {
                    if(res[i].proyectos==null) res[i].proyectos = [];
                    else res[i].proyectos = JSON.parse('[' +  res[i].proyectos + ']');
                }
                console.log('usuarios : ', res);
                result(null, res);
            }
        });
    }


    static findAll(result: any) {
        dbConn.query("SELECT us.*, (SELECT GROUP_CONCAT(up.id_proyecto SEPARATOR ',') FROM usuarios_proyectos up WHERE up.id_usuario=us.id) as proyectos FROM usuarios us", function (err: any, res: any) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                for (let i in res) {
                    if(res[i].proyectos==null) res[i].proyectos = [];
                    else res[i].proyectos = JSON.parse('[' +  res[i].proyectos + ']');
                }
                console.log('usuarios : ', res);
                result(null, res);
            }
        });
    }

    static update(id: any, usuario: any, result: any) {
        let strSQL = "";
        let arrayVars = [];
        if(usuario.contrasena==undefined || usuario.contrasena==''){
            strSQL = "UPDATE usuarios SET nombre=?,apellido=?,correo=?,rol=? WHERE id=?";
            arrayVars = [usuario.nombre, usuario.apellido, usuario.correo, usuario.rol, id];
        } else {
            strSQL = "UPDATE usuarios SET nombre=?,apellido=?,correo=?,rol=?,contrasena=? WHERE id=?";
            arrayVars = [usuario.nombre, usuario.apellido, usuario.correo, usuario.rol, bcrypt.hashSync(usuario.contrasena,10), id];
        }
        dbConn.query(strSQL, arrayVars, function (err: any, res: any) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                if(usuario.proyectos) usuario.proyectos.forEach((item:any)=>{
                    console.log("usuario id: " + id + " item " + item);
                    dbConn.query("INSERT IGNORE INTO usuarios_proyectos (id_usuario,id_proyecto) VALUES(?,?)",
                        [id, item],
                        function (err: any, resIns: any){
                            if (err) {
                                console.log("error", err);
                                result(err, null);
                            }
                            else{
                                console.log("================");
                                console.log(resIns);
                                //result(null, resup.insertId);
                            }
                        }
                    );

                });
                dbConn.query("DELETE FROM usuarios_proyectos WHERE id_usuario = ? AND id_proyecto NOT IN (" + usuario.proyectos.join() + ")",
                    [id],
                    function(err:any,resdel:any){
                        if (err){
                            console.log("error",err);
                            result(err,null);
                        }
                        else{
                            console.log("re");
                            result(null, res);

                        }
                    }
                );
            }
        });
    }

    static remove(id: any, result: any) {

        dbConn.query("DELETE FROM usuarios_proyectos WHERE id_usuario = ?", [id], function (err: any, res: any) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                
                dbConn.query("DELETE FROM usuarios WHERE id = ?", [id], function (err: any, res: any) {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    }
                    else {
                        result(null, res);
                    }
                });
            }
        });
        
    }
}
