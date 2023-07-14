import mongoose, { Schema, Document } from 'mongoose';
import { IPatient } from './patient';
import { ISpeciality } from './speciality';

export interface IAppointment extends Document {
  patient: IPatient['_id'];
  speciality: ISpeciality['_id'];
  // Otros campos adicionales de la cita
}

const AppointmentSchema: Schema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  speciality: { type: Schema.Types.ObjectId, ref: 'Speciality', required: true },
  // Definir aquí los otros campos adicionales de la cita, como fecha, hora, estado, etc.
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);

