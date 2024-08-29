const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const languageRoutes = require('./src/routes/languageRoutes');
const gpsRoutes = require('./src/routes/gpsRoutes');
const availabilityRoutes = require('./src/routes/availabilityRoutes');
const walletRoutes = require('./src/routes/walletRoutes');
const { errorMiddleware } = require('./src/middleware/errorMiddleware');
const logger = require('./src/middleware/logger');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/translate', languageRoutes);
app.use('/api/gps', gpsRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/wallet', walletRoutes);

// Global Error Handling
app.use(errorMiddleware);

module.exports = app;
