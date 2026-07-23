import Order from "../database/models/order.js";
import User from "../database/models/user.js";
import Product from "../database/models/product.js";

const orderIncludes = [{
    model: User,
    as: 'user',
    attributes: ['id', 'fullName', 'email', 'phoneNumber', 'role', 'status'],
},
{
    model: Product,
    as: 'product',
    attributes: ['id', 'name', 'description', 'price'],
},
];

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: orderIncludes,
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const singleOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: orderIncludes,
        });
        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { userId, productId, quantity, totalPrice, status, date } = req.body;

        const normalizedUserId = userId ? String(userId).trim() : '';
        const normalizedProductId = productId ? String(productId).trim() : '';
        const normalizedQuantity = quantity !== undefined && quantity !== null && quantity !== '' ? Number(quantity) : NaN;
        const normalizedTotalPrice = totalPrice !== undefined && totalPrice !== null && totalPrice !== '' ? Number(totalPrice) : NaN;

        if (!normalizedUserId || !normalizedProductId || Number.isNaN(normalizedQuantity) || Number.isNaN(normalizedTotalPrice)) {
            return res.status(400).json({ message: 'userId, productId, quantity, and totalPrice are required' });
        }

        let user = await User.findByPk(normalizedUserId);
        if (!user) {
            user = await User.findByPk(Number(normalizedUserId));
        }
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        let product = await Product.findByPk(normalizedProductId);
        if (!product) {
            product = await Product.findByPk(Number(normalizedProductId));
        }
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }

        const newOrder = await Order.create({
            userId: user.id,
            productId: product.id,
            quantity: normalizedQuantity,
            totalPrice: normalizedTotalPrice,
            status: status || 'pending',
            date,
        });

        res.status(201).json({ message: 'order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }

        const { userId, productId, quantity, totalPrice, status, date } = req.body;
        let resolvedUserId = order.userId;
        let resolvedProductId = order.productId;

        if (userId !== undefined) {
            const normalizedUserId = String(userId).trim();
            let user = await User.findByPk(normalizedUserId);
            if (!user) {
                user = await User.findByPk(Number(normalizedUserId));
            }
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
            resolvedUserId = user.id;
        }

        if (productId !== undefined) {
            const normalizedProductId = String(productId).trim();
            let product = await Product.findByPk(normalizedProductId);
            if (!product) {
                product = await Product.findByPk(Number(normalizedProductId));
            }
            if (!product) {
                return res.status(404).json({ message: 'product not found' });
            }
            resolvedProductId = product.id;
        }

        const normalizedQuantity = quantity !== undefined && quantity !== null && quantity !== '' ? Number(quantity) : undefined;
        const normalizedTotalPrice = totalPrice !== undefined && totalPrice !== null && totalPrice !== '' ? Number(totalPrice) : undefined;

        await order.update({
            userId: resolvedUserId,
            productId: resolvedProductId,
            quantity: normalizedQuantity ?? order.quantity,
            totalPrice: normalizedTotalPrice ?? order.totalPrice,
            status: status ?? order.status,
            date: date ?? order.date,
        });

        res.status(200).json({ message: 'order updated successfully', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }

        await order.destroy();
        res.status(200).json({ message: 'order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
