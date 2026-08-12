import React from 'react';
import Hero3DCanvas from './Hero3DCanvas';
import { ArrowRight, Box, Cpu, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

export default function Hero({ heroInfo }) {
  const currentStatus = (heroInfo && heroInfo.status) || 'SENIOR // 4TH YEAR SOFTWARE ENGINEER @ MEKELLE UNIVERSITY';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '100px',
        overflow: 'hidden',
      }}
    >
      {/* 3D WebGL Background Canvas */}
      <Hero3DCanvas />

      {/* Subtle Blur & Radial Vignette Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          background: 'radial-gradient(circle at center, rgba(11, 15, 25, 0.25) 0%, rgba(11, 15, 25, 0.65) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content Overlay */}
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Text & Intro */}
        <div>
          <div className="cyber-status" style={{ marginBottom: '20px' }}>
            <span className="pulse-dot"></span>
            <span>{currentStatus}</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '3.4rem',
              lineHeight: 1.1,
              marginBottom: '20px',
              fontWeight: 800,
            }}
          >
            ENGINEERING <br />
            <span className="neon-title">CODE & CREATIVE 3D</span>
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              marginBottom: '32px',
              maxWidth: '580px',
              lineHeight: 1.7,
            }}
          >
            Hi, I'm <strong style={{ color: 'var(--text-main)' }}>Dawit Fseha</strong>. I merge <strong style={{ color: 'var(--accent-cyan)' }}>Software Development</strong> with <strong style={{ color: 'var(--text-main)' }}>SolidWorks 3D CAD modeling</strong>, high-end <strong style={{ color: 'var(--accent-cyan)' }}>Photo & Video Editing</strong>, and fine <strong style={{ color: 'var(--text-main)' }}>Digital Art & Drawing</strong> to craft immersive digital & mechanical experiences.
          </p>

          {/* Key Skill Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
            <span className="glass-pill"><Cpu size={14} /> Full Stack Web</span>
            <span className="glass-pill"><Box size={14} /> SolidWorks 3D CAD</span>
            <span className="glass-pill"><Sparkles size={14} /> Photo & Video VFX</span>
            <span className="glass-pill">🎨 Fine Art & Illustration</span>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <a href="#cad-lab" className="neon-button">
              EXPLORE 3D CAD LAB <ArrowRight size={18} />
            </a>
            <a href="#projects" className="neon-button-secondary">
              VIEW PROJECTS
            </a>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '46px',
                height: '46px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--accent-cyan)',
              }}
              title="Send Direct Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            <span>CONNECT:</span>
            <a
              href="https://github.com/DF-Ultra"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Github size={18} color="var(--accent-cyan)" /> github.com/DF-Ultra
            </a>
            <a
              href="https://linkedin.com/in/dawit-fseha"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Linkedin size={18} color="var(--accent-cyan)" /> linkedin.com/in/dawit-fseha
            </a>
          </div>
        </div>

        {/* Right Column: Cyber Profile HUD & Photo Frame */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '360px',
              padding: '24px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--border-neon)',
            }}
          >
            {/* Tech Corner Accents */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', width: '12px', height: '12px', borderTop: '2px solid var(--accent-cyan)', borderLeft: '2px solid var(--accent-cyan)' }} />
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '12px', height: '12px', borderTop: '2px solid var(--accent-cyan)', borderRight: '2px solid var(--accent-cyan)' }} />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '12px', height: '12px', borderBottom: '2px solid var(--accent-cyan)', borderLeft: '2px solid var(--accent-cyan)' }} />
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '12px', height: '12px', borderBottom: '2px solid var(--accent-cyan)', borderRight: '2px solid var(--accent-cyan)' }} />

            {/* Profile Avatar Frame */}
            <div
              style={{
                width: '180px',
                height: '180px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(139, 92, 246, 0.2))',
                border: '2px solid var(--accent-cyan)',
                boxShadow: 'var(--shadow-neon)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src="/profile.jpg"
                alt="Dawit Fseha"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '4px' }}>
              DAWIT FSEHA
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)', display: 'block', marginBottom: '14px' }}>
              ID: DF-ENG-2026 // SYSTEM ONLINE
            </span>

            <div
              style={{
                background: 'var(--bg-subtle)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-code)',
                color: 'var(--text-muted)',
                textAlign: 'left',
              }}
            >
              <div>📍 Location: Mekelle University, ET</div>
              <div>⚡ Specialization: Software + CAD</div>
              <div>🎨 Media Skills: Video, Photo & Art</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
