import mongoose, { ConnectOptions } from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/proyectos.appointments';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
