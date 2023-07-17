import mongoose, { Schema, Document } from 'mongoose';

export interface ISpeciality extends Document {
  name: string;
}

const SpecialitySchema: Schema = new Schema({
  name: { type: String, required: true }
});

export default mongoose.model<ISpeciality>('Speciality', SpecialitySchema);
