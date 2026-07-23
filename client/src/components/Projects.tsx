import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'Industrial Service Portal',
    subtitle: 'Full-stack · Sole developer · Production',
    year: '2025',
    description:
      "A comprehensive, cloud-native industrial operations and maintenance management system built entirely from scratch. I owned every layer: TypeScript/Node.js backend with REST APIs, a React + Tailwind UI optimized for remote management workflows, Docker containerization, and AWS deployment via Git-driven CI/CD.",
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'CI/CD'],
    highlight: 'Sole developer — end-to-end ownership from architecture to production deployment',
  },
  {
    number: '02',
    title: 'This Portfolio',
    subtitle: 'Design · React · MERN stack',
    year: '2026',
    description:
      "Built in a single session using MERN stack with React + Vite, Framer Motion, and three switchable design themes — each with distinct typography, palette, and visual character. The site itself is the design portfolio piece.",
    tags: ['React', 'Framer Motion', 'Node.js', 'Express', 'MongoDB', 'Vite'],
    highlight: 'Three switchable design themes — demonstrating design range in one artifact',
  },
]

function ProjectCard({ project: p, index, inView }: {
  project: typeof projects[0]
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg2)' : 'var(--bg)',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        transition: 'background 0.3s ease',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '2rem',
        alignItems: 'start',
      }}>
        {/* Left */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text2)', fontFamily: 'monospace', transition: 'color 0.4s ease' }}>{p.number}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text2)', transition: 'color 0.4s ease' }}>{p.year}</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--head-font)',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 600,
            color: 'var(--text)',
            marginBottom: '0.25rem',
            transition: 'color 0.4s ease',
          }}>
            {p.title}
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--accent)', marginBottom: '1.25rem', fontWeight: 500, transition: 'color 0.4s ease' }}>
            {p.subtitle}
          </p>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text2)', maxWidth: '560px', transition: 'color 0.4s ease' }}>
            {p.description}
          </p>
          <div style={{
            marginTop: '1.25rem',
            padding: '0.625rem 1rem',
            background: 'var(--accent-lo)',
            borderLeft: '2px solid var(--accent)',
            borderRadius: '0 4px 4px 0',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--text)',
            transition: 'all 0.4s ease',
          }}>
            {p.highlight}
          </div>
        </div>

        {/* Right — tags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '0.25rem 0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text2)',
                whiteSpace: 'nowrap',
                transition: 'all 0.4s ease',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="work"
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
        02 / Work
      </motion.p>

      <motion.h2
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
      >
        Selected work
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', transition: 'background 0.4s ease' }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.number} project={p} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
