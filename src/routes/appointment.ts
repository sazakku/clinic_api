import express, { Request, Response } from 'express';
import Appointment from '../models/appointment';

const router = express.Router();

// Ruta para obtener todos los appointments
router.get('/appointments', async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: `Internal server error ${error}` });
  }
});

// Ruta para crear un nuevo appointment
router.post('/appointments', async (req: Request, res: Response) => {
  try {
    const { patientId, specialityId } = req.body;

    // Verificar si los IDs de paciente y especialidad son válidos
    // y realizar las validaciones adicionales necesarias

    const appointment = new Appointment({ patient: patientId, speciality: specialityId });
    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para obtener un appointment por su ID
router.get('/appointments/:id', async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para eliminar un appointment por su ID
router.delete('/appointments/:id', async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await Appointment.deleteOne({ _id: req.params.id });

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
