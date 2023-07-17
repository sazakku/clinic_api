import express from 'express';
import { Router } from 'express';
import SpecialityController from '../controllers/SpecialityController';

const router: Router = express.Router();

// Ruta para obtener todas las especialidades
router.get('/specialities', SpecialityController.getAllSpecialities);

// Ruta para crear una nueva especialidad
router.post('/specialities', SpecialityController.createSpeciality);

// Ruta para borrar una especialidad
router.delete('/specialities/:id', SpecialityController.deleteSpeciality);

// Ruta para editar una especialidad
router.put('/specialities/:id', SpecialityController.editSpeciality);

export default router;
