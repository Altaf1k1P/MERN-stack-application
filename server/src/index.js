// const dotenv = require('dotenv');
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

import { connectDB } from './db/index.js';
import app from './app.js';



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