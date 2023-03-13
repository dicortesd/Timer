import express, { Express, Request, Response } from 'express';
const router = express.Router();
import * as clienteController from '../controllers/cliente.controller';

// Devuelva todos los usuarios

router.get('/', clienteController.findAll);

// Cree un nuevo usuario
router.post('/', clienteController.create);

// Retrieve a single usuario with id
router.get('/:id', clienteController.findById);

// Update a usuario with id
router.put('/:id', clienteController.update);

// Delete a usuario with id
router.delete('/:id', clienteController.remove);

export = router