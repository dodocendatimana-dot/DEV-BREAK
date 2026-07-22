import express from 'express';

import {
    getAllOrders,
    singleOrder
} from '../controllers/order.js';

const orderRoutes = express.Router();
orderRoutes.get("/api/getAllOrder", getAllOrders);
orderRoutes.get("/api/getOrder/:id", singleOrder);

export default orderRoutes;