import express from 'express';

import {
    getAllOrders,
    singleOrder,
    createOrder,
    updateOrder,
    deleteOrder,
} from '../controllers/order.js';

const orderRoutes = express.Router();
orderRoutes.get("/api/getAllOrder", getAllOrders);
orderRoutes.get("/api/getOrder/:id", singleOrder);
orderRoutes.post("/api/createOrder", createOrder);
orderRoutes.put("/api/updateOrder/:id", updateOrder);
orderRoutes.delete("/api/deleteOrder/:id", deleteOrder);

export default orderRoutes;