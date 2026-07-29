import Notification from '../database/models/notification.js';
import User from '../database/models/user.js';

const notificationIncludes = [{
    model: User,
    as: 'user',
    attributes: ['id', 'fullName', 'email'],
}, ];

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            include: notificationIncludes,
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const singleNotification = async (req, res) => {
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

export const createNotification = async (req, res) => {
    try {
        const { userId, message, status } = req.body;

        if (!userId || !message) {
            return res.status(400).json({ message: 'userId and message are required' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const notification = await Notification.create({
            userId,
            message,
            status: status || 'unread',
        });

        res.status(201).json({ message: 'notification created successfully', notification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'notification not found' });
        }

        const { userId, message, status } = req.body;

        if (userId !== undefined) {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
        }

        await notification.update({
            userId: userId ?? notification.userId,
            message: message ?? notification.message,
            status: status ?? notification.status,
        });

        res.status(200).json({ message: 'notification updated successfully', notification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: 'notification not found' });
        }

        await notification.destroy();
        res.status(200).json({ message: 'notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
