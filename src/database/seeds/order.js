import Order from '../models/order.js';
import User from '../models/user.js';
import Product from '../models/product.js';
import bcrypt from 'bcrypt';

export const seedOrders = async() => {
    const users = await User.findAll({ attributes: ['id'], limit: 3 });
    const products = await Product.findAll({ attributes: ['id'], limit: 3 });


    const orders = [{
            userId: users[0].id,
            productId: products[0].id,
            quantity: 2,
            totalPrice: 40,
            status: 'active',
            date: new Date(),
        },
        {
            userId: users[1].id,
            productId: products[1].id,
            quantity: 1,
            totalPrice: 25,
            status: 'completed',
            date: new Date(),
        },
        {
            userId: users[2].id,
            productId: products[2].id,
            quantity: 3,
            totalPrice: 90,
            status: 'cancelled',
            date: new Date(),
        },
    ];

    await Order.bulkCreate(orders, { ignoreDuplicates: true });
};