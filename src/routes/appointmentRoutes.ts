import express from 'express';
import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

const router: Router = express.Router();

// Obtener todas las citas
router.get('/appointments', AppointmentController.getAllAppointments);

// Crear una nueva cita
router.post('/appointments', AppointmentController.createAppointment);

// Obtener una cita por su ID
router.get('/appointments/:id', AppointmentController.getAppointmentById);

// Borrar una cita por su ID
router.delete('/appointments/:id', AppointmentController.deleteAppointmentById);

export default router;
