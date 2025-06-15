const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "Filed Not Should Empty",
      });
    }

    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return res.status(401).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const UserSaved = await User.create({
      name,
      email,
      password: hashpassword,
    });

    return res.status(200).json({
      success: true,
      UserSaved,
      message: "User Signup Success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for empty fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fields should not be empty",
      });
    }

    // Check if user exists
    const checkuser = await User.findOne({ email });
    if (!checkuser) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, checkuser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is invalid",
      });
    }

    // Prepare token payload without password
    const payload = {
      id: checkuser._id,
      email: checkuser.email,
      name: checkuser.name,
    };

    // Sign token
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

    // Send response
    return res.status(200).json({
      success: true,
      token,
      message: "Login success",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
