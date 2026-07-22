import express from 'express';
import {
    getAllPayments,
    singlePayment
} from '../controllers/payment.js';

const paymentRoutes = express.Router();
paymentRoutes.get('/api/getAllPayments', getAllPayments);
paymentRoutes.get('/api/getPayment/:id', singlePayment);

export default paymentRoutes;