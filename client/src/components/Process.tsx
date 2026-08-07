import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    num: '01',
    title: 'Understand the problem',
    body: 'Before touching code or design tools, I study the user flow, the business constraint, and what "done" actually means. The biggest design mistakes happen when this step is rushed.',
  },
  {
    num: '02',
    title: 'Build in the browser',
    body: 'I work directly in React — iterating on logic, layout, and interaction without a handoff gap. What you see is what ships.',
  },
  {
    num: '03',
    title: 'AI as a multiplier',
    body: 'I use Claude Code as a core tool in my workflow — for scaffolding, refactoring, and catching edge cases I\'d otherwise miss. The goal is always speed without sacrificing quality.',
  },
  {
    num: '04',
    title: 'Own the full stack',
    body: 'From schema design to API contract to UI state — I can navigate the entire system. This matters when the right fix is two layers below the symptom.',
  },
  {
    num: '05',
    title: 'Ship and iterate',
    body: 'I deploy early and treat production as a feedback tool. Real users on real devices reveal things that no local environment ever will.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="process"
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
        style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem', transition: 'color 0.4s ease' }}
      >
        04 / How I work
      </motion.p>

      <div className="two-col" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <motion.h2
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Idea → Production, no gap
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text2)', paddingTop: '0.5rem', transition: 'color 0.4s ease' }}
        >
          I believe in owning the full loop, with no handoffs. The mental model I bring to every feature: from first prototype to production metric, I build and ship it myself — often with AI as a pair programmer.
        </motion.p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '3rem 1fr',
              gap: '1.5rem',
              padding: '1.5rem 0',
              borderTop: '1px solid var(--border)',
              alignItems: 'start',
              transition: 'border-color 0.4s ease',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--accent)', paddingTop: '0.2rem', transition: 'color 0.4s ease' }}>
              {s.num}
            </span>
            <div>
              <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.375rem', transition: 'color 0.4s ease' }}>
                {s.title}
              </p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text2)', transition: 'color 0.4s ease' }}>
                {s.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Claude Code callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          marginTop: '3rem',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          border: '1px solid var(--accent)',
          borderRadius: '12px',
          background: 'var(--accent-lo)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '1rem',
          transition: 'background 0.4s ease',
        }}>
          ⚡
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)', marginBottom: '0.375rem', transition: 'color 0.4s ease' }}>
            Claude Code is part of my daily toolkit
          </p>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text2)', transition: 'color 0.4s ease' }}>
            I use it for architecture exploration, refactoring, generating boilerplate, and code review — always with a critical eye on the output. The result is that I can move at a pace that would otherwise require a larger team, without sacrificing code quality or design intent.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
