import sequelize from '../../config/db.js';
import notification from '../models/notification.js';




export const createnotificationTable = async() => {
    await sequelize.authenticate();
    await notification.sync({ alter: true, logging: false })
    console.log('notification table created or updated successfully.');
};