import express, { Express, Request, Response } from 'express';
const router = express.Router();
import * as tiempoController from '../controllers/tiempo.controller';


// Consultas
router.get('/consultas',tiempoController.consultas);

// Devuelva todos los usuarios

router.get('/', tiempoController.findAll);

// Cree un nuevo usuario
router.post('/', tiempoController.create);

// Retrieve a single usuario with id
router.get('/:id', tiempoController.findById);

// Update a usuario with id
router.put('/:id', tiempoController.update);

// Delete a usuario with id
router.delete('/:id', tiempoController.remove);

export = router