import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import CadLab3D from './components/CadLab3D';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import AdminModal from './components/AdminModal';
import { INITIAL_PROJECTS, INITIAL_SKILLS, INITIAL_HERO_INFO } from './data/portfolioData';
import { Cpu, Phone, Mail, Linkedin, Github } from 'lucide-react';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('davinci_admin') === 'true';
  });

  const [showAdminModal, setShowAdminModal] = useState(false);

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('davinci_portfolio_projects');
    return (saved && JSON.parse(saved).length > 0) ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('davinci_portfolio_skills');
    return (saved && JSON.parse(saved).length > 0) ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [heroInfo, setHeroInfo] = useState(() => {
    const saved = localStorage.getItem('davinci_portfolio_bio');
    return saved ? JSON.parse(saved) : INITIAL_HERO_INFO;
  });

  useEffect(() => {
    // Select headers, content cards, and panels for scroll pop-out effect
    const targetElements = document.querySelectorAll(
      '.section-header, .glass-panel, .cyber-status, #hero h1, #hero p'
    );

    targetElements.forEach((el) => {
      el.classList.add('scroll-pop');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    targetElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* HUD Navigation */}
      <Navbar onOpenAdmin={() => setShowAdminModal(true)} isAdmin={isAdmin} />

      {/* Hero Section */}
      <Hero heroInfo={heroInfo} />

      {/* Skills Matrix */}
      <Skills customSkills={skills} />

      {/* Interactive 3D SolidWorks & CAD Laboratory Visualizer */}
      <CadLab3D />

      {/* Projects Showcase */}
      <Projects customProjects={projects} />

      {/* About & Mekelle University Academic Timeline */}
      <About />

      {/* Contact & Transmission Terminal */}
      <Contact />

      {/* DaVinci Admin Portal Modal */}
      <AdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        projects={projects}
        setProjects={setProjects}
        skills={skills}
        setSkills={setSkills}
        heroInfo={heroInfo}
        setHeroInfo={setHeroInfo}
      />

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '36px 24px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-code)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>

          {/* Contact Infos */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="tel:+251992949485"
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <Phone size={15} color="var(--accent-cyan)" />
              <span>+251 992 949 485</span>
            </a>

            <a
              href="mailto:dawitfseha@email.com"
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <Mail size={15} color="var(--accent-cyan)" />
              <span>dawitfseha@email.com</span>
            </a>

            <a
              href="https://linkedin.com/in/dawit-fseha"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <Linkedin size={15} color="var(--accent-cyan)" />
              <span>linkedin.com/in/dawit-fseha</span>
            </a>

            <a
              href="https://github.com/DF-Ultra"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
              }}
            >
              <Github size={15} color="var(--accent-cyan)" />
              <span>github.com/DF-Ultra</span>
            </a>
          </div>

          {/* Copyright & Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.8rem' }}>
            <span>© 2026 DAWIT FSEHA</span>
            <span>   </span>
            <span> SOFTWARE ENGINEER @ MEKELLE UNIVERSITY</span>
            <span>   </span>
            <span style={{ color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
             
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
