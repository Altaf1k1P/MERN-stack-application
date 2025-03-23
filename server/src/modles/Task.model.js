import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    note: String,
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Assigns task to agent
});


export const Task = mongoose.model('Task', taskSchema);
