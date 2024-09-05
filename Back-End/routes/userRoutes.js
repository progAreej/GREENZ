// // // const express = require("express");
// // // const router = express.Router();
// // // const bcrypt = require("bcryptjs");
// // // const User = require("../models/User");

// // // // @route   POST /api/users/register
// // // // @desc    Register a new user
// // // // @access  Public
// // // "/register",
// // //   async (req, res) => {
// // //     const { name, email, password } = req.body;

// // //     try {
// // //       // Check if user already exists
// // //       let user = await User.findOne({ email });
// // //       if (user) {
// // //         return res.status(400).json({ message: "User already exists" });
// // //       }

// // //       // Create a new user
// // //       user = new User({
// // //         name,
// // //         email,
// // //         password: await bcrypt.hash(password, 10),
// // //       });

// // //       await user.save();
// // //       res.status(201).json({ message: "User registered successfully" });
// // //     } catch (err) {
// // //       console.error(err.message);
// // //       res.status(500).send("Server error");
// // //     }
// // //   };
// // // module.exports = router;

// // const express = require("express");
// // const passport = require("passport");
// // const {
// //   googleAuth,
// //   registerUser,
// // } = require("../controllers/userAuthController");

// // const router = express.Router();

// // // Google OAuth Routes
// // router.get(
// //   "/auth/google",
// //   passport.authenticate("google", { scope: ["profile", "email"] })
// // );
// // router.get(
// //   "users/auth/google/callback",
// //   passport.authenticate("google", {
// //     successRedirect: "http://localhost:5137/",
// //     failureRedirect: "http://localhost:5137/sign-up",
// //   }),
// //   googleAuth
// // );

// // // User Registration Route
// // router.post("/register", registerUser);

// // module.exports = router;


// const express = require("express");
// const passport = require("passport");
// const {
//   googleAuth,
//   registerUser,
//   logIn,
// } = require("../controllers/userAuthController");

// const router = express.Router();

// // Google OAuth Routes
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//   "users/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:5137/",
//     failureRedirect: "http://localhost:5137/sign-up",
//   }),
//   googleAuth
// );

// // User Registration Route
// router.post("/register", registerUser);
// //http://localhost:5000/api/users/register
// router.post("/login", logIn);

// module.exports = router;


const express = require("express");
const passport = require("passport");
const {
  googleAuth,
  registerUser,
  logIn,
} = require("../controllers/userAuthController");

const router = express.Router();

// Google OAuth Routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/sign-up",
  }),
  googleAuth
);

// User Registration Route
router.post("/register", registerUser);
router.post("/login", logIn);

module.exports = router;