import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const topSkills = [
  {
    name: 'React + TypeScript',
    desc: 'Component architecture, hooks, scalable UI from scratch',
  },
  {
    name: 'Claude Code',
    desc: 'AI-assisted development as a daily multiplier — not a crutch',
  },
  {
    name: 'Full-Stack Ownership',
    desc: 'End-to-end ownership: schema, API, UI, deploy',
  },
  {
    name: 'Node.js + REST APIs',
    desc: 'Backend integration and API design in TypeScript',
  },
]

const groups = [
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'SQL', 'JWT Auth'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS (ECS, S3)', 'Docker', 'CI/CD Pipelines', 'Git & GitHub', 'Vercel'],
  },
  {
    label: 'AI & Workflow',
    items: ['Claude Code', 'AI-assisted dev', 'MCP (Model Context Protocol)', 'Figma', 'Linear'],
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
        style={{
          fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--accent)',
          marginBottom: '1rem', transition: 'color 0.4s ease',
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

      {/* Top skills */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--text2)',
          marginBottom: '1rem', transition: 'color 0.4s ease',
        }}
      >
        Core expertise
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.75rem',
        marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
      }}>
        {topSkills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: '1.125rem 1.25rem',
              border: '1px solid var(--accent)',
              borderRadius: '12px',
              background: 'var(--accent-lo)',
              transition: 'all 0.4s ease',
            }}
          >
            <p style={{
              fontSize: '0.875rem', fontWeight: 700,
              color: 'var(--accent)', marginBottom: '0.375rem',
              transition: 'color 0.4s ease',
            }}>
              {s.name}
            </p>
            <p style={{
              fontSize: '0.8rem', lineHeight: 1.5,
              color: 'var(--text2)', transition: 'color 0.4s ease',
            }}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div style={{
        height: '1px', background: 'var(--border)',
        marginBottom: 'clamp(2rem, 4vw, 3rem)',
        transition: 'background 0.4s ease',
      }} />

      {/* Full stack list */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--text2)',
          marginBottom: '1.5rem', transition: 'color 0.4s ease',
        }}
      >
        Full stack
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '2rem',
      }}>
        {groups.map((g, gi) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 + gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--text2)',
              marginBottom: '0.875rem', transition: 'color 0.4s ease',
            }}>
              {g.label}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {g.items.map((item, ii) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.4 + gi * 0.08 + ii * 0.04 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
                >
                  <span style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: item === 'Claude Code' ? 'var(--accent)' : 'var(--text2)',
                    flexShrink: 0, transition: 'background 0.4s ease',
                  }} />
                  <span style={{
                    fontSize: '0.9rem',
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
