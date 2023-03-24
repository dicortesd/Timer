"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const db_config_1 = require("../config/db.config");
const bcrypt = __importStar(require("bcrypt"));
class Usuario {
    constructor(usuario) {
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.correo = usuario.correo;
        this.rol = usuario.rol;
        this.contrasena = usuario.contrasena;
        this.proyectos = usuario.proyectos;
    }
    static verifyLogin(userData, result) {
        let contrasenaEncriptada = bcrypt.hashSync(userData.contrasena, 10);
        console.log(userData.correo);
        console.log(contrasenaEncriptada);
        db_config_1.dbConn.query("Select * FROM usuarios WHERE correo = ?", [userData.correo], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log(res);
                if (res.length == 0) {
                    result(null, "No existe el usuario.");
                }
                else {
                    if (bcrypt.compareSync(userData.contrasena, res[0].contrasena)) {
                        result(null, { error: false, msg: "Exitoso", id_usuario: res[0].id });
                    }
                    else {
                        result(null, { error: true, msg: "La contraseña no es" });
                    }
                }
            }
        });
    }
    static create(nuevoUsuario, result) {
        var proyectos = nuevoUsuario.proyectos;
        delete nuevoUsuario.proyectos;
        nuevoUsuario.contrasena = bcrypt.hashSync(nuevoUsuario.contrasena, 10);
        db_config_1.dbConn.query("INSERT INTO usuarios SET ?", nuevoUsuario, function (err, res) {
            if (err) {
                console.log("error", err);
                result(err, null);
            }
            else {
                console.log(res.insertId);
                if (proyectos)
                    proyectos.forEach((item) => {
                        db_config_1.dbConn.query("INSERT INTO usuarios_proyectos SET ?", { id_usuario: res.insertId, id_proyecto: item }, function (err, resup) {
                            if (err) {
                                console.log("error", err);
                                result(err, null);
                            }
                            else {
                                console.log(resup.insertId);
                                //result(null, resup.insertId);
                            }
                        });
                    });
                result(null, res.insertId);
            }
        });
    }
    static findById(id, result) {
        db_config_1.dbConn.query("Select us.*, (SELECT GROUP_CONCAT(up.id_proyecto SEPARATOR ',') FROM usuarios_proyectos up WHERE up.id_usuario=us.id) as proyectos FROM usuarios us WHERE us.id = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                for (let i in res) {
                    if (res[i].proyectos == null)
                        res[i].proyectos = [];
                    else
                        res[i].proyectos = JSON.parse('[' + res[i].proyectos + ']');
                }
                console.log('usuarios : ', res);
                result(null, res);
            }
        });
    }
    static findAll(result) {
        db_config_1.dbConn.query("SELECT us.*, (SELECT GROUP_CONCAT(up.id_proyecto SEPARATOR ',') FROM usuarios_proyectos up WHERE up.id_usuario=us.id) as proyectos FROM usuarios us", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                for (let i in res) {
                    if (res[i].proyectos == null)
                        res[i].proyectos = [];
                    else
                        res[i].proyectos = JSON.parse('[' + res[i].proyectos + ']');
                }
                console.log('usuarios : ', res);
                result(null, res);
            }
        });
    }
    static update(id, usuario, result) {
        let strSQL = "";
        let arrayVars = [];
        if (usuario.contrasena == undefined || usuario.contrasena == '') {
            strSQL = "UPDATE usuarios SET nombre=?,apellido=?,correo=?,rol=? WHERE id=?";
            arrayVars = [usuario.nombre, usuario.apellido, usuario.correo, usuario.rol, id];
        }
        else {
            strSQL = "UPDATE usuarios SET nombre=?,apellido=?,correo=?,rol=?,contrasena=? WHERE id=?";
            arrayVars = [usuario.nombre, usuario.apellido, usuario.correo, usuario.rol, bcrypt.hashSync(usuario.contrasena, 10), id];
        }
        db_config_1.dbConn.query(strSQL, arrayVars, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                if (usuario.proyectos)
                    usuario.proyectos.forEach((item) => {
                        console.log("usuario id: " + id + " item " + item);
                        db_config_1.dbConn.query("INSERT IGNORE INTO usuarios_proyectos (id_usuario,id_proyecto) VALUES(?,?)", [id, item], function (err, resIns) {
                            if (err) {
                                console.log("error", err);
                                result(err, null);
                            }
                            else {
                                console.log("================");
                                console.log(resIns);
                                //result(null, resup.insertId);
                            }
                        });
                    });
                db_config_1.dbConn.query("DELETE FROM usuarios_proyectos WHERE id_usuario = ? AND id_proyecto NOT IN (" + usuario.proyectos.join() + ")", [id], function (err, resdel) {
                    if (err) {
                        console.log("error", err);
                        result(err, null);
                    }
                    else {
                        console.log("re");
                        result(null, res);
                    }
                });
            }
        });
    }
    static remove(id, result) {
        db_config_1.dbConn.query("DELETE FROM usuarios_proyectos WHERE id_usuario = ?", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                db_config_1.dbConn.query("DELETE FROM usuarios WHERE id = ?", [id], function (err, res) {
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
exports.Usuario = Usuario;
