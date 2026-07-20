import sequelize from '../../config/db.js';
import order from '../models/order.js';




export const createorderTable = async() => {
    await sequelize.authenticate();
    await order.sync({ alter: true, logging: false })
    console.log('order table created or updated successfully.');
};