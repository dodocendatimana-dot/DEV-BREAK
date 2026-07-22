import Notification from '../database/models/notification.js';
import User from '../database/models/user.js';
import bcrypt from 'bcrypt';

const notificationIncludes = [{
    model: User,
    as: 'user',
    attributes: ['id', 'fullName', 'email'],
}, ];

export const getAllNotifications = async(req, res) => {
    try {
        const notifications = await Notification.findAll({ include: notificationIncludes });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const singleNotification = async(req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id, { include: notificationIncludes });
        if (!notification) {
            return res.status(404).json({ message: 'notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};