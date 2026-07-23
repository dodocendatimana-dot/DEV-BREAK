import express from 'express';
import {
    getAllProducts,
    singleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/product.js';

const productRoutes = express.Router();
productRoutes.get('/api/getAllProducts', getAllProducts);
productRoutes.get('/api/getProduct/:id', singleProduct);
productRoutes.post('/api/createProduct', createProduct);
productRoutes.put('/api/updateProduct/:id', updateProduct);
productRoutes.delete('/api/deleteProduct/:id', deleteProduct);

export default productRoutes;