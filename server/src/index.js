// const dotenv = require('dotenv');

import { connectDB } from './db/index.js';
import app from './app.js';

dotenv.config();

// Connect to MongoDB
connectDB()

// Start the server
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})

// Handle errors

.catch(err => {
    console.error('Error connecting to database:', err.message);
});