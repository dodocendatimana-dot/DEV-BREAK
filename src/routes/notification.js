import express from 'express';
import {
    getAllNotifications,
    singleNotification,
    createNotification,
    updateNotification,
    deleteNotification,
} from '../controllers/notification.js';

const notificationRoutes = express.Router();
notificationRoutes.get('/api/getAllNotifications', getAllNotifications);
notificationRoutes.get('/api/getNotification/:id', singleNotification);
notificationRoutes.post('/api/createNotification', createNotification);
notificationRoutes.put('/api/updateNotification/:id', updateNotification);
notificationRoutes.delete('/api/deleteNotification/:id', deleteNotification);

export default notificationRoutes;
