import type { VercelRequest, VercelResponse } from '@vercel/node'
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGODB_URI ?? ''

const schema = new mongoose.Schema({
  name:    { type: String, required: true, maxlength: 200 },
  email:   { type: String, required: true, maxlength: 200 },
  message: { type: String, required: true, maxlength: 5000 },
  sentAt:  { type: Date, default: Date.now },
})

const Contact = mongoose.models['Contact'] ?? mongoose.model('Contact', schema)

let cached = false

async function connect() {
  if (cached || !MONGO_URI) return
  await mongoose.connect(MONGO_URI)
  cached = true
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    await connect()
    if (MONGO_URI) {
      await Contact.create({ name, email, message })
    }
    console.log(`📬 ${name} <${email}>`)
    return res.json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
