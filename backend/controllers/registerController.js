import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔹 Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 🔹 Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Role handling (IMPORTANT)
    // Only allow "admin" if explicitly passed (for testing/admin creation)
    const userRole =
      role === "admin" ? "admin" : "user";

    // 🔹 Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    await user.save();

    res.status(201).json({
      message: "Registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};