import express from "express";
import sequelize from "./src/config/db.js";
import { error } from "console";
import userRoutes from "./src/routes/user.js";
import OrderRoutes from "./src/routes/order.js";
import productRoutes from "./src/routes/product.js";
import paymentRoutes from "./src/routes/payment.js";
import notificationRoutes from "./src/routes/notification.js";
import AuthRoutes from "./src/routes/auth.js";
import swaggerUi from "swagger-ui-express";
import  swaggerSpec from "./src/docs/swagger.js"

const app = express();


app.use(express.json());
app.use("/docs",
    swaggerUi.serve,swaggerUi.setup(swaggerSpec)
);
app.use(userRoutes)
app.use(OrderRoutes)
app.use(productRoutes)
app.use(paymentRoutes)
app.use(notificationRoutes)
app.use(AuthRoutes);
const PORT = process.env.PORT || 5000;
sequelize
    .authenticate()
    .then(() => {
        console.log("your database is connected successfully");
        return sequelize.sync();

    })

.then(
        () =>
        app.listen(PORT, () =>
            console.log(`your server is running on port ${PORT}`)))
    .catch((err) => {
        console.error("unable to connect to the database :", err);
    });

export default app