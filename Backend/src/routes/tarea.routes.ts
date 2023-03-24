import express, { Express, Request, Response } from 'express';
const router = express.Router();
import * as tareaController from '../controllers/tarea.controller';

// Devuelva todos los usuarios

router.get('/', tareaController.findAll);

// Cree un nuevo usuario
router.post('/', tareaController.create);

// Retrieve a single usuario with id
router.get('/:id', tareaController.findById);

// Update a usuario with id
router.put('/:id', tareaController.update);

// Delete a usuario with id
router.delete('/:id', tareaController.remove);

export = router