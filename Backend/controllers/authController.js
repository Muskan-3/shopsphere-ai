import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res) => {
    try {
        // Step 1: Get user details
        const { name, email, password } = req.body;

        // Step 2: Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide all fields"
            });
        }

        // Step 3: Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Step 4: Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Step 5: Create user
        await User.create({
            name,
            email,
            password: hashPassword
        });

        // Step 6: Send response
        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};
