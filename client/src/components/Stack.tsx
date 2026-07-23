import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const groups = [
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'SQL'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS (ECS, S3)', 'Docker', 'CI/CD Pipelines', 'Git & GitHub'],
  },
  {
    label: 'AI & Workflow',
    items: ['Claude Code', 'AI-assisted dev', 'Figma (basics)', 'Linear'],
  },
]

export default function Stack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="stack"
      ref={ref}
      style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        borderBottom: '1px solid var(--border)',
        transition: 'border-color 0.4s ease',
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
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
        03 / Stack
      </motion.p>

      <motion.h2
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        Tools of the trade
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem',
      }}>
        {groups.map((g, gi) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text2)',
              marginBottom: '1rem',
              transition: 'color 0.4s ease',
            }}>
              {g.label}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {g.items.map((item, ii) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: gi * 0.1 + ii * 0.05 + 0.2 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
                >
                  <span style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: item === 'Claude Code' ? 'var(--accent)' : 'var(--text2)',
                    flexShrink: 0,
                    transition: 'background 0.4s ease',
                  }} />
                  <span style={{
                    fontSize: '0.9375rem',
                    color: item === 'Claude Code' ? 'var(--accent)' : 'var(--text)',
                    fontWeight: item === 'Claude Code' ? 600 : 400,
                    transition: 'color 0.4s ease',
                  }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
