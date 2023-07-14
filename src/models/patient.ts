import mongoose, { Schema, Document } from 'mongoose';
import { IAppointment } from './appointment';

export interface IPatient extends Document {
  nombre: string;
  cedula: string;
  apellido: string;
  edad: number;
  telefono: string;
  appointments: IAppointment['_id'][];
}

const PatientSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  cedula: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true },
  telefono: { type: String, required: true },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
});

export default mongoose.model<IPatient>('Patient', PatientSchema);
