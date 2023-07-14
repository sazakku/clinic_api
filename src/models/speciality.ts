import mongoose, { Schema, Document } from 'mongoose';
import { IDoctor } from './doctor';
import { IAppointment } from './appointment';

export interface ISpeciality extends Document {
  name: string;
  doctor: IDoctor['_id'];
  appointment: IAppointment['_id'];
  // Otros campos adicionales de la especialidad
}

const SpecialitySchema: Schema = new Schema({
  name: { type: String, required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment', required: true },
  // Definir aquí los otros campos adicionales de la especialidad
});

export default mongoose.model<ISpeciality>('Speciality', SpecialitySchema);
