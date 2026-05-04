require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit')
const idempotency = require("express-idempotency");
const mongoSanitize = require('express-mongo-sanitize');

const app = express();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});


app.use(limiter);
// app.use(mongoSanitize())
// app.use(
//   mongoSanitize({
//     replaceWith: '_',
//   }),
// );
// app.use(
//   mongoSanitize({
//     allowDots: true,
//   }),
// );
// app.use(
//   mongoSanitize({
//     allowDots: true,
//     replaceWith: '_',
//   }),
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Secure Mini Payment API is running');
});

// Routes will be mounted here
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/transactions', require('./routes/historyRoutes'));

module.exports = app;
