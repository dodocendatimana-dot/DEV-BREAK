import User from "../database/models/user.js";
import bcryt from "bcrypt";


//get all users

export const getAllUsers = async(req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
        console.log("all users", users)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}


//get user by id
export const singleUser = async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            });
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}