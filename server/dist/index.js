import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import { contactRouter } from './routes/contact.js';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5200' }));
app.use(express.json());
app.use('/api/contact', contactRouter);
app.get('/api/health', (_req, res) => res.json({ ok: true }));
const MONGO_URI = process.env.MONGO_URI || '';
if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB error:', err));
}
else {
    console.log('No MONGO_URI set — running without database (messages logged only)');
}
app.listen(PORT, () => console.log(`Server running on :${PORT}`));
