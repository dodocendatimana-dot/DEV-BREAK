import Notification from '../models/notification.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const seedNotifications = async() => {
    const users = await User.findAll({ attributes: ['id'], limit: 3 });

    if (users.length === 0) {
        console.log('Skipping notification seed: no users found.');
        return;
    }

    const notifications = [{
            userId: users[0].id,
            message: 'Welcome to Dev Sale!',
            status: 'active',
        },
        {
            userId: users[1].id,
            message: 'Your order has been shipped.',
            status: 'active',
        },
        {
            userId: users[2].id,
            message: 'Payment received successfully.',
            status: 'active',
        },
    ];

    await Notification.bulkCreate(notifications, { ignoreDuplicates: true });
};