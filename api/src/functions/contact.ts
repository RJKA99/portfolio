import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGODB_URI ?? ''
const RATE_LIMIT_MS = 60_000 // 1 per IP per minute

const schema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 200 },
  email: { type: String, required: true, maxlength: 200 },
  message: { type: String, required: true, maxlength: 5000 },
  sentAt: { type: Date, default: Date.now },
})

const Contact = mongoose.models['Contact'] ?? mongoose.model('Contact', schema)

let connected = false
const ipLog = new Map<string, number>()

async function connect() {
  if (connected || !MONGO_URI) return
  await mongoose.connect(MONGO_URI)
  connected = true
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const last = ipLog.get(ip)
  if (last && now - last < RATE_LIMIT_MS) return false
  ipLog.set(ip, now)
  if (ipLog.size > 1000) {
    for (const [key, ts] of ipLog) {
      if (now - ts > RATE_LIMIT_MS) ipLog.delete(key)
    }
  }
  return true
}

async function contact(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return { status: 429, jsonBody: { error: 'Too many requests. Wait a minute before trying again.' } }
  }

  const body = (await req.json().catch(() => null)) as { name?: string; email?: string; message?: string } | null
  const { name, email, message } = body ?? {}

  if (!name || !email || !message) {
    return { status: 400, jsonBody: { error: 'Missing fields' } }
  }

  if (String(name).length > 200 || String(email).length > 200 || String(message).length > 5000) {
    return { status: 400, jsonBody: { error: 'Input too long' } }
  }

  try {
    await connect()
    if (MONGO_URI) {
      await Contact.create({ name, email, message })
    }
    context.log(`Contact message from ${name} <${email}> [${ip}]`)
    return { jsonBody: { ok: true } }
  } catch (err) {
    context.error(err)
    return { status: 500, jsonBody: { error: 'Server error' } }
  }
}

app.http('contact', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'contact',
  handler: contact,
})
