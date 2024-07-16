// controllers/programController.js
const db = require('../config/db');
const Program = require('../models/Program');

// Create a new program
const addProgram = async (req, res) => {
  try {
    const { name, description, type, image, duration, courses } = req.body;

    // Create a new Program instance
    const newProgram = new Program(null, name, description, type, image, duration, courses);

    // Add the new program to Firestore using the add() method, which automatically generates an ID
    const programRef = await db.collection('programs').add({...newProgram});
    newProgram.id = programRef.id;

    // Send the new program object in the response after adding
    res.status(201).send(newProgram);
  } catch (error) {
    console.error('Error adding program:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Retrieve all programs
// Retrieve all programs
const getPrograms = async (req, res) => {
  try {
    const programsRef = db.collection('programs');
    const snapshot = await programsRef.get();

    // Map through the snapshot docs and extract data for each program
    const programs = snapshot.docs.map(doc => {
      const programData = doc.data();
      const id = doc.id; // Retrieve the document ID

      // Create a new Program instance and set its ID
      const program = new Program(
        id,
        programData.name,
        programData.description,
        programData.type,
        programData.image,
        programData.duration,
        programData.courses
      );

      return program;
    });

    res.send(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Update an existing program
const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, image, duration, courses } = req.body;

    // Create an updated Program instance
    const updatedProgram = new Program(id, name, description, type, image, duration, courses);

    // Update the program in Firestore
    await db.collection('programs').doc(id).set({...updatedProgram});

    res.send(updatedProgram);
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a program
const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the program from Firestore using the document ID
    await db.collection('programs').doc(id).delete();

    res.send({ message: 'Program deleted' });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { addProgram, getPrograms, updateProgram, deleteProgram };
