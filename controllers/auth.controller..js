import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    if (!name) {
      res.status(400).json({ success: false, message: "Name is required" });
      throw new Error("Name is required");
    }

    if (!email) {
      res.status(400).json({ success: false, message: "Email is required" });
      throw new Error("Email is required");
    }

    if (!password) {
      res.status(400).json({ success: false, message: "Password is required" });
      throw new Error("Password is required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ success: false, message: "User already exists" });
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session },
    );

    const token = jwt.sign(
      {
        userId: newUser[0]._id,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: "Email is required" });
      throw new Error("Email is required");
    }

    if (!password) {
      res.status(400).json({ success: false, message: "Password is required" });
      throw new Error("Password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { signUp, signIn, signOut };
