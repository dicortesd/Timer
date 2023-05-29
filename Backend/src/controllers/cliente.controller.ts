import { Cliente } from "../models/cliente.model";
import express, { Express, Request, Response } from 'express';

export const findAll = function(req: Request,res: Response){
    Cliente.findAll(function(err: Error,cliente:Cliente){
        console.log('controller');
        if (err){
            res.send(err);
        }
        else{
            console.log('res',cliente);
            res.send(cliente);
        }

    });
};

export const create = function(req: Request, res: Response){
    const new_cliente = new Cliente(req.body);
    // handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message: 'Por favor provea todos los campos requeridos.'});
    }
    else{
        Cliente.create(new_cliente, function(err: Error,cliente: Cliente){
            if(err){
                res.send(err);
            }
            else{
                res.json({error:false,message:"Cliente añadido exitosamente"});
            }
        });
    }
    
};

export const findById = function(req: Request, res: Response) {
    Cliente.findById(req.params.id, function(err: Error, cliente: Cliente) {
        if (err){
            res.send(err);
        }
        else{
            res.json(cliente);
        }
    });
};

export const update = function(req:Request, res:Response) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor provea todos los campos requeridos.' });
    }
    else{
        Cliente.update(req.params.id, new Cliente(req.body), function(err: Error, cliente: Cliente) {
            if (err){
                res.send(err);
            }
            else{
                res.json({ error:false, message: 'cliente modificado exitosamente'});
            }
        });
    }
};

export const remove = function(req:Request, res:Response) {
    Cliente.remove( req.params.id, function(err: Error, cliente: Cliente) {
        console.log(Cliente);
        if (err)  {
            res.send({error: err});
        }
        else{
            res.json({ error:false, message: 'Cliente borrado exitosamente' });
        }
    });
};