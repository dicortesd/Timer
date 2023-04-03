import express, { Express, Request, Response } from 'express';
const router = express.Router();
import * as proyectoController from '../controllers/proyecto.controller';

// Devuelva todos los proyectos

router.get('/', proyectoController.findAll);

// Cree un nuevo proyecto
router.post('/', proyectoController.create);

// Retrieve a single proyecto with id
router.get('/:id', proyectoController.findById);

// Update a proyecto with id
router.put('/:id', proyectoController.update);

// Delete a proyecto with id
router.delete('/:id', proyectoController.remove);

export = router