import sequelize from '../config/db.js';
import '../database/index.js';
import { createUserTable } from '../database/migrations/user.js';
import { createnotificationTable } from '../database/migrations/notification.js';
import { createorderTable } from '../database/migrations/order.js';
import { createpaymentTable } from '../database/migrations/payment.js';
import { createproductTable } from '../database/migrations/product.js';
import { seedUsers } from '../database/seeds/user.js';
import { seedProducts } from '../database/seeds/product.js';
import { seedOrders } from '../database/seeds/order.js';
import { seedPayments } from '../database/seeds/payment.js';
import { seedNotifications } from '../database/seeds/notification.js';







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

        await seedUsers();
        await seedProducts();
        await seedOrders();
        await seedPayments();
        await seedNotifications();
        console.log("database sync successfully");
        process.exit(0);

    } catch (error) {
        console.error("Database sync failed:", error);
        process.exit(1);
    }
};
syncDatabase();