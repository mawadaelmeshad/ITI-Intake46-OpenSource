require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const donationsRouter = require('./routes/donationsRouter');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Posts API' });
});

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/donations', donationsRouter);

app.use(errorHandler);

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
