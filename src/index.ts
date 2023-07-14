import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/appointment';

const app = express();
const morgan = require('morgan');
const port = 3000;

app.use(bodyParser.json());
// Configuración del middleware de registro
app.use(morgan('dev'));
app.use('/api', todoRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
