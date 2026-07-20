import sequelize from '../../config/db.js';
import product from '../models/product.js';




export const createproductTable = async() => {
    await sequelize.authenticate();
    await product.sync({ alter: true, logging: false })
    console.log('product table created or updated successfully.');
};