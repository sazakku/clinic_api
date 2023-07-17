import Patient from '../models/patient';
import Appointment from '../models/appointment';
import { Request, Response } from 'express';

const PatientController = {
  getAllPatients: async (req: Request, res: Response) => {
    try {
      const patients = await Patient.find().populate('appointments');
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pacientes' });
    }
  },

  createPatient: async (req: Request, res: Response) => {
    console.log(req.body)
    try {
      const { name, documentId, lastName, age, phone } = req.body;
      
      // Verificar si el paciente ya existe en la base de datos por su documentId
      const existingPatient = await Patient.findOne({ documentId });
      if (existingPatient) {
        return res.status(400).json({ error: 'Ya existe un paciente con ese Documento de Identidad' });
      }
      const patient = new Patient({
        name,
        documentId,
        lastName,
        age,
        phone
      });
      await patient.save();
      console.log(patient)
      res.status(201).json(patient);
    } catch (error) {
      res.status(500).json({ error: `Error al crear el paciente${error}` });
    }
  },

  getPatientById: async (req: Request, res: Response) => {
    try {
      const patientId = req.params.id;
      const patient = await Patient.findById(patientId).populate('appointments');
      if (!patient) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el paciente' });
    }
  },

  editPatient: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedPatient) {
        return res.status(404).json({ error: 'Patient no encontrado' });
      }
      res.status(200).json(updatedPatient);
    } catch (error) {
      res.status(500).json({ error: `Error al editar el Patient: ${error}` });
    }
  }
};

export default PatientController;
