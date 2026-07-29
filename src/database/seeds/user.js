import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const seedUsers = async() => {
    const hashedPassword = await bcrypt.hash('Test123', 8);

    const users = [{
            fullName: "Dodoce Ndatimana",
            email: "dodocendatimana@gmail.com",
            phoneNumber: "+250792227073",
            password: hashedPassword,
            role: "customer",
            status: "active"
        },
        {
            fullName: "Nadine Izabayo",
            email: "izabayonadine@gmail.com",
            phoneNumber: "+250793457073",
            password: hashedPassword,
            role: "customer",
            status: "active"
        },
        {
            fullName: "ian",
            email: "ian@gmail.com",
            phoneNumber: "+25079217073",
            password: hashedPassword,
            role: "seller",
            status: "active"
        },
        {
            fullName: "admin",
            email: "admin@gmail.com",
            phoneNumber: "+250792227073",
            password: hashedPassword,
            role: "admin",
            status: "active"
        },
    ];

    await User.bulkCreate(users, { ignoreDuplicates: true });
}