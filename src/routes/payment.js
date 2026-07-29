import express from 'express';
import {
    getAllPayments,
    singlePayment,
    createPayment,
    updatePayment,
    deletePayment,
} from '../controllers/payment.js';

const paymentRoutes = express.Router();
paymentRoutes.get('/api/getAllPayments', getAllPayments);
paymentRoutes.get('/api/getPayment/:id', singlePayment);
paymentRoutes.post('/api/createPayment', createPayment);
paymentRoutes.put('/api/updatePayment/:id', updatePayment);
paymentRoutes.delete('/api/deletePayment/:id', deletePayment);

export default paymentRoutes;
