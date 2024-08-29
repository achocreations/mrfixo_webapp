const mongoose = require('mongoose');
const logger = require('../middleware/logger');

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        logger.info('MongoDB Connected');
    } catch (error) {
        logger.error('MongoDB connection failed', error);
        process.exit(1);
    }
};
