import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Layers, Box, FolderGit2, UserCheck, Send, Sun, Moon, ShieldCheck, Lock, Menu, X, Phone } from 'lucide-react';

export default function Navbar({ onOpenAdmin, isAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Hide navbar when scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Show navbar when scrolling up
        setVisible(true);
      }

      setScrolled(currentScrollY > 20);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '12px 20px' : '18px 28px',
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-neon)',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.15)' : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease, background-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Mobile Hamburger Button (Opens Sidebar to Left) */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="mobile-hamburger-btn"
            title="Open Navigation Menu"
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '8px',
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Menu size={20} />
          </button>

          {/* Brand Logo */}
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(59, 130, 246, 0.2))',
                border: '1px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
              }}
            >
              <Cpu size={20} color="var(--accent-cyan)" />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '1px', color: 'var(--text-main)' }}>
                DAWIT<span style={{ color: 'var(--accent-cyan)' }}>.FSEHA</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.65rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)' }}>
                [MEKELLE UNIV // SOFTWARE ENG]
              </span>
            </div>
          </a>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="nav-links">
          <a href="#skills" style={navLinkStyle} title="Skills Matrix" className="nav-link-btn">
            <Layers size={18} /> <span className="nav-link-text">Skills Matrix</span>
          </a>
          <a href="#cad-lab" style={navLinkStyle} title="3D CAD Lab" className="nav-link-btn">
            <Box size={18} /> <span className="nav-link-text">3D CAD Lab</span>
          </a>
          <a href="#projects" style={navLinkStyle} title="Projects" className="nav-link-btn">
            <FolderGit2 size={18} /> <span className="nav-link-text">Projects</span>
          </a>
          <a href="#about" style={navLinkStyle} title="About" className="nav-link-btn">
            <UserCheck size={18} /> <span className="nav-link-text">About</span>
          </a>
          <a href="#contact" style={navLinkStyle} title="Contact" className="nav-link-btn">
            <Send size={18} /> <span className="nav-link-text">Contact</span>
          </a>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* DaVinci Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            title="Open DaVinci Admin Portal"
            style={{
              background: isAdmin ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: isAdmin ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-code)',
              transition: 'all 0.2s ease',
              boxShadow: isAdmin ? 'var(--shadow-neon)' : 'none',
            }}
          >
            {isAdmin ? <Lock size={15} /> : <ShieldCheck size={15} />}
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }} className="desktop-only-btn">
              {isAdmin ? 'ADMIN' : 'PORTAL'}
            </span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-code)',
              transition: 'all 0.2s ease',
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }} className="desktop-only-btn">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>

          <a href="#contact" className="neon-button desktop-only-btn" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            <Terminal size={15} /> INITIATE
          </a>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 190,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Mobile Sidebar (Opens to the Left) */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '280px',
          maxWidth: '82vw',
          zIndex: 200,
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid var(--border-neon)',
          boxShadow: '10px 0 30px rgba(0, 0, 0, 0.4)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 20px',
        }}
      >
        {/* Sidebar Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={22} color="var(--accent-cyan)" />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
              DAWIT<span style={{ color: 'var(--accent-cyan)' }}>.FSEHA</span>
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
          <a
            href="#skills"
            onClick={() => setSidebarOpen(false)}
            style={mobileNavLinkStyle}
          >
            <Layers size={18} color="var(--accent-cyan)" /> Skills Matrix
          </a>
          <a
            href="#cad-lab"
            onClick={() => setSidebarOpen(false)}
            style={mobileNavLinkStyle}
          >
            <Box size={18} color="var(--accent-cyan)" /> 3D CAD Lab
          </a>
          <a
            href="#projects"
            onClick={() => setSidebarOpen(false)}
            style={mobileNavLinkStyle}
          >
            <FolderGit2 size={18} color="var(--accent-cyan)" /> Projects
          </a>
          <a
            href="#about"
            onClick={() => setSidebarOpen(false)}
            style={mobileNavLinkStyle}
          >
            <UserCheck size={18} color="var(--accent-cyan)" /> About
          </a>
          <a
            href="#contact"
            onClick={() => setSidebarOpen(false)}
            style={mobileNavLinkStyle}
          >
            <Send size={18} color="var(--accent-cyan)" /> Contact
          </a>
        </div>

        {/* Mobile Sidebar Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
          <button
            onClick={() => {
              setSidebarOpen(false);
              onOpenAdmin();
            }}
            className="neon-button-secondary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '10px' }}
          >
            {isAdmin ? <Lock size={16} /> : <ShieldCheck size={16} />}
            <span>{isAdmin ? 'ADMIN PORTAL' : 'DAVINCI PORTAL'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="neon-button-secondary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '10px' }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>THEME: {theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
          </button>

          <a
            href="tel:+251992949485"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontFamily: 'var(--font-code)',
              marginTop: '10px',
            }}
          >
            <Phone size={14} color="var(--accent-cyan)" /> +251 992 949 485
          </a>
        </div>
      </aside>
    </>
  );
}

const navLinkStyle = {
  color: 'var(--text-main)',
  textDecoration: 'none',
  fontSize: '0.88rem',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  transition: 'color 0.2s ease',
};

const mobileNavLinkStyle = {
  color: 'var(--text-main)',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 14px',
  borderRadius: '10px',
  background: 'var(--bg-subtle)',
  border: '1px solid var(--border-subtle)',
  transition: 'all 0.2s ease',
};
