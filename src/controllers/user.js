import User from "../database/models/user.js";
import bcrypt from "bcrypt";


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


//createeuser 
export const createUser = async(req, res) => {
    try {
        const {
            password,
            ...userData
        } = req.body;
        const existing = await User.findOne({ where: { email: userData.email } });
        if (existing)
            return res.status(400).json({ message: "email already used" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({...userData,
            password: hashedPassword
        });
        res.status(201).json({ message: "user registered successfully", user })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

//UPDATING USER 
export const updateUser = async(req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user)
                return res.status(400).json({ message: "user not found,we can not update user" });
            await User.update(req.body);
            res.status(200).json({ message: "user updated successfully", user })

        } catch (error) {
            res.status(500).json({ error: error.message });

        }
    }
    //delete user
export const deleteUser = async(req, res) => {
    try {
        const delUser = await User.findByPk(req.params.id);
        if (!delUser)
            return res.status(400).json({ message: "user not found" });
        await delUser.destroy();
        req.status(200).json({ mesage: "user deleted successfuly" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}