import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, Copy, Check, Terminal, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dawitfseha@email.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#3b82f6', '#8b5cf6']
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="contact" className="section-container" style={{ paddingBottom: '140px' }}>
      <div className="section-header">
        <span className="section-subtitle">// INITIATE CONNECTION</span>
        <h2 className="section-title">
          GET IN <span className="neon-title">TOUCH</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
          Have a software project, SolidWorks CAD modeling request, video editing project, or want to collaborate? Send a direct message!
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        {/* Direct Contact Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: '1px solid var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Mail size={22} color="var(--accent-cyan)" />
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
                  DIRECT EMAIL
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#fff' }}>
                  dawitfseha@email.com
                </h4>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="neon-button-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '8px 12px' }}
            >
              {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              {copied ? 'EMAIL COPIED TO CLIPBOARD' : 'COPY EMAIL ADDRESS'}
            </button>
          </div>

          {/* GitHub Card */}
          <a
            href="https://github.com/DF-Ultra"
            target="_blank"
            rel="noreferrer"
            className="glass-panel"
            style={{ padding: '20px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Github size={22} color="#fff" />
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                GITHUB REPOSITORIES
              </span>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#fff' }}>
                github.com/DF-Ultra
              </h4>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://linkedin.com/in/dawit-fseha"
            target="_blank"
            rel="noreferrer"
            className="glass-panel"
            style={{ padding: '20px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Linkedin size={22} color="var(--accent-cyan)" />
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                PROFESSIONAL NETWORK
              </span>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#fff' }}>
                linkedin.com/in/dawit-fseha
              </h4>
            </div>
          </a>
        </div>

        {/* Interactive Cyber Terminal Form */}
        <div className="glass-panel" style={{ padding: '28px', border: '1px solid var(--border-neon)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
            <Terminal size={18} /> [TERMINAL // TRANSMIT MESSAGE]
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Check size={30} color="#10b981" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.4rem', marginBottom: '8px' }}>
                TRANSMISSION SUCCESSFUL!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
                Thank you, {formState.name || 'Friend'}! Your message has been transmitted directly to Dawit Fseha.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: '', email: '', subject: '', message: '' });
                }}
                className="neon-button"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  SUBJECT
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Dev / SolidWorks CAD Project"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about your project or inquiry..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="neon-button" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                <Send size={18} /> TRANSMIT MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '8px',
  background: 'rgba(0, 0, 0, 0.4)',
  border: '1px solid var(--border-subtle)',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'all 0.2s ease',
};
