// index.js
const express = require('express');
const app = express();
app.use(express.json());

const studentRoutes = require('./backend/student/routes');
app.use('/students', studentRoutes);

app.listen(3000, () => console.log('Local API running on port 3000'));