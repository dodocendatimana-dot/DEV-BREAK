import express from 'express';
import {
    getAllNotifications,
    singleNotification
} from '../controllers/notification.js';

const notificationRoutes = express.Router();
notificationRoutes.get('/api/getAllNotifications', getAllNotifications);
notificationRoutes.get('/api/getNotification/:id', singleNotification);

export default notificationRoutes;