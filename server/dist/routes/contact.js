import { Router } from 'express';
import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 200 },
    email: { type: String, required: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 5000 },
    sentAt: { type: Date, default: Date.now },
});
const Contact = mongoose.models.Contact || mongoose.model('Contact', schema);
export const contactRouter = Router();
contactRouter.post('/', async (req, res) => {
    const { name, email, message } = req.body ?? {};
    if (!name || !email || !message) {
        res.status(400).json({ error: 'Missing fields' });
        return;
    }
    // Always log (useful even without DB)
    console.log(`📬 Contact from ${name} <${email}>`);
    try {
        if (mongoose.connection.readyState === 1) {
            await Contact.create({ name, email, message });
        }
        res.json({ ok: true });
    }
    catch {
        res.status(500).json({ error: 'Server error' });
    }
});
