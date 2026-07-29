import Payment from '../models/payment.js';
import Order from '../models/order.js';

export const seedPayments = async() => {
    const orders = await Order.findAll({ attributes: ['id'], limit: 3 });

    if (orders.length === 0) {
        console.log('Skipping payment seed: no orders found.');
        return;
    }

    const payments = [{
            orderId: orders[0].id,
            amount: 40,
            status: 'completed',
        },
        {
            orderId: orders[1].id,
            amount: 25,
            status: 'pending',
        },
        {
            orderId: orders[2].id,
            amount: 90,
            status: 'failed',
        },
    ];

    await Payment.bulkCreate(payments, { ignoreDuplicates: true });
};
