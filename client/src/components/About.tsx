import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const tags = [
  'M.Sc. Student · Software Engineering',
  'LUT University',
  'Helsinki, Finland',
  'Claude Code',
  'Independent builder',
  'Reserve Officer',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        borderBottom: '1px solid var(--border)',
        transition: 'border-color 0.4s ease',
      }}
    >
      <div className="two-col">

        {/* Left — label + number */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1rem',
              transition: 'color 0.4s ease',
            }}
          >
            01 / About
          </motion.p>
          <motion.h2
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Builder.
            <br />
            Designer.
            <br />
            Leader.
          </motion.h2>
        </div>

        {/* Right — text + tags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '0.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text)', transition: 'color 0.4s ease' }}>
              I'm a full-stack developer and design engineer finishing my Master's at LUT University. I take products from concept to production — owning the architecture, the UX decisions, and everything in between.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text2)', transition: 'color 0.4s ease' }}>
              My edge is the combination: a military-trained operator's discipline applied to engineering problems, built-in empathy for users from sales, and the technical depth to ship ambitious things alone. I've been using Claude Code as a core part of my workflow — not as a crutch, but as a multiplier.
            </p>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.375rem 0.875rem',
                  border: '1px solid var(--border)',
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--text2)',
                  letterSpacing: '0.02em',
                  transition: 'border-color 0.4s ease, color 0.4s ease',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
