import Payment from '../database/models/payment.js';
import Order from '../database/models/order.js';
import bcrypt from 'bcrypt';


const paymentIncludes = [{
    model: Order,
    as: 'order',
    attributes: ['id', 'quantity', 'totalPrice', 'status', 'date'],
}, ];

export const getAllPayments = async(req, res) => {
    try {
        const payments = await Payment.findAll({ include: paymentIncludes });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const singlePayment = async(req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id, { include: paymentIncludes });
        if (payment) {
            return res.status(404).json({ message: 'payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};