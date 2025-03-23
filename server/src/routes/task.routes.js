import express from 'express';
import upload from '../middleware/multer.middleware.js';
import csvParser from 'csv-parser';
import fs from 'fs';
import {Task} from '../modles/Task.model.js';
import {Agent} from '../modles/Agent.model.js';

const router = express.Router();

router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const agents = await Agent.find();
        
        if (agents.length === 0) {
            return res.status(400).json({ message: 'No agents available' });
        }

        const tasks = [];

        // Parse CSV file
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', (row) => {
                tasks.push(row);
            })
            .on('end', async () => {
                if (tasks.length === 0) {
                    return res.status(400).json({ message: 'No valid data in CSV' });
                }

                const chunkSize = Math.ceil(tasks.length / agents.length);
                const taskChunks = [];

                // ✅ Distribute tasks evenly across agents
                for (let i = 0; i < agents.length; i++) {
                    taskChunks.push(tasks.splice(0, chunkSize));
                }

                // ✅ Use `for...of` for proper async operations
                for (let i = 0; i < taskChunks.length; i++) {
                    const agent = agents[i];

                    for (const task of taskChunks[i]) {
                        await Task.create({
                            agentId: agent._id,          // ✅ Correctly assign agent
                            name: task.name,             // ✅ Map CSV field properly
                            phone: task.phone,           // ✅ Match CSV field with schema
                            note: task.note || "N/A"    // ✅ Use `note` (not `task`)
                        });
                    }
                }

                res.json({ message: 'CSV uploaded and distributed successfully' });
            });

    } catch (error) {
        console.error('Error uploading CSV:', error);
        res.status(500).json({ message: 'Failed to upload and distribute CSV', error });
    }
});

// Route to get all tasks
router.get('/task', async (req, res) => {
    try {
        const tasks = await Task.find()  // Include agent details if needed
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
});

export default router;