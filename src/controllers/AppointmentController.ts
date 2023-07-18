import Appointment from '../models/appointment';
import Patient from '../models/patient';
import Doctor from '../models/doctor';
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
      const { documentId, specialityId, doctorId, date, time } = req.body;
      const patient = await Patient.findOne({ documentId: documentId });
      const speciality = await Speciality.findById(specialityId);
      const doctor = await Doctor.findById(doctorId);

      if (!patient || !speciality || !doctor) {
        return res.status(404).json({ error: 'Paciente o especialidad no encontrado' });
      }
      const appointment = new Appointment({
        patient: patient,
        speciality: speciality,
        doctor: doctor,
        date: date,
        time: time
      });
      await appointment.save();
      patient.appointments.push(appointment);
      await patient.save();
      doctor.appointments.push(appointment);
      await doctor.save();
      res.status(201).json(appointment);
    } catch (error) {
      res.status(500).json({ error: `Error al crear la cita: ${error}` });
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
  },

  editAppointment: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedAppointment) {
        return res.status(404).json({ error: 'Appointment no encontrado' });
      }
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: `Error al editar el Appointment: ${error}` });
    }
  }
};

export default AppointmentController;
