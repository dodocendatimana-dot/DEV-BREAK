import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.js';

class Notification extends Model {}
Notification.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('unread', 'read'),
        defaultValue: 'unread',
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
});

export default Notification;