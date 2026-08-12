import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import CadLab3D from './components/CadLab3D';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import AdminModal from './components/AdminModal';
import { Cpu } from 'lucide-react';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('davinci_admin') === 'true';
  });

  const [showAdminModal, setShowAdminModal] = useState(false);

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('davinci_portfolio_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('davinci_portfolio_skills');
    return saved ? JSON.parse(saved) : [];
  });

  const [heroInfo, setHeroInfo] = useState(() => {
    const saved = localStorage.getItem('davinci_portfolio_bio');
    return saved ? JSON.parse(saved) : {
      name: 'Dawit Fseha',
      status: 'SENIOR // 4TH YEAR SOFTWARE ENGINEER @ MEKELLE UNIVERSITY',
      bio: "Hi, I'm Dawit Fseha. I merge Software Development with SolidWorks 3D CAD modeling, high-end Photo & Video Editing, and fine Digital Art & Drawing to craft immersive digital & mechanical experiences."
    };
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
          background: 'rgba(7, 10, 18, 0.95)',
          padding: '24px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-code)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span>© 2026 DAWIT FSEHA</span>
          <span>//</span>
          <span>4TH YEAR SOFTWARE ENGINEER @ MEKELLE UNIVERSITY</span>
          <span>//</span>
          <span style={{ color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Cpu size={14} /> THREE.JS & REACT
          </span>
        </div>
      </footer>
    </div>
  );
}
