import express from 'express';
import patientRoutes from './patientRoutes';
import doctorRoutes from './doctorRoutes';
import appointmentRoutes from './appointmentRoutes';

const router = express.Router();

router.use('/api', patientRoutes);
router.use('/api', doctorRoutes);
router.use('/api', appointmentRoutes);

export default router;
