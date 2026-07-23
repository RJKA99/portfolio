import { ThemeProvider } from './context/ThemeContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Process from './components/Process'
import Contact from './components/Contact'

function Portfolio() {
  return (
    <div className="grain">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Process />
        <Contact />
      </main>
      <footer style={{
        padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: 'var(--text2)',
        transition: 'border-color 0.4s ease, color 0.4s ease',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <span>© 2026 Robin Karlsson</span>
        <span>Built with React · MERN stack · Framer Motion</span>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  )
}
