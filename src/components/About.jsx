import React from 'react';
import { GraduationCap, Code2, Box, Sparkles, Compass, CheckCircle2, Award } from 'lucide-react';

export default function About() {
  const milestones = [
    {
      year: '2026 (Present)',
      title: '4th Year Senior Software Engineer',
      institution: 'Mekelle University',
      description: 'Completing senior engineering curriculum focused on software architecture, algorithms, web platforms, and engineering systems.'
    },
    {
      year: 'Specialization',
      title: 'SolidWorks & 3D Hardware Design',
      institution: 'CAD & Mechanical Engineering',
      description: 'Designing precision 3D mechanical models, assemblies, exploded schematics, and structural stress tolerance simulations.'
    },
    {
      year: 'Creative Arts',
      title: 'Photo, Video & Fine Art Illustration',
      institution: 'Digital & Fine Media',
      description: 'Creating high-energy motion reels in Premiere/After Effects, color grading, fine art sketch work, and concept design.'
    }
  ];

  return (
    <section id="about" className="section-container">
      <div className="section-header">
        <span className="section-subtitle">// BACKGROUND & PHILOSOPHY</span>
        <h2 className="section-title">
          ABOUT <span className="neon-title">DAWIT FSEHA</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
          Bridging software engineering code, physical mechanical CAD modeling, motion video, and artistic drawing.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '40px',
          alignItems: 'start',
        }}
      >
        {/* Story Bio Card */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GraduationCap size={24} color="var(--accent-cyan)" /> Engineering Mindset & Creative Artistry
          </h3>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '16px' }}>
            As a <strong style={{ color: 'var(--text-main)' }}>4th Year Software Engineering Student at Mekelle University</strong>, I view code and engineering design as creative canvases. My fascination lies at the intersection where logical software structures meet physical CAD mechanics and visual artistry.
          </p>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '24px' }}>
            Whether I am developing full-stack web applications, modeling intricate 3D assemblies in <strong style={{ color: 'var(--accent-cyan)' }}>SolidWorks</strong>, editing cinematic video reels, or sketching fine art concepts, I bring precise attention to performance, beauty, and functional execution.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', marginBottom: '4px' }}>
                4th Year
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                SOFTWARE ENG // MEKELLE UNIV
              </span>
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', marginBottom: '4px' }}>
                4 Tracks
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                CODE + CAD + MEDIA + ART
              </span>
            </div>
          </div>
        </div>

        {/* Timeline / Milestones */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {milestones.map((m, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="glass-pill">{m.year}</span>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-code)', color: 'var(--accent-cyan)' }}>
                  {m.institution}
                </span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                {m.title}
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
