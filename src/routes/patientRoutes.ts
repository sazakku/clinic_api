import express from 'express';
import { Router } from 'express';
import PatientController from '../controllers/PatientController';

const router: Router = express.Router();


// Obtener todos los pacientes
router.get('/patients', PatientController.getAllPatients);

// Crear un nuevo paciente
router.post('/patients', PatientController.createPatient);

// Obtener un paciente por su ID
router.get('/patients/:id', PatientController.getPatientById);

export default router;
