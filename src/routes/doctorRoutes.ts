import express from 'express';
import { Router } from 'express';
import DoctorController from '../controllers/DoctorController';

const router: Router = express.Router();

// Obtener todos los doctores
router.get('/doctors', DoctorController.getAllDoctors);

// Crear un nuevo doctor
router.post('/doctors', DoctorController.createDoctor);

// Obtener un doctor por su ID
router.get('/doctors/:id', DoctorController.getDoctorById);

export default router;
