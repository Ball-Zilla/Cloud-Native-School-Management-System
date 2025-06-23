// backend/student/routes.js
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const DB_FILE = './mock-db/students.json';

function readStudents() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeStudents(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// CREATE Student
router.post('/', (req, res) => {
  const students = readStudents();
  const newStudent = { id: uuidv4(), ...req.body };
  students.push(newStudent);
  writeStudents(students);
  res.status(201).json({ message: "Student created", student: newStudent });
});

// READ all Students
router.get('/', (req, res) => {
  const students = readStudents();
  res.json(students);
});

// READ one Student
router.get('/:id', (req, res) => {
  const students = readStudents();
  const student = students.find(s => s.id === req.params.id);
  res.json(student || {});
});

// UPDATE Student
router.put('/:id', (req, res) => {
  const students = readStudents();
  const index = students.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    writeStudents(students);
    res.json({ message: "Student updated", student: students[index] });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// DELETE Student
router.delete('/:id', (req, res) => {
  const students = readStudents().filter(s => s.id !== req.params.id);
  writeStudents(students);
  res.json({ message: "Student deleted" });
});

module.exports = router;