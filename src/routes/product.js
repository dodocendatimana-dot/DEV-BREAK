import express from 'express';
import {
    getAllProducts,
    singleProduct
} from '../controllers/product.js';

const productRoutes = express.Router();
productRoutes.get('/api/getAllProducts', getAllProducts);
productRoutes.get('/api/getProduct/:id', singleProduct);

export default productRoutes;
