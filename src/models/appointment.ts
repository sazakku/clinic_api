import mongoose, { Schema, Document } from 'mongoose';
import { IPatient } from './patient';
import { ISpeciality } from './speciality';
import { IDoctor } from './doctor';

export interface IAppointment extends Document {
  patient: IPatient['_id'];
  speciality: ISpeciality['_id'];
  doctor: IDoctor['_id'];
  date: Date;
  time: string;
}

const AppointmentSchema: Schema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  speciality: { type: Schema.Types.ObjectId, ref: 'Speciality', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);

