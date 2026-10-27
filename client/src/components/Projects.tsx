import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'Industrial Service Portal',
    subtitle: 'Full-stack · Sole developer · Production',
    year: '2025',
    description:
      "A comprehensive, cloud-native ERP / industrial operations and maintenance management system built entirely from scratch. I owned every layer: TypeScript/Node.js backend with REST APIs, a React + Tailwind UI optimized for remote management workflows, Docker containerization, and AWS deployment via Git-driven CI/CD.",
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'CI/CD'],
    highlight: 'Sole developer — end-to-end ownership from architecture to production deployment',
    link: null,
    note: 'Private deployment — built for a single company\'s internal use, happy to walk through it',
    why: "Honk Industries needed to replace a patchwork of spreadsheets and phone calls with one system their field technicians could actually use. Built as part of my bachelor's thesis — it's still running their maintenance operations today.",
  },
  {
    number: '02',
    title: 'Pharmacy Finder',
    subtitle: 'Full-stack · Web + iOS · Production',
    year: '2026',
    description:
      "Finds the nearest pharmacies to any point in Finland and gives walking directions, backed by a bundled dataset of ~900 pharmacies extracted from Overture Maps. The browser never talks to the routing providers directly — everything is proxied server-side with rate limiting and a strict CSP, and address lookup/directions fall back from OpenRouteService to GraphHopper if the primary provider fails. Architecture and security decisions are written up as ADRs. The same API backs a native SwiftUI iOS app.",
    tags: ['React', 'TypeScript', 'Node.js', 'Overture Maps', 'Swift', 'Vercel'],
    highlight: 'Server-side proxying, provider fallback, and documented ADRs — not just a happy-path demo',
    link: 'https://pharmacy-finder.robinkarlsson.fi',
    repoUrl: 'https://github.com/RJKA99/pharmacy-finder-web',
    why: "Built to clear a CTF-style technical gate in a job application: prove I could ship a real, production-grade app end-to-end, not just talk about it. It happened to overlap with a university course assignment too, so the same work ended up serving two purposes at once.",
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
    link: 'https://nextup.robinkarlsson.fi',
    why: "I kept losing track of what to work on next in my own task list, so I built a tool where AI agents handle the scheduling — and get scored on how good their estimates actually are.",
  },
  {
    number: '04',
    title: 'Fitness Tracker',
    subtitle: 'Full-stack · AI features · Production',
    year: '2026',
    description:
      "A personal workout and food-tracking app built around genuinely useful AI features rather than a chatbot bolted on the side: voice-based food logging, photo-based calorie estimation, native barcode detection for packaged food, and an AI progress analysis that reads your logged history and explains what's actually changing. Streaks and PR callouts give positive reinforcement on data that was already being collected.",
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AI Vision', 'Vercel'],
    highlight: 'AI features that read real usage data — voice logging, photo calorie estimation, barcode scanning',
    link: 'https://fitness-tracker-roan-theta-21.vercel.app',
    why: "I was juggling three different apps to track workouts, food, and weight, none of which fit how I actually train and eat — so instead of compromising further, I built my own and shaped it exactly how I wanted. It also puts AI to work on data that's already there: reading my logged history directly instead of me retyping everything into a separate chatbot.",
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
    link: null,
    repoUrl: 'https://github.com/RJKA99/azure-doc-assistant',
    demo: {
      note: 'Demo — sample query against an example document set',
      query: "What's the process for requesting a new laptop?",
      answer:
        "Submit a ticket via the IT portal with your manager's approval attached. Standard laptops ship within 5 business days; specialized hardware requires a 2-week lead time for procurement approval.",
      sources: ['IT_Onboarding_Guide.pdf, p.4', 'Hardware_Request_Policy.md'],
    },
    why: "Built while writing my bachelor's thesis, when I wanted an efficient way to search across multiple sources instead of digging through documents by hand — and used it as an excuse to properly learn Azure at the same time.",
  },
  {
    number: '06',
    title: 'n8n Job Monitor',
    subtitle: 'Automation · AI agent · Human-in-the-loop',
    year: '2026',
    description:
      "An automation that scans job boards for new postings, classifies each one with a Claude agent against my own fit criteria, and sends the best matches to a Telegram bot for one-tap approve/reject before anything is added to my application tracker. No web UI — it's built entirely on n8n workflows and an LLM classifier, running on a schedule so I don't have to manually re-check listings every day.",
    tags: ['n8n', 'Claude Agent', 'Telegram Bot API', 'Automation'],
    highlight: 'An AI agent that pre-screens job postings and asks for a thumbs up before it acts',
    link: null,
    note: 'Private automation — runs against my own job search, happy to walk through it',
    why: "Manually re-checking job boards every day during my own search was eating hours — built this so the monitoring happens automatically and I only spend time on postings worth a look.",
  },
]

function ProjectCard({ project: p, index, inView }: {
  project: typeof projects[0]
  index: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [showWhy, setShowWhy] = useState(false)

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {p.link ? (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
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
            ) : null}

            {p.demo ? (
              <button
                onClick={() => setShowDemo(v => !v)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--accent)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {showDemo ? 'Hide demo ↑' : 'See demo ↓'}
              </button>
            ) : null}

            {p.why ? (
              <button
                onClick={() => setShowWhy(v => !v)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--accent)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {showWhy ? 'Hide why ↑' : 'Why? ↓'}
              </button>
            ) : null}

            {p.repoUrl ? (
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--text2)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
              >
                Source ↗
              </a>
            ) : null}

            {!p.link && !p.demo && p.note ? (
              <p style={{
                fontSize: '0.8rem',
                fontStyle: 'italic',
                color: 'var(--text2)',
                transition: 'color 0.4s ease',
              }}>
                {p.note}
              </p>
            ) : null}
          </div>

          <AnimatePresence>
            {showWhy && p.why && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden', maxWidth: '560px' }}
              >
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1.25rem',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  background: 'var(--bg2)',
                  transition: 'background 0.4s ease, border-color 0.4s ease',
                }}>
                  <p style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text2)',
                    marginBottom: '0.625rem',
                    transition: 'color 0.4s ease',
                  }}>
                    Why I built this
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.6, transition: 'color 0.4s ease' }}>
                    {p.why}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showDemo && p.demo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden', maxWidth: '560px' }}
              >
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1.25rem',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  background: 'var(--bg2)',
                  transition: 'background 0.4s ease, border-color 0.4s ease',
                }}>
                  <p style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text2)',
                    marginBottom: '1rem',
                    transition: 'color 0.4s ease',
                  }}>
                    {p.demo.note}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--accent)', fontWeight: 700, transition: 'color 0.4s ease' }}>Q</span>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.55, marginTop: '0.25rem', transition: 'color 0.4s ease' }}>
                        {p.demo.query}
                      </p>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--accent)', fontWeight: 700, transition: 'color 0.4s ease' }}>A</span>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text)', lineHeight: 1.55, marginTop: '0.25rem', transition: 'color 0.4s ease' }}>
                        {p.demo.answer}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '0.375rem', borderTop: '1px solid var(--border)', transition: 'border-color 0.4s ease' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text2)', transition: 'color 0.4s ease' }}>
                        Sources
                      </span>
                      {p.demo.sources.map((s) => (
                        <span key={s} style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text2)', transition: 'color 0.4s ease' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
