import React from 'react';
import { ArrowRight, Box, Cpu, Download, Github, Linkedin, Mail, Sparkles, Palette, MapPin, Zap } from 'lucide-react';

export default function Hero({ heroInfo }) {
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
      {/* Background Circular Decorative Shapes */}
      <div className="hero-bg-circles" aria-hidden="true">
        <div className="hero-circle circle-1" />
        <div className="hero-circle circle-2" />
        <div className="hero-circle circle-3" />
        <div className="hero-circle circle-ring-1" />
        <div className="hero-circle circle-ring-2" />
      </div>

      {/* Content Overlay */}
      <div className="section-container hero-layout-grid">
        {/* Left Column: Text & Intro */}
        <div>

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
            {(heroInfo && heroInfo.taglines && heroInfo.taglines.length > 0) ? (
              heroInfo.taglines.map((t, idx) => (
                <span key={t.id || idx} className="glass-pill">
                  <Sparkles size={14} /> {t.label}
                </span>
              ))
            ) : (
              <>
                <span className="glass-pill"><Cpu size={14} /> Full Stack Web</span>
                <span className="glass-pill"><Box size={14} /> SolidWorks 3D CAD</span>
                <span className="glass-pill"><Sparkles size={14} /> Photo & Video VFX</span>
                <span className="glass-pill"><Palette size={14} /> Fine Art & Illustration</span>
              </>
            )}
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
              SOFTWARE ENGINEER
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
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="var(--accent-cyan)" /> Location: Mekelle University, ET
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={14} color="var(--accent-cyan)" /> Specialization: Software + CAD
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Palette size={14} color="var(--accent-cyan)" /> Media Skills: Video, Photo & Art
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
