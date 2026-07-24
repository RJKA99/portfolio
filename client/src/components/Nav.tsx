import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme, type Theme } from '../context/ThemeContext'

const THEMES: { id: Theme; label: string; bg: string; accent: string }[] = [
  { id: 'dark',  label: 'Dark',      bg: '#111111', accent: '#3b82f6' },
  { id: 'light', label: 'Editorial', bg: '#f5f1eb', accent: '#1d4ed8' },
  { id: 'bold',  label: 'Neon',      bg: '#0f0020', accent: '#a855f7' },
]

const links = ['Work', 'About', 'Stack', 'Contact']

const HINT_KEY = 'rk-theme-hint-seen'

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Show hint once after 1.8s, auto-dismiss after 4s
  useEffect(() => {
    if (localStorage.getItem(HINT_KEY)) return
    const show = setTimeout(() => setShowHint(true), 1800)
    const hide = setTimeout(() => {
      setShowHint(false)
      localStorage.setItem(HINT_KEY, '1')
    }, 5800)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  const dismissHint = () => {
    setShowHint(false)
    localStorage.setItem(HINT_KEY, '1')
  }

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          fontFamily: 'var(--head-font)',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          transition: 'color 0.3s ease',
        }}
      >
        RK
      </button>

      {/* Desktop nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {links.map((l) => (
          <button
            key={l}
            onClick={() => scrollTo(l)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '0.8125rem', fontWeight: 500,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--text2)', transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
          >
            {l}
          </button>
        ))}

        {/* Theme switcher + hint */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text2)',
            marginRight: '2px',
          }}>Theme</span>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); dismissHint() }}
              title={t.label}
              style={{
                width: '14px', height: '14px',
                borderRadius: '50%',
                background: t.bg,
                border: theme === t.id ? `2px solid ${t.accent}` : '2px solid var(--border)',
                cursor: 'pointer',
                transition: 'border-color 0.25s ease, transform 0.2s ease',
                transform: theme === t.id ? 'scale(1.2)' : 'scale(1)',
                boxShadow: theme === t.id ? `0 0 6px ${t.accent}88` : 'none',
              }}
            />
          ))}

        </div>
      </nav>
    </motion.header>

      {/* Theme hint toast — bottom right */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              zIndex: 100,
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '1rem 1.25rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              transition: 'background 0.4s ease, border-color 0.4s ease',
              maxWidth: '260px',
            }}
          >
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              {THEMES.map((t) => (
                <div key={t.id} style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: t.bg, border: `2px solid ${t.accent}`,
                }} />
              ))}
            </div>
            <p style={{
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--text2)',
              lineHeight: 1.4,
              margin: 0,
              transition: 'color 0.4s ease',
            }}>
              Try switching themes in the top right
            </p>
            <button
              onClick={dismissHint}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text2)', fontSize: '1rem', lineHeight: 1,
                padding: '0 0 0 0.25rem', flexShrink: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
              aria-label="Dismiss"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
