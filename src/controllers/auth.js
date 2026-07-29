import bcrypt from "bcrypt";
import User from "../database/models/user.js";
import jwt from "jsonwebtoken";



export const Register = async(req, res) => {
    try {
        const { password, ...userData } = req.body;
        const existing = await User.findOne({
            where: { email: userData.email }
        })
        if (existing)
            return res.status(404).json({ message: "this email already exist" });
        const hashpassword = await bcrypt.hash(password, 10);
        const userAccount = await User.create({...userData,
            password: hashpassword
        });
        res.status(201).json({ message: "user account  created successfully", userAccount })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const login = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "your credentials is no longer in database" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "invalid email or password" });
        const token = jwt.sign({
                id: user.id,
                role: user.role,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber
            },

            process.env.JWT_SECRET, { expiresIn: '2d' }
        )
        res.status(200).json({ message: "login successfully", token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}