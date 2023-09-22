const router = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs')
// SignUP
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(200).json({ message: "Email Already Exist" });
    }
    else {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the salt rounds
      // Create a new user
      const newUser = new User({ email, username, password: hashedPassword });
      await newUser.save();

      res.status(200).json({ message: "Sign Up successfully" }); // Use 201 for successful creation
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});


//Login IN



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(200).json({ message: "Sign Up first" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(200).json({ message: "Password Incorrect" });
    }

    // If email and password are correct, return email and username

    res.status(200).json({ message: "Login successfully", id: user._id });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});


module.exports = router;