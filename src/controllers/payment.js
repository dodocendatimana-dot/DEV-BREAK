import Payment from '../database/models/payment.js';
import Order from '../database/models/order.js';

const paymentIncludes = [{
    model: Order,
    as: 'order',
    attributes: ['id', 'quantity', 'totalPrice', 'status', 'date'],
}, ];

export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: paymentIncludes,
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const singlePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id, { include: paymentIncludes });
        if (!payment) {
            return res.status(404).json({ message: 'payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPayment = async (req, res) => {
    try {
        const { orderId, amount, status } = req.body;

        if (!orderId || amount === undefined) {
            return res.status(400).json({ message: 'orderId and amount are required' });
        }

        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }

        const payment = await Payment.create({
            orderId,
            amount,
            status: status || 'pending',
        });

        res.status(201).json({ message: 'payment created successfully', payment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'payment not found' });
        }

        const { orderId, amount, status } = req.body;

        if (orderId !== undefined) {
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ message: 'order not found' });
            }
        }

        await payment.update({
            orderId: orderId ?? payment.orderId,
            amount: amount ?? payment.amount,
            status: status ?? payment.status,
        });

        res.status(200).json({ message: 'payment updated successfully', payment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'payment not found' });
        }

        await payment.destroy();
        res.status(200).json({ message: 'payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
