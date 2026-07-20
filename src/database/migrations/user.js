import sequelize from '../../config/db.js';
import User from '../models/user.js';




export const createUserTable = async() => {
    await sequelize.authenticate();
    await User.sync({ alter: true, logging: false })
    console.log('User table created or updated successfully.');
};