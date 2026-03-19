import bcrypt from "bcryptjs";
import userSchema from "../models/User.js";
import connectRegisterDB from "../config/registerDB.js";

export const registerUser = async (req, res) => {
  try {
    const conn = await connectRegisterDB();
    const User = conn.model("User", userSchema);

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "Registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};