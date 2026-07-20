import sequelize from '../../config/db.js';
import payment from '../models/payment.js';




export const createpaymentTable = async() => {
    await sequelize.authenticate();
    await payment.sync({ alter: true, logging: false })
    console.log('payment table created or updated successfully.');
};