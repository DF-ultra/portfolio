import React from 'react';
import { Code2, Box, Video, Palette, CheckCircle2, Cpu } from 'lucide-react';

export default function Skills({ customSkills }) {
  const initialSkillCategories = [
    {
      title: 'Software & Web Development',
      subtitle: '4th Year Engineering Core',
      icon: <Code2 size={28} color="var(--accent-cyan)" />,
      description: 'Building modern, scalable web applications and algorithms.',
      skills: [
        'React.js / JavaScript / TypeScript',
        'HTML5 / CSS3 / Glassmorphic UI',
        'Python & C++ System Logic',
        'WebGL & Three.js 3D Web Graphics',
        'RESTful APIs & Data Structures',
        'Git / GitHub Version Control'
      ]
    },
    {
      title: 'SolidWorks & 3D CAD',
      subtitle: 'Mechanical & Structural Engineering',
      icon: <Box size={28} color="#3b82f6" />,
      description: 'Designing precision 3D parts, assemblies, and technical drafts.',
      skills: [
        'SolidWorks 3D Part Modeling',
        'Mechanical Assembly & Motion',
        'Technical Drafting & Schematics',
        'Low-Poly 3D Asset Creation',
        'FEA Structural Analysis Basics',
        'Rapid Prototyping & CAD Rendering'
      ]
    },
    {
      title: 'Photo & Video Editing',
      subtitle: 'Digital Content & Motion VFX',
      icon: <Video size={28} color="#8b5cf6" />,
      description: 'Crafting high-impact video reels, color grades, and graphics.',
      skills: [
        'Adobe Premiere Pro Reel Editing',
        'Adobe After Effects Motion VFX',
        'Photoshop Image Compositing',
        'Cinematic Color Grading',
        'Audio Design & Synchronization',
        'Social Media Content Creation'
      ]
    },
    {
      title: 'Drawing & Digital Art',
      subtitle: 'Visual Aesthetics & Fine Art',
      icon: <Palette size={28} color="#ec4899" />,
      description: 'Translating creative imagination into sketch work and visual art.',
      skills: [
        'Pencil & Fine Art Sketching',
        'Digital Painting & Illustration',
        'Concept Art & Character Design',
        'UI Layout & Visual Storyboarding',
        'Color Theory & Composition',
        'Graphic Identity Design'
      ]
    }
  ];

  const skillCategories = (customSkills && customSkills.length > 0) ? customSkills : initialSkillCategories;

  return (
    <section id="skills" className="section-container">
      <div className="section-header">
        <span className="section-subtitle">// MULTIDISCIPLINARY MATRIX</span>
        <h2 className="section-title">
          ENGINEERING & <span className="neon-title">CREATIVE SKILLS</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
          Combining rigorous software engineering logic with mechanical CAD precision, video editing flair, and artistic creation.
        </p>
      </div>

      <div className="grid-2">
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '30px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-main)' }}>
                    {cat.title}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
                    {cat.subtitle}
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
                {cat.description}
              </p>

              <div className="grid-2" style={{ gap: '12px', marginBottom: '20px' }}>
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.88rem',
                      color: 'var(--text-main)',
                      background: 'var(--bg-subtle)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--accent-cyan)" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
