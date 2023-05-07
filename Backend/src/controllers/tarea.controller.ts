import { Tarea } from "../models/tarea.model";
import express, { Express, Request, Response } from 'express';

export const findAll = function(req: Request,res: Response){
    Tarea.findAll(req, function(err: Error,tareas: Response){
        console.log('controller');
        if (err){
            res.send(err);
        }
        else{
            console.log('res',tareas);
            res.send(tareas);
        }
    });
};

export const create = function(req: Request, res: Response){
    const new_proyecto = new Tarea(req.body);
    // handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message: 'Por favor provea todos los campos requeridos.'});
    }
    else{
        Tarea.create(new_proyecto, function(err: Error,tarea: Tarea){
            if(err){
                res.send(err);
            }
            else{
                res.json({error:false,message:"Tarea añadido exitosamente"});
            }
        });
    }
    
};

export const findById = function(req: Request, res: Response) {
    Tarea.findById(req.params.id, function(err: Error, tarea: Tarea) {
        if (err){
            res.send(err);
        }
        else{
            res.json(tarea);
        }
    });
};

export const update = function(req:Request, res:Response) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else{
        Tarea.update(req.params.id, new Tarea(req.body), function(err: Error, tarea: Tarea) {
            if (err){
                res.send(err);
            }
            else{
                res.json({ error:false, message: 'tarea modificada exitosamente'});
            }
        });
    }
};

export const remove = function(req:Request, res:Response) {
    Tarea.remove( req.params.id, function(err: Error, tarea: Tarea) {
        if (err)  {
            res.send(err);
        }
        else{
            res.json({ error:false, message: 'tarea borrada exitosamente' });
        }
    });
};