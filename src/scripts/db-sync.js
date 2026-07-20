import sequelize from '../config/db.js';
import "../database/index.js";
import { createUserTable } from '../database/migrations/user.js';
import { createnotificationTable } from '../database/migrations/notification.js';
import { createorderTable } from '../database/migrations/order.js';
import { createpaymentTable } from '../database/migrations/payment.js';
import { createproductTable } from '../database/migrations/product.js';







const syncDatabase = async() => {
    try {
        console.log('starting database sync...');
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        await createUserTable();
        await createnotificationTable();
        await createorderTable();
        await createpaymentTable();
        await createproductTable();


        await sequelize.sync({ alter: true, logging: false })
        console.log("database sync successfully");
        process.exit(0);

    } catch (error) {
        console.error("Database sync failed:", error);
        process.exit(1);
    }
};
syncDatabase();