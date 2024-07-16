const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = require('../models/User');

// Update user profile
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;

    // Hash password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user in Firestore
    const userRef = db.collection('users').doc(id);
    const userData = await userRef.get();

    if (!userData.exists) {
      return res.status(404).send('User not found');
    }

    const user = userData.data();
    user.name = name || user.name;
    user.password = hashedPassword || user.password;

    await userRef.update(user);

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { updateUser };
