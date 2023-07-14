import Appointment from '../models/appointment';
import Patient from '../models/patient';
import Speciality from '../models/speciality';
import { Request, Response } from 'express';

const AppointmentController = {
  getAllAppointments: async (req: Request, res: Response) => {
    try {
      const appointments = await Appointment.find().populate('patient speciality');
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las citas' });
    }
  },

  createAppointment: async (req: Request, res: Response) => {
    try {
      const { patientId, specialityId } = req.body;
      const patient = await Patient.findById(patientId);
      const speciality = await Speciality.findById(specialityId);
      if (!patient || !speciality) {
        return res.status(404).json({ error: 'Paciente o especialidad no encontrado' });
      }
      const appointment = new Appointment({
        patient,
        speciality
      });
      await appointment.save();
      patient.appointments.push(appointment);
      speciality.appointment.push(appointment);
      await patient.save();
      await speciality.save();
      res.status(201).json(appointment);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la cita' });
    }
  },

  getAppointmentById: async (req: Request, res: Response) => {
    try {
      const appointmentId = req.params.id;
      const appointment = await Appointment.findById(appointmentId).populate('patient speciality');
      if (!appointment) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la cita' });
    }
  },

  deleteAppointmentById: async (req: Request, res: Response) => {
    try {
      const appointmentId = req.params.id;
      const appointment = await Appointment.findByIdAndDelete(appointmentId);
      if (!appointment) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }
      res.status(200).json({ message: 'Cita eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la cita' });
    }
  }
};

export default AppointmentController;
