import mongoose, { Schema, Document } from 'mongoose';
import { ISpeciality } from './speciality';
import { IAppointment } from './appointment';

export interface IDoctor extends Document {
  nombre: string;
  apellido: string;
  specialities: ISpeciality['_id'][];
  consultorio: string;
  correoContacto: string;
  appointments: IAppointment['_id'][];
}

const DoctorSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  specialities: [{ type: Schema.Types.ObjectId, ref: 'Speciality' }],
  consultorio: { type: String, required: true },
  correoContacto: { type: String, required: true },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
});

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
