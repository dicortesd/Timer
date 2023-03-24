import express, { Express, Request, Response } from 'express';
const router = express.Router();
import * as proyectoController from '../controllers/proyecto.controller';

// Devuelva todos los usuarios

router.get('/', proyectoController.findAll);

// Cree un nuevo usuario
router.post('/', proyectoController.create);

// Retrieve a single usuario with id
router.get('/:id', proyectoController.findById);

// Update a usuario with id
router.put('/:id', proyectoController.update);

// Delete a usuario with id
router.delete('/:id', proyectoController.remove);

export = router