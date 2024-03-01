const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require('helmet');
const errorHandler = require("./middleware/error-handler");
const {requestLogger,errorLogger} = require("./middleware/logger");
const limiter = require("./middleware/rate-limiter");

const app = express();
const PORT = process.env.PORT || 5000;
const DatabaseURL = process.env.MONGODB_URI



mongoose.connect(DatabaseURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));


    const routes = require("./routes");

    app.use(helmet());
    app.use(express.json());
    app.use(cors());
    app.use(requestLogger);
    app.use(limiter);
    app.use(routes);
    app.use(errorLogger);
    app.use(errors());
    app.use(errorHandler);
    
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
