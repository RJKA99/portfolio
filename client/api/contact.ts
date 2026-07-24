import type { VercelRequest, VercelResponse } from '@vercel/node'
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGODB_URI ?? ''
const RATE_LIMIT_MS = 60_000 // 1 per IP per minute

const schema = new mongoose.Schema({
  name:    { type: String, required: true, maxlength: 200 },
  email:   { type: String, required: true, maxlength: 200 },
  message: { type: String, required: true, maxlength: 5000 },
  sentAt:  { type: Date, default: Date.now },
})

const Contact = mongoose.models['Contact'] ?? mongoose.model('Contact', schema)

let cached = false
const ipLog = new Map<string, number>()

async function connect() {
  if (cached || !MONGO_URI) return
  await mongoose.connect(MONGO_URI)
  cached = true
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const last = ipLog.get(ip)
  if (last && now - last < RATE_LIMIT_MS) return false
  ipLog.set(ip, now)
  // Prune stale entries
  if (ipLog.size > 1000) {
    for (const [key, ts] of ipLog) {
      if (now - ts > RATE_LIMIT_MS) ipLog.delete(key)
    }
  }
  return true
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ??
    req.socket.remoteAddress ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests — wait a minute before trying again.' })
  }

  const { name, email, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  if (String(name).length > 200 || String(email).length > 200 || String(message).length > 5000) {
    return res.status(400).json({ error: 'Input too long' })
  }

  try {
    await connect()
    if (MONGO_URI) {
      await Contact.create({ name, email, message })
    }
    console.log(`📬 ${name} <${email}> [${ip}]`)
    return res.json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
