const express = require('express');
const app = require('./app');
const { connectDB } = require('./config/dbConfig');
const logger = require('./middleware/logger');

// Connect to the database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
