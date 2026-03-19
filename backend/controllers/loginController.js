import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userSchema from "../models/User.js";
import connectLoginDB from "../config/loginDB.js";

export const loginUser = async (req, res) => {
  try {
    const conn = await connectLoginDB();
    const User = conn.model("User", userSchema);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};