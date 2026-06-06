require('dotenv').config();
const express = require('express');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Posts API' });
});

app.use('/posts', postsRouter);

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
