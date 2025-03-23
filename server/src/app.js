import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });


// Enable JSON parsing middleware for all routes

app.use(express.json({ limit: '16kb' }));

//route
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import agentRoutes from './routes/agent.routes.js';


app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', agentRoutes);

export default app;