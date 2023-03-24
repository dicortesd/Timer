import express, { Express, Request, Response } from 'express';
const router = express.Router();
import * as categoriaController from '../controllers/categoria.controller';

// Devuelva todos los usuarios

router.get('/', categoriaController.findAll);

// Cree un nuevo usuario
router.post('/', categoriaController.create);

// Retrieve a single usuario with id
router.get('/:id', categoriaController.findById);

// Update a usuario with id
router.put('/:id', categoriaController.update);

// Delete a usuario with id
router.delete('/:id', categoriaController.remove);

export = router