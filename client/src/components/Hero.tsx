import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import type { Variants } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const WORDS = ['ROBIN', 'KARLSSON']

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const word: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 1, ease: EASE } },
}

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE } },
})

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(1.5rem, 4vw, 4rem)',
        paddingTop: '80px',
        paddingBottom: 'clamp(3rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent blob top-right */}
      <div style={{
        position: 'absolute',
        top: '-5%',
        right: '-15%',
        width: 'clamp(400px, 50vw, 700px)',
        height: 'clamp(400px, 50vw, 700px)',
        borderRadius: '50%',
        background: 'var(--accent)',
        filter: 'blur(140px)',
        opacity: 0.05,
        pointerEvents: 'none',
        transition: 'background 0.5s ease',
      }} />

      {/* Label pinned top-left */}
      <motion.p
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="show"
        style={{
          position: 'absolute',
          top: 'calc(64px + 1.5rem)',
          left: 'clamp(1.5rem, 4vw, 4rem)',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text2)',
          transition: 'color 0.4s ease',
        }}
      >
        Design Engineer · Helsinki, Finland
      </motion.p>

      {/* Year pinned top-right */}
      <motion.p
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="show"
        style={{
          position: 'absolute',
          top: 'calc(64px + 1.5rem)',
          right: 'clamp(1.5rem, 4vw, 4rem)',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text2)',
          transition: 'color 0.4s ease',
        }}
      >
        Available 2026
      </motion.p>

      {/* Name — stacked at bottom */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
      >
        {WORDS.map((w) => (
          <div key={w} style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <motion.h1
              variants={word}
              className="hero-name"
              style={{ color: 'var(--text)', transition: 'color 0.4s ease, font-size 0.4s ease, font-family 0.4s ease, font-weight 0.4s ease, letter-spacing 0.4s ease, text-transform 0.4s ease' }}
            >
              {w}
            </motion.h1>
          </div>
        ))}
      </motion.div>

      {/* Bottom row: tagline left, buttons right */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
        <motion.p
          variants={fadeUp(0.7)}
          initial="hidden"
          animate="show"
          style={{
            maxWidth: '380px',
            fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
            lineHeight: 1.65,
            color: 'var(--text2)',
            transition: 'color 0.4s ease',
          }}
        >
          I bridge design and engineering — building interfaces that feel as good as they work. M.Sc. Student in Software Engineering at LUT University.
        </motion.p>

        <motion.div
          variants={fadeUp(0.9)}
          initial="hidden"
          animate="show"
          style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.375rem',
              background: 'var(--text)',
              color: 'var(--bg)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.4s ease, color 0.4s ease, opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            See my work <ArrowDown size={13} />
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'inline-flex',
              padding: '0.75rem 1.375rem',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              borderRadius: '100px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'border-color 0.3s ease, color 0.4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--text2)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            Get in touch
          </button>
          <a
            href="/CV_Robin_Karlsson.pdf"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.375rem',
              border: '1px solid var(--border)',
              color: 'var(--text2)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              borderRadius: '100px',
              textDecoration: 'none',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--text2)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text2)'
            }}
          >
            <Download size={13} /> CV
          </a>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 'clamp(1.5rem, 4vw, 4rem)',
          right: 'clamp(1.5rem, 4vw, 4rem)',
          height: '1px',
          background: 'var(--border)',
          transformOrigin: 'left',
          transition: 'background 0.4s ease',
        }}
      />
    </section>
  )
}
