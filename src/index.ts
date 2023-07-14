import express from 'express';
import bodyParser from 'body-parser';
import allRoutes from './routes/routes';
import connectDB from './db';

const app = express();
const morgan = require('morgan');
const port = 3000;
connectDB();

app.use(bodyParser.json());
// Configuración del middleware de registro
app.use(morgan('dev'));
app.use(allRoutes);

// Mostrar las rutas registradas
app._router.stack.forEach((route: any) => {
  if (route.route && route.route.path) {
    console.log(route.route.path);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
