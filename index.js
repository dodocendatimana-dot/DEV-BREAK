import express from "express";
import sequelize from "./src/config/db.js";

const app = express();
app.use(express.json());
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