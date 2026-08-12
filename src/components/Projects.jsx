import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Sparkles, Box, Video, Palette, Code2, X, Play } from 'lucide-react';

export default function Projects({ customProjects }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const initialProjects = [
    {
      id: 1,
      title: 'Mekelle Univ Software Portal',
      category: 'Software Engineering',
      typeBadge: 'Full Stack App',
      icon: <Code2 size={18} color="var(--accent-cyan)" />,
      description: 'A modern high-performance web platform built for academic project tracking, student course workflows, and data management.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'CSS Glassmorphism'],
      github: 'https://github.com/DF-Ultra',
      demo: 'https://github.com/DF-Ultra',
      details: 'Built during 4th year Software Engineering studies at Mekelle University. Features secure user authentication, responsive UI, real-time dashboard analytics, and clean RESTful API integration.',
      accent: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(59, 130, 246, 0.2))'
    },
    {
      id: 2,
      title: '3D Mechanical Gear Assembly',
      category: 'SolidWorks CAD',
      typeBadge: 'SolidWorks 3D CAD',
      icon: <Box size={18} color="#3b82f6" />,
      description: 'Precision mechanical gearbox assembly created in SolidWorks with motion simulation and stress tolerance analysis.',
      technologies: ['SolidWorks', '3D Modeling', 'Motion Study', 'WebGL CAD'],
      github: 'https://github.com/DF-Ultra',
      demo: 'https://github.com/DF-Ultra',
      details: 'Complex multi-part mechanical assembly featuring planetary gear ratios, exploded view schematics, and mechanical stress simulation to optimize load distribution.',
      accent: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
    },
    {
      id: 3,
      title: 'Cinematic Motion VFX & Reel',
      category: 'Video & Photo Editing',
      typeBadge: 'Video Reel & VFX',
      icon: <Video size={18} color="#8b5cf6" />,
      description: 'Dynamic cinematic video showcase featuring custom motion graphics, sound design, speed ramping, and color grading.',
      technologies: ['Premiere Pro', 'After Effects', 'Color Grading', 'Sound Design'],
      github: 'https://github.com/DF-Ultra',
      demo: 'https://github.com/DF-Ultra',
      details: 'High-energy video edit combining motion graphics overlays, synchronized audio beats, LUT color correction, and seamless visual transitions.',
      accent: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))'
    },
    {
      id: 4,
      title: 'Cyberpunk Concept Fine Art',
      category: 'Drawing & Art',
      typeBadge: 'Fine Art & Digital Sketch',
      icon: <Palette size={18} color="#ec4899" />,
      description: 'Original fine art pencil drawings and digital concept illustrations capturing futuristic sci-fi architectures and character designs.',
      technologies: ['Hand Sketching', 'Digital Painting', 'Concept Design', 'Photoshop'],
      github: 'https://github.com/DF-Ultra',
      demo: 'https://github.com/DF-Ultra',
      details: 'Exploration of futuristic aesthetics, line work, lighting contrast, and mechanical anatomy drawn digitally and on traditional sketch media.',
      accent: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(0, 229, 255, 0.2))'
    },
    {
      id: 5,
      title: 'Robotic Arm Mechanical Joint',
      category: 'SolidWorks CAD',
      typeBadge: 'SolidWorks 3D CAD',
      icon: <Box size={18} color="#3b82f6" />,
      description: 'Low-poly and high-precision mechanical robotic arm joint engineered for 3-axis articulated movement.',
      technologies: ['SolidWorks', 'CAD Drafting', '3D Assembly', 'FEA Analysis'],
      github: 'https://github.com/DF-Ultra',
      demo: 'https://github.com/DF-Ultra',
      details: 'Industrial robot end-effector CAD model designed with custom mounting brackets, servo housing specs, and structural weight optimization.',
      accent: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))'
    },
    {
      id: 6,
      title: 'Interactive 3D Portfolio Matrix',
      category: 'Software Engineering',
      typeBadge: 'WebGL Web App',
      icon: <Code2 size={18} color="var(--accent-cyan)" />,
      description: 'Next-gen cyberpunk interactive portfolio with WebGL Three.js 3D canvas background and dark glassmorphic design.',
      technologies: ['React', 'Three.js', 'Vite', 'CSS3 Variables', 'Lucide Icons'],
      github: 'https://github.com/DF-Ultra',
      demo: 'https://github.com/DF-Ultra',
      details: 'Custom engineered web application featuring mouse-guided 3D WebGL particle fields, interactive CAD visualizer lab, responsive grid systems, and smooth UI animations.',
      accent: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(59, 130, 246, 0.2))'
    }
  ];

  const projectsData = (customProjects && customProjects.length > 0) ? customProjects : initialProjects;

  const categories = ['All', 'Software Engineering', 'SolidWorks CAD', 'Video & Photo Editing', 'Drawing & Art'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-container">
      <div className="section-header">
        <span className="section-subtitle">// PORTFOLIO SHOWCASE</span>
        <h2 className="section-title">
          FEATURED <span className="neon-title">WORK & PROJECTS</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
          Explore a curated selection of software engineering apps, SolidWorks 3D mechanical models, video/photo editing reels, and artwork.
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '40px',
        }}
      >
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveFilter(cat)}
            className={activeFilter === cat ? 'neon-button' : 'neon-button-secondary'}
            style={{
              padding: '10px 20px',
              fontSize: '0.85rem',
              borderRadius: '20px',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient Top Glow */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: project.accent,
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="glass-pill">
                  {project.icon} {project.typeBadge}
                </span>
                <button
                  onClick={() => setSelectedProject(project)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-cyan)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-code)'
                  }}
                >
                  <Eye size={16} /> INSPECT
                </button>
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '10px' }}>
                {project.title}
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6 }}>
                {project.description}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {project.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-code)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-subtle)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="neon-button-secondary"
                  style={{ flex: 1, padding: '8px', fontSize: '0.8rem', justifyContent: 'center' }}
                >
                  <Github size={15} /> CODE REPO
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 200,
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '600px',
              width: '100%',
              padding: '32px',
              position: 'relative',
              border: '1px solid var(--accent-cyan)',
              boxShadow: 'var(--shadow-card)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
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

            <span className="glass-pill" style={{ marginBottom: '12px' }}>
              {selectedProject.icon} {selectedProject.typeBadge}
            </span>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '12px' }}>
              {selectedProject.title}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', lineHeight: 1.7 }}>
              {selectedProject.details}
            </p>

            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '10px' }}>
              TECHNOLOGY & TOOLS
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              {selectedProject.technologies.map((t, idx) => (
                <span key={idx} className="glass-pill" style={{ fontSize: '0.8rem' }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="neon-button"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Github size={16} /> VIEW REPOSITORY
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
