const db = require('../config/db');
const Registration = require('../models/Registration');

const registerToProgram = async (req, res) => {
  try {
    const { userId, programId } = req.body;

    const newRegistration = new Registration(null, userId, programId, 'pending');
    const registrationRef = await db.collection('registrations').add({...newRegistration});
    newRegistration.id = registrationRef.id;

    await registrationRef.set(newRegistration); // Optional: Ensure the document is set with the same data

    res.status(201).send(newRegistration);
  } catch (error) {
    console.error('Error registering to program:', error);
    res.status(500).send('Internal Server Error');
  }
};

const verifyRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const registrationRef = db.collection('registrations').doc(id);
    const snapshot = await registrationRef.get();

    if (!snapshot.exists) {
      return res.status(404).send('Registration not found');
    }

    await registrationRef.update({ status });
    res.send({ message: 'Registration status updated' });
  } catch (error) {
    console.error('Error verifying registration:', error);
    res.status(500).send('Internal Server Error');
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const registrationRef = db.collection('registrations').doc(id);
    const snapshot = await registrationRef.get();

    if (!snapshot.exists) {
      return res.status(404).send('Registration not found');
    }

    await registrationRef.update({ status: 'cancelled' });
    res.send({ message: 'Registration cancelled' });
  } catch (error) {
    console.error('Error cancelling registration:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { registerToProgram, verifyRegistration, cancelRegistration };
