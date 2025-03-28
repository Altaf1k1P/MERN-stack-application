import mongoose from 'mongoose';

// Define User schema and model
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin'], default: 'admin' }
});

export const User = mongoose.model("User", userSchema);