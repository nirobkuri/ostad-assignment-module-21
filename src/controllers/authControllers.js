import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// 1. User Registration
export const register = async (req, res) => {
  try {
    const reqBody = req.body;

    reqBody.password = await bcrypt.hash(reqBody.password, 10);
    await User.create(reqBody);

    res.status(201).json({
      status: "success",
      message: "Registration Successful"
    });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};

// 2. User Login
export const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({ status: "fail", message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ status: "fail", message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict"
    });

    res.status(200).json({ status: "success", token });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};

// 4. Single User Profile Read
export const profileRead = async (req, res) => {
  try {
    const data = await User.findById(req.userId).select("-password");
    res.status(200).json({ status: "success", data });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};

// 5. All User Profile Read
export const allProfiles = async (req, res) => {
  try {
    const data = await User.find().select("-password");
    res.status(200).json({ status: "success", data });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};

// 6. Update Profile
export const profileUpdate = async (req, res) => {
  try {
    await User.updateOne({ _id: req.userId }, req.body);
    res.status(200).json({ status: "success", message: "Profile Updated" });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};

// 7. Delete User
export const profileDelete = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.userId });
    res.clearCookie("token");
    res.status(200).json({ status: "success", message: "User Deleted" });
  } catch (e) {
    res.status(400).json({ status: "fail", message: e.message });
  }
};
