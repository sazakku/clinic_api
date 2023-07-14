import mongoose, { ConnectOptions } from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/mydatabase';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error.bind(console, 'MongoDB connection error:');
    process.exit(1); // Salir del proceso en caso de error
  }
};

export default connectDB;
