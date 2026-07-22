import Order from "../database/models/order.js";
import User from "../database/models/user.js";
import Product from "../database/models/product.js";
import bcrypt from 'bcrypt';

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

//get all users
export const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.findAll({
            include: orderIncludes,
            order: [
                ['createdAt', 'DESC']
            ],
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

//get order by id
export const singleOrder = async(req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: orderIncludes,
        });
        if (!order) {
            return res.status(404).json({
                message: 'order not found'
            });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};