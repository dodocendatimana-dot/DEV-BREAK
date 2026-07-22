import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";
import Order from './order.js';

class Payment extends Model {}
Payment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
});

Payment.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order',
    onDelete: 'CASCADE',
});

Order.hasMany(Payment, {
    foreignKey: 'orderId',
    as: 'payments',
});

export default Payment;