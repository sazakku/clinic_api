import mongoose, { Schema, Document } from 'mongoose';
import { IAppointment } from './appointment';

export interface IPatient extends Document {
  name: string;
  documentId: string;
  lastName: string;
  age: number;
  phone: string;
  appointments: IAppointment['_id'][];
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  documentId: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
});

export default mongoose.model<IPatient>('Patient', PatientSchema);
