import User from "../models/user.js";
import jwt from "jsonwebtoken";

// 1. User Registration
export const register = async (req, res) => {
    try {
        let reqBody = req.body;
        await User.create(reqBody);
        res.status(201).json({ status: "success", message: "Registration Complete" });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};

// 2. User Login (+ Token & Cookie)
export const login = async (req, res) => {
    try {
        let reqBody = req.body;
        let user = await User.findOne(reqBody);
        if (user) {
            let Payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), id: user['_id'] };
            let token = jwt.sign(Payload, process.env.JWT_SECRET);
            
            // Cookie options
            let cookieOptions = { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true };
            res.cookie('token', token, cookieOptions);
            
            res.status(200).json({ status: "success", token: token, data: user });
        } else {
            res.status(401).json({ status: "fail", message: "User Not Found" });
        }
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};

// 4. User Single Profile Read
export const profileRead = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        let data = await User.findOne({ _id: user_id });
        res.status(200).json({ status: "success", data: data });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};

// 5. All User Profile Read
export const allProfiles = async (req, res) => {
    try {
        let data = await User.find();
        res.status(200).json({ status: "success", data: data });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};

// 6. Profile Update
export const profileUpdate = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        let reqBody = req.body;
        await User.updateOne({ _id: user_id }, reqBody);
        res.status(200).json({ status: "success", message: "Update Successful" });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};

// 7. Delete User
export const profileDelete = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        await User.deleteOne({ _id: user_id });
        res.clearCookie('token');
        res.status(200).json({ status: "success", message: "Delete Successful" });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};