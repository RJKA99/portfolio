import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const base = import.meta.env.VITE_API_URL ?? ''
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text)',
    fontSize: '0.9375rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.4s ease',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--text2)',
    marginBottom: '0.5rem',
    transition: 'color 0.4s ease',
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        transition: 'border-color 0.4s ease',
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', transition: 'color 0.4s ease' }}
        >
          05 / Contact
        </motion.p>

        <motion.h2
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '1rem' }}
        >
          Let's talk
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text2)', marginBottom: '2.5rem', transition: 'color 0.4s ease' }}
        >
          Open to Design Engineer and frontend-heavy full-stack roles. If you're building something interesting, I want to hear about it.
        </motion.p>

        {status === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '2rem',
              border: '1px solid var(--accent)',
              borderRadius: '12px',
              background: 'var(--accent-lo)',
              textAlign: 'center',
              transition: 'all 0.4s ease',
            }}
          >
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem', transition: 'color 0.4s ease' }}>Message sent ✓</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text2)', transition: 'color 0.4s ease' }}>I'll get back to you shortly.</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  style={inputStyle}
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  style={inputStyle}
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }}
                required
                placeholder="What's on your mind?"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            {status === 'error' && (
              <p style={{ fontSize: '0.875rem', color: '#ef4444' }}>Something went wrong. Email me directly at rjka99@gmail.com</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                padding: '0.875rem 2rem',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '100px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                alignSelf: 'flex-start',
                opacity: status === 'sending' ? 0.7 : 1,
                transition: 'background 0.4s ease, opacity 0.2s ease',
                fontFamily: 'inherit',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = status === 'sending' ? '0.7' : '1' }}
            >
              {status === 'sending' ? 'Sending…' : 'Send message →'}
            </button>
          </motion.form>
        )}

        {/* Direct links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
        >
          <a
            href="mailto:rjka99@gmail.com"
            style={{ fontSize: '0.875rem', color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
          >
            rjka99@gmail.com ↗
          </a>
          <a
            href="https://www.linkedin.com/in/rj-karlsson/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.875rem', color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
