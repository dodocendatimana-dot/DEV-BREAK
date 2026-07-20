import sequelize from '../../config/db.js';
import user from './user';
import product from './product';
import payment from './payment';
import order from './order';
import notification from './notification';


const db = {
    sequelize,
    user,
    product,
    payment,
    order,
    notification,
}
export default db;