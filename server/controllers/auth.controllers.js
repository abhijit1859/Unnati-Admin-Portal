import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { name, email, password, UnnatiId, year } = req.body;

    if (!name || !email || !password || !UnnatiId || !year) {
        return res.status(400).json({ message: "Enter valid details" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            UnnatiId,
            year
        });

        await newUser.save();

        console.log(newUser);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                unnatiId: newUser.UnnatiId,
                year: newUser.year
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration failed" });
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "enter valid details" })

    }

    try {
        const user = await User.findOne({ email });
        if (!user) { return res.status(404).json({ message: "user not found" }) }
        console.log(user)
        console.log(password)


        const isPassword = await bcrypt.compare(password, user.password)
        console.log(isPassword)

        if (!isPassword) {
            return res.status(401).json({ message: "invalid password" })
        }

        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, "sshh")
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "registration failed" })
    }

}

export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
    });


    res.status(200).json({ message: "logged out successfully" })
}

export const getUserInfo = async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        res.status(200).json({
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user info' });
    }
}