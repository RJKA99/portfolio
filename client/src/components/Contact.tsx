import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Mail } from 'lucide-react'

function GitHubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const socials = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/rj-karlsson',
    url: 'https://www.linkedin.com/in/rj-karlsson/',
    icon: <LinkedInIcon size={28} />,
    desc: 'Connect on LinkedIn',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'RJKA99',
    url: 'https://github.com/RJKA99',
    icon: <GitHubIcon size={28} />,
    desc: 'See my code',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'rjka99@gmail.com',
    url: 'mailto:rjka99@gmail.com',
    icon: <Mail size={28} />,
    desc: 'Send a mail',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

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
      setCooldown(60)
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
    transition: 'all 0.3s ease',
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
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--accent)',
          marginBottom: '1rem', transition: 'color 0.4s ease',
        }}
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
        style={{
          fontSize: '1rem', lineHeight: 1.6,
          color: 'var(--text2)', marginBottom: '3rem',
          maxWidth: '480px', transition: 'color 0.4s ease',
        }}
      >
        Open to Design Engineer and frontend-heavy full-stack roles. If you're building something interesting, I want to hear about it.
      </motion.p>

      {/* Social links — big and prominent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '3.5rem',
          maxWidth: '700px',
        }}
      >
        {socials.map((s, i) => (
          <motion.a
            key={s.id}
            href={s.url}
            target={s.id !== 'email' ? '_blank' : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
            onMouseEnter={() => setHoveredSocial(s.id)}
            onMouseLeave={() => setHoveredSocial(null)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.75rem 1rem',
              border: hoveredSocial === s.id ? '1px solid var(--accent)' : '1px solid var(--border)',
              borderRadius: '16px',
              background: hoveredSocial === s.id ? 'var(--accent-lo)' : 'var(--bg2)',
              textDecoration: 'none',
              color: hoveredSocial === s.id ? 'var(--accent)' : 'var(--text)',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '52px', height: '52px',
              borderRadius: '14px',
              background: hoveredSocial === s.id ? 'var(--accent-lo)' : 'var(--bg3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.25s ease',
              color: hoveredSocial === s.id ? 'var(--accent)' : 'var(--text2)',
            }}>
              {s.icon}
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontWeight: 700, fontSize: '0.9375rem',
                color: hoveredSocial === s.id ? 'var(--accent)' : 'var(--text)',
                marginBottom: '0.2rem', transition: 'color 0.25s ease',
              }}>
                {s.label}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--text2)',
                transition: 'color 0.25s ease',
                fontFamily: 'monospace',
              }}>
                {s.handle}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          height: '1px', background: 'var(--border)',
          marginBottom: '3rem', maxWidth: '700px',
          transition: 'background 0.4s ease',
        }}
      />

      {/* Contact form */}
      {status === 'sent' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '2rem', maxWidth: '600px',
            border: '1px solid var(--accent)', borderRadius: '12px',
            background: 'var(--accent-lo)', textAlign: 'center',
            transition: 'all 0.4s ease',
          }}
        >
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem', transition: 'color 0.4s ease' }}>Message sent ✓</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text2)', marginBottom: '1.25rem', transition: 'color 0.4s ease' }}>I'll get back to you shortly.</p>
          <button
            onClick={() => { if (cooldown === 0) setStatus('idle') }}
            disabled={cooldown > 0}
            style={{
              padding: '0.6rem 1.25rem',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              background: 'transparent',
              color: cooldown > 0 ? 'var(--text2)' : 'var(--text2)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: cooldown > 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              opacity: cooldown > 0 ? 0.5 : 1,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { if (cooldown === 0) { e.currentTarget.style.borderColor = 'var(--text2)'; e.currentTarget.style.color = 'var(--text)' } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
          >
            {cooldown > 0 ? `Send another (${cooldown}s)` : 'Send another message'}
          </button>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {(['name', 'email'] as const).map((field) => (
              <div key={field}>
                <label style={{
                  display: 'block', fontSize: '0.75rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--text2)', marginBottom: '0.5rem', transition: 'color 0.4s ease',
                }}>
                  {field === 'name' ? 'Name' : 'Email'}
                </label>
                <input
                  style={inputStyle}
                  type={field === 'email' ? 'email' : 'text'}
                  required
                  placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                  value={form[field]}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
            ))}
          </div>

          <div>
            <label style={{
              display: 'block', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--text2)', marginBottom: '0.5rem', transition: 'color 0.4s ease',
            }}>
              Message
            </label>
            <textarea
              style={{ ...inputStyle, minHeight: '130px', resize: 'vertical' }}
              required
              placeholder="What's on your mind?"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          {status === 'error' && (
            <p style={{ fontSize: '0.875rem', color: '#ef4444' }}>
              Something went wrong — email me directly at rjka99@gmail.com
            </p>
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
            onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.opacity = '0.82' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = status === 'sending' ? '0.7' : '1' }}
          >
            {status === 'sending' ? 'Sending…' : 'Send message →'}
          </button>
        </motion.form>
      )}
    </section>
  )
}
