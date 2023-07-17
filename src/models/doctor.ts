import mongoose, { Schema, Document } from 'mongoose';
import { ISpeciality } from './speciality';
import { IAppointment } from './appointment';

export interface IDoctor extends Document {
  name: string;
  lastName: string;
  specialities: ISpeciality['_id'][];
  office: string;
  contactEmail: string;
  appointments: IAppointment['_id'][];
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  specialities: [{ type: Schema.Types.ObjectId, ref: 'Speciality' }],
  office: { type: String, required: true },
  contactEmail: { type: String, required: true },
  appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],
});

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
