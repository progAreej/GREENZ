// // const User = require("../models/User");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // exports.register = async (req, res) => {
// //   const { name, email, password, specialties, experience } = req.body;

// //   try {
// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       specialties,
// //       experience,
// //     });

// //     await newUser.save();
// //     res.status(201).json({ message: "User registered" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // exports.login = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const user = await User.findOne({ email });

// //     if (!user) return res.status(400).json({ message: "Invalid credentials" });

// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch)
// //       return res.status(400).json({ message: "Invalid credentials" });

// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
// //       expiresIn: "1h",
// //     });

// //     res.json({ token });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// const User = require("../models/User");
// const bcrypt = require("bcryptjs");

// // Google Authentication Controller
// const googleAuth = (req, res) => {
//   res.send("Google authentication successful");
// };

// // User Registration Controller
// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create a new user
//     user = new User({
//       name,
//       email,
//       password: await bcrypt.hash(password, 10),
//     });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// module.exports = {
//   googleAuth,
//   registerUser,
// };



const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Google Authentication Controller
const googleAuth = (req, res) => {
  res.send("Google authentication successful");
};

// User Registration Controller
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json(token);
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  googleAuth,
  registerUser,
  logIn,
};