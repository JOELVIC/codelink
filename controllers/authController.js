const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const User = require('../models/User');
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, dob, educationDescription } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User(null, name, email, hashedPassword, phone, dob, educationDescription);

    // Add the new user to Firestore using the add() method, which automatically generates an ID
    const userRef = await db.collection('users').add({...newUser});
    newUser.id = userRef.id;

    // Send the user object in the response after registering
    res.status(201).send(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query Firestore to find the user with the provided email
    const userRef = db.collection('users').where('email', '==', email);
    const snapshot = await userRef.get();

    // Check if there are no users with the provided email
    if (snapshot.empty) {
      return res.status(401).send('Invalid credentials');
    }

    // Get the first user found (assuming email is unique) and check password
    const user = snapshot.docs[0].data();
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, return invalid credentials
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate JWT token for authenticated user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { registerUser, loginUser };
