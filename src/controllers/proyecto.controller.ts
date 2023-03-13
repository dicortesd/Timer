import { Proyecto } from "../models/proyecto.model";
import express, { Express, Request, Response } from 'express';

export const findAll = function(req: Request,res: Response){
    Proyecto.findAll(function(err: Error,proyecto: Proyecto){
        console.log('controller');
        if (err){
            res.send(err);
        }
        else{
            console.log('res',proyecto);
            res.send(proyecto);
        }

    });
};

export const create = function(req: Request, res: Response){
    const new_proyecto = new Proyecto(req.body);
    // handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message: 'Por favor provea todos los campos requeridos.'});
    }
    else{
        Proyecto.create(new_proyecto, function(err: Error,proyecto: Proyecto){
            if(err){
                res.send(err);
            }
            else{
                res.json({error:false,message:"Proyecto añadido exitosamente"});
            }
        });
    }
    
};

export const findById = function(req: Request, res: Response) {
    Proyecto.findById(req.params.id, function(err: Error, proyecto: Proyecto) {
        if (err){
            res.send(err);
        }
        else{
            res.json(proyecto);
        }
    });
};

export const update = function(req:Request, res:Response) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else{
        Proyecto.update(req.params.id, new Proyecto(req.body), function(err: Error, proyecto: Proyecto) {
            if (err){
                res.send(err);
            }
            else{
                res.json({ error:false, message: 'proyecto modificado exitosamente'});
            }
        });
    }
};

export const remove = function(req:Request, res:Response) {
    Proyecto.remove( req.params.id, function(err: Error, proyecto: Proyecto) {
        if (err)  {
            res.send(err);
        }
        else{
            res.json({ error:false, message: 'Proyecto borrado exitosamente' });
        }
    });
};