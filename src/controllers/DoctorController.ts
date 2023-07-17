import Doctor from '../models/doctor';
import Speciality from '../models/speciality';
import { Request, Response } from 'express';
const mongoose = require('mongoose');


const DoctorController = {
  getAllDoctors: async (req: Request, res: Response) => {
    try {
    // Verificar si se proporcionó el query parameter "specialityId"
    const { specialityId } = req.query;
    let query = {};

    // Si se proporcionó el query parameter "specialityId", agregamos el filtro a la consulta
    if (specialityId) {
      const specialityObjectId = new mongoose.Types.ObjectId(specialityId);
      query = { specialities: {'$in': [ specialityObjectId ] } };;
    }
      const doctors = await Doctor.find(query).populate('specialities');
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ error: `Error al obtener los doctores: ${error}` });
    }
  },

  createDoctor: async (req: Request, res: Response) => {
    try {
      const { name, lastName, specialities, office, contactEmail, appointments } = req.body;

      // Verificar si el doctor ya existe en la base de datos por su contactEmail
      const existingDoctor = await Doctor.findOne({ contactEmail });
      if (existingDoctor) {
        return res.status(400).json({ error: 'Ya existe un doctor con ese email' });
      }

      const doctor = new Doctor({
        name,
        lastName,
        specialities,
        office,
        contactEmail,
        appointments
      });
      await doctor.save();
      res.status(201).json(doctor);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el doctor' });
    }
  },

  getDoctorById: async (req: Request, res: Response) => {
    try {
      const doctorId = req.params.id;
      const doctor = await Doctor.findById(doctorId).populate('specialities');
      if (!doctor) {
        return res.status(404).json({ error: 'Doctor no encontrado' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el doctor' });
    }
  },

  editDoctor: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedDoctor) {
        return res.status(404).json({ error: 'Doctor no encontrado' });
      }
      res.status(200).json(updatedDoctor);
    } catch (error) {
      res.status(500).json({ error: `Error al editar el Doctor: ${error}` });
    }
  }
};

export default DoctorController;
