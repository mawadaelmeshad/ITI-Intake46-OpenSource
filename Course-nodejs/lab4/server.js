require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', limiter); // Apply to all /api/* routes

app.use(express.json({ limit: '10kb' })); // Limit request body size to 10kb

app.use(mongoSanitize());

app.use(xssClean());


app.use(hpp());


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Posts API' });
});

// API Routes
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);


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
