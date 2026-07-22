import Product from '../models/product.js';
import bcrypt from 'bcrypt';

export const seedProducts = async() => {

    const products = [{
            name: 'Laptop',
            description: 'Gaming laptop',
            price: 800,
        },
        {
            name: 'Smartphone',
            description: 'Latest Android phone',
            price: 500,
        },
        {
            name: 'Headphones',
            description: 'Noise cancelling headphones',
            price: 150,
        },
    ];

    await Product.bulkCreate(products, { ignoreDuplicates: true });
};