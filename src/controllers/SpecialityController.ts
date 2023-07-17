import { Request, Response } from 'express';
import Speciality, { ISpeciality } from '../models/speciality';

const SpecialityController = {
  getAllSpecialities: async (req: Request, res: Response) => {
    try {
      const specialities = await Speciality.find();
      res.status(200).json(specialities);
    } catch (error) {
      res.status(500).json({ error: `Error al obtener las especialidades: ${error}` });
    }
  },

  createSpeciality: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      // Verificar si el doctor ya existe en la base de datos por su contactEmail
      const existingSpeciality = await Speciality.findOne({ name });
      if (existingSpeciality) {
        return res.status(400).json({ error: 'Ya existe una especialidad con ese nombre' });
      }
      const speciality: ISpeciality = new Speciality({
        name,
      });
      const savedSpeciality = await speciality.save();
      res.status(201).json(savedSpeciality);
    } catch (error) {
      res.status(400).json({ error: `Error al crear la especialidad: ${error}` });
    }
  },

  deleteSpeciality: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedSpeciality = await Speciality.findByIdAndDelete(id);
      if (!deletedSpeciality) {
        return res.status(404).json({ error: 'Especialidad no encontrada' });
      }
      res.status(200).json(deletedSpeciality);
    } catch (error) {
      res.status(500).json({ error: `Error al borrar la especialidad: ${error}` });
    }
  },

  editSpeciality: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedSpeciality = await Speciality.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedSpeciality) {
        return res.status(404).json({ error: 'Especialidad no encontrada' });
      }
      res.status(200).json(updatedSpeciality);
    } catch (error) {
      res.status(500).json({ error: `Error al editar la especialidad: ${error}` });
    }
  },
};

export default SpecialityController;
