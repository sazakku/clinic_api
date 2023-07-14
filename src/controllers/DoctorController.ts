import Doctor from '../models/doctor';
import Speciality from '../models/speciality';
import { Request, Response } from 'express';


const DoctorController = {
  getAllDoctors: async (req: Request, res: Response) => {
    try {
      const doctors = await Doctor.find().populate('specialities');
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los doctores' });
    }
  },

  createDoctor: async (req: Request, res: Response) => {
    try {
      const { name, lastName, specialities, office, contactEmail } = req.body;
      const doctor = new Doctor({
        name,
        lastName,
        specialities,
        office,
        contactEmail
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
  }
};

export default DoctorController;
