import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Layers, Box, FolderGit2, UserCheck, Send, Sun, Moon, ShieldCheck, Lock } from 'lucide-react';

export default function Navbar({ onOpenAdmin, isAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 24px' : '20px 36px',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-neon)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Brand Logo */}
      <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(59, 130, 246, 0.2))',
            border: '1px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 229, 255, 0.3)',
          }}
        >
          <Cpu size={22} color="var(--accent-cyan)" />
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px', color: 'var(--text-main)' }}>
            DAWIT<span style={{ color: 'var(--accent-cyan)' }}>.FSEHA</span>
          </span>
          <span style={{ display: 'block', fontSize: '0.68rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)' }}>
            [MEKELLE UNIV // SOFTWARE ENG]
          </span>
        </div>
      </a>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="nav-links">
        <a href="#skills" style={navLinkStyle}>
          <Layers size={16} /> Skills Matrix
        </a>
        <a href="#cad-lab" style={navLinkStyle}>
          <Box size={16} /> 3D CAD Lab
        </a>
        <a href="#projects" style={navLinkStyle}>
          <FolderGit2 size={16} /> Projects
        </a>
        <a href="#about" style={navLinkStyle}>
          <UserCheck size={16} /> About
        </a>
        <a href="#contact" style={navLinkStyle}>
          <Send size={16} /> Contact
        </a>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* DaVinci Admin Portal Button */}
        <button
          onClick={onOpenAdmin}
          title="Open DaVinci Admin Portal"
          style={{
            background: isAdmin ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: isAdmin ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '8px 14px',
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
          {isAdmin ? <Lock size={16} /> : <ShieldCheck size={16} />}
          <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>
            {isAdmin ? 'ADMIN' : 'DAVINCI PORTAL'}
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
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>

        <a href="#contact" className="neon-button" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>
          <Terminal size={16} /> INITIATE LINK
        </a>
      </div>
    </nav>
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
