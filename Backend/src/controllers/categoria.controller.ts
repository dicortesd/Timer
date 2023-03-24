import { Categoria } from "../models/categoria.model";
import express, { Express, Request, Response } from 'express';

export const findAll = function(req: Request,res: Response){
    Categoria.findAll(function(err: Error,categoria: Categoria){
        console.log('controller');
        if (err){
            res.send(err);
        }
        else{
            console.log('res',categoria);
            res.send(categoria);
        }

    });
};

export const create = function(req: Request, res: Response){
    const new_categoria = new Categoria(req.body);
    // handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message: 'Por favor provea todos los campos requeridos.'});
    }
    else{
        Categoria.create(new_categoria, function(err: Error,categoria: Categoria){
            if(err){
                res.send(err);
            }
            else{
                res.json({error:false,message:"Categoria añadida exitosamente"});
            }
        });
    }
    
};

export const findById = function(req: Request, res: Response) {
    Categoria.findById(req.params.id, function(err: Error, categoria: Categoria) {
        if (err){
            res.send(err);
        }
        else{
            res.json(categoria);
        }
    });
};

export const update = function(req:Request, res:Response) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else{
        Categoria.update(req.params.id, new Categoria(req.body), function(err: Error, categoria: Categoria) {
            if (err){
                res.send(err);
            }
            else{
                res.json({ error:false, message: 'categoria modificada exitosamente'});
            }
        });
    }
};

export const remove = function(req:Request, res:Response) {
    Categoria.remove( req.params.id, function(err: Error, categoria: Categoria) {
        if (err)  {
            res.send(err);
        }
        else{
            res.json({ error:false, message: 'Categoria borrada exitosamente' });
        }
    });
};