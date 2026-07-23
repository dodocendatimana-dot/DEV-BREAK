import Product from '../database/models/product.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const singleProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ message: 'name and price are required' });
        }

        const product = await Product.create({
            name,
            description,
            price,
        });

        res.status(201).json({ message: 'product created successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }

        const { name, description, price } = req.body;

        await product.update({
            name: name ?? product.name,
            description: description ?? product.description,
            price: price ?? product.price,
        });

        res.status(200).json({ message: 'product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }

        await product.destroy();
        res.status(200).json({ message: 'product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
