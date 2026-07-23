import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTheme, type Theme } from '../context/ThemeContext'

const THEMES: { id: Theme; label: string; bg: string; accent: string }[] = [
  { id: 'dark',  label: 'Dark',       bg: '#111111', accent: '#3b82f6' },
  { id: 'light', label: 'Editorial',  bg: '#f5f1eb', accent: '#1d4ed8' },
  { id: 'bold',  label: 'Neon',       bg: '#0f0020', accent: '#a855f7' },
]

const links = ['Work', 'About', 'Stack', 'Contact']

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
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
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text2)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
          >
            {l}
          </button>
        ))}

        {/* Theme switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '0.5rem' }}>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              title={t.label}
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: t.bg,
                border: theme === t.id
                  ? `2px solid ${t.accent}`
                  : '2px solid var(--border)',
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
  )
}
