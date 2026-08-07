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
    link: null,
    note: 'Private deployment — built for a single company\'s internal use, happy to walk through it',
  },
  {
    number: '02',
    title: 'AI Component Generator',
    subtitle: 'AI · React · Design-to-code',
    year: '2026',
    description:
      "Describe a UI component in plain text — the app generates a live, interactive React component in seconds using Llama 3.3 via Groq. Features include iterative refinement, responsive preview, syntax-highlighted code view, one-click export as .tsx, and shareable URLs encoded in the hash. Built to demonstrate design-to-code thinking end-to-end.",
    tags: ['React', 'TypeScript', 'Groq', 'Llama 3.3', 'Tailwind', 'Vite'],
    highlight: 'From description to interactive component in seconds — live on the web',
    link: 'https://ai-component-gen-delta.vercel.app',
  },
  {
    number: '03',
    title: 'NextUp',
    subtitle: 'Full-stack · AI agent integration · Production',
    year: '2026',
    description:
      "A task manager that doesn't just list what's due — it ranks tasks by urgency and relevance and surfaces a single 'do this next' recommendation. AI agents (Claude Desktop, Claude Code, or any MCP client) create, schedule, and update tasks on a user's behalf through an embedded MCP server authenticated with per-user API keys, then get rated on how accurate their time and relevance estimates were.",
    tags: ['React', 'TypeScript', 'Express', 'MongoDB', 'MCP', 'Vercel'],
    highlight: 'AI agents plan your work — and get scored on how well they estimated it',
    link: 'https://nextup-todo.vercel.app',
  },
  {
    number: '04',
    title: 'Motion Playground',
    subtitle: 'Interaction design · Framer Motion · Component library',
    year: '2026',
    description:
      "A library of interactive micro-interaction and gesture demos — magnetic buttons, 3D tilt cards, drag-to-reorder lists, swipe-to-dismiss cards, a shared-layout tab indicator, and more — each rendered live next to its own source code. Built to explore what Framer Motion can express beyond a basic fade-in.",
    tags: ['React', 'TypeScript', 'Framer Motion', 'React Router', 'Vite'],
    highlight: 'A dozen-plus hand-built interaction demos, each with its source code inline',
    link: 'https://motionplayground.vercel.app',
  },
  {
    number: '05',
    title: 'Azure Doc Assistant',
    subtitle: 'RAG · Azure · Infrastructure as Code',
    year: '2026',
    description:
      "A document Q&A service built hands-on to prove Azure and Terraform skills: ask a question via curl, or through Claude Desktop as an MCP client, and it gets embedded locally with transformers.js, matched against documents indexed in Azure AI Search, and answered through the Claude API with sources. I built the ingestion pipeline myself, parsing, chunking, embedding, and indexing PDF and Markdown documents. The whole infrastructure (Container Apps, Key Vault, Log Analytics, AI Search, Blob Storage) is provisioned through Terraform, with secrets pulled from Key Vault at runtime. It reuses NextUp's MCP interface, so the same client can query both tasks and documents.",
    tags: ['Azure', 'Terraform', 'RAG', 'Node.js', 'TypeScript', 'MCP', 'Azure AI Search'],
    highlight: 'Full RAG pipeline on Azure, provisioned end to end with Terraform',
    link: 'https://github.com/RJKA99/azure-doc-assistant',
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
          {p.link ? (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                marginTop: '1rem',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--accent)',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              View live ↗
            </a>
          ) : p.note ? (
            <p style={{
              marginTop: '1rem',
              fontSize: '0.8rem',
              fontStyle: 'italic',
              color: 'var(--text2)',
              transition: 'color 0.4s ease',
            }}>
              {p.note}
            </p>
          ) : null}
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
