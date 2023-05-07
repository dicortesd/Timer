import { Tiempo } from "../models/tiempo.model";
import express, { Express, Request, Response } from 'express';

export const findAll = function(req: Request,res: Response){
    Tiempo.findAll(function(err: Error,tiempo: Tiempo){
        console.log('controller');
        if (err){
            res.send(err);
        }
        else{
            console.log('res',tiempo);
            res.send(tiempo);
        }

    });
};

export const create = function(req: Request, res: Response){
    const new_tiempo = new Tiempo(req.body);
    // handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message: 'Por favor provea todos los campos requeridos.'});
    }
    else{
        Tiempo.create(new_tiempo, function(err: Error,tiempo: Tiempo){
            if(err){
                res.send(err);
            }
            else{
                res.json({error:false,message:"Tiempo añadido exitosamente"});
            }
        });
    }
    
};

export const findById = function(req: Request, res: Response) {
    Tiempo.findById(req.params.id, function(err: Error, tiempo: Tiempo) {
        if (err){
            res.send(err);
        }
        else{
            res.json(tiempo);
        }
    });
};

export const update = function(req:Request, res:Response) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else{
        Tiempo.update(req.params.id, new Tiempo(req.body), function(err: Error, tiempo: Tiempo) {
            if (err){
                res.send(err);
            }
            else{
                res.json({ error:false, message: 'tiempo modificado exitosamente'});
            }
        });
    }
};

export const remove = function(req:Request, res:Response) {
    Tiempo.remove( req.params.id, function(err: Error, tiempo: Tiempo) {
        if (err)  {
            res.send(err);
        }
        else{
            res.json({ error:false, message: 'tiempo borrado exitosamente' });
        }
    });
};

export const consultas = function(req: Request,res: Response){
    Tiempo.consultas(req, function(err: Error,resultado: Response){
        console.log('controller');
        if (err){
            res.send(err);
        }
        else{
            console.log('res',resultado);
            res.send(resultado);
        }
    });
};