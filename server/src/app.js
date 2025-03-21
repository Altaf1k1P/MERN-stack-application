import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// Enable JSON parsing middleware for all routes

app.use(express.json({ limit: '16kb' }));

export default app;