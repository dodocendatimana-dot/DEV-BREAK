import express from 'express';

import {
    getAllUsers,
    singleUser
} from '../controllers/user.js';

const userRoutes = express.Router();
userRoutes.get("/api/getAllUsers", getAllUsers);
userRoutes.get("/api/getUser/:id", singleUser);

export default userRoutes;