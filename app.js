const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DatabaseURL = process.env.MONGODB_URI



mongoose.connect(DatabaseURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));


app.get('/', (req, res) => {
  res.send('Expense Tracker API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
