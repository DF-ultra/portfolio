import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, LogOut, Plus, Trash2, Edit3, X, Check, Sparkles, FolderPlus, Layers, User, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export default function AdminModal({
  isOpen,
  onClose,
  isAdmin,
  setIsAdmin,
  projects,
  setProjects,
  skills,
  setSkills,
  heroInfo,
  setHeroInfo
}) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'skills', 'bio'

  // New Project Form state
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Software Engineering',
    typeBadge: 'Full Stack App',
    description: '',
    technologies: '',
    github: 'https://github.com/DF-Ultra',
    details: '',
  });

  // New Skill Form state
  const [newSkillCategoryIdx, setNewSkillCategoryIdx] = useState(0);
  const [newSkillName, setNewSkillName] = useState('');
  const [newTagline, setNewTagline] = useState('');

  if (!isOpen) return null;

  // Login Authentication
  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameInput.trim() === 'davinci' && passwordInput.trim() === 'davinci') {
      setIsAdmin(true);
      setLoginError('');
      sessionStorage.setItem('davinci_admin', 'true');
    } else {
      setLoginError('Invalid DaVinci credentials! Check username and password.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('davinci_admin');
    setUsernameInput('');
    setPasswordInput('');
  };

  // Add / Edit Project
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;

    const techArray = typeof projectForm.technologies === 'string'
      ? projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : projectForm.technologies;

    if (editingProjectId) {
      // Update existing
      const updated = projects.map(p => {
        if (p.id === editingProjectId) {
          return {
            ...p,
            title: projectForm.title,
            category: projectForm.category,
            typeBadge: projectForm.typeBadge,
            description: projectForm.description,
            technologies: techArray,
            github: projectForm.github,
            details: projectForm.details || projectForm.description,
          };
        }
        return p;
      });
      setProjects(updated);
      localStorage.setItem('davinci_portfolio_projects', JSON.stringify(updated));
    } else {
      // Add new
      const newProj = {
        id: Date.now(),
        title: projectForm.title,
        category: projectForm.category,
        typeBadge: projectForm.typeBadge,
        description: projectForm.description,
        technologies: techArray,
        github: projectForm.github,
        demo: projectForm.github,
        details: projectForm.details || projectForm.description,
        accent: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(59, 130, 246, 0.2))'
      };
      const updated = [newProj, ...projects];
      setProjects(updated);
      localStorage.setItem('davinci_portfolio_projects', JSON.stringify(updated));
    }

    // Reset form
    setProjectForm({
      title: '',
      category: 'Software Engineering',
      typeBadge: 'Full Stack App',
      description: '',
      technologies: '',
      github: 'https://github.com/DF-Ultra',
      details: '',
    });
    setShowAddProject(false);
    setEditingProjectId(null);
  };

  const handleEditProjectClick = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      typeBadge: proj.typeBadge,
      description: proj.description,
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies,
      github: proj.github || 'https://github.com/DF-Ultra',
      details: proj.details || proj.description,
    });
    setShowAddProject(true);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Delete this project from your portfolio?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('davinci_portfolio_projects', JSON.stringify(updated));
    }
  };

  // Reorder Projects
  const handleMoveProject = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const updated = [...projects];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setProjects(updated);
    localStorage.setItem('davinci_portfolio_projects', JSON.stringify(updated));
  };

  // Add Skill
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const updated = skills.map((cat, idx) => {
      if (idx === parseInt(newSkillCategoryIdx)) {
        return {
          ...cat,
          skills: [...cat.skills, newSkillName.trim()]
        };
      }
      return cat;
    });
    setSkills(updated);
    localStorage.setItem('davinci_portfolio_skills', JSON.stringify(updated));
    setNewSkillName('');
  };

  // Delete Skill
  const handleDeleteSkill = (catIdx, skillName) => {
    const updated = skills.map((cat, idx) => {
      if (idx === catIdx) {
        return {
          ...cat,
          skills: cat.skills.filter(s => s !== skillName)
        };
      }
      return cat;
    });
    setSkills(updated);
    localStorage.setItem('davinci_portfolio_skills', JSON.stringify(updated));
  };

  // Reorder Skill Categories
  const handleMoveSkillCategory = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= skills.length) return;
    const updated = [...skills];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setSkills(updated);
    localStorage.setItem('davinci_portfolio_skills', JSON.stringify(updated));
  };

  // Reorder Skill Items within category
  const handleMoveSkillItem = (catIdx, skillIdx, direction) => {
    const category = skills[catIdx];
    const targetIndex = direction === 'left' ? skillIdx - 1 : skillIdx + 1;
    if (targetIndex < 0 || targetIndex >= category.skills.length) return;
    const updatedSkills = [...category.skills];
    const [moved] = updatedSkills.splice(skillIdx, 1);
    updatedSkills.splice(targetIndex, 0, moved);

    const updated = skills.map((cat, idx) => (idx === catIdx ? { ...cat, skills: updatedSkills } : cat));
    setSkills(updated);
    localStorage.setItem('davinci_portfolio_skills', JSON.stringify(updated));
  };

  // Bio & Taglines Updates
  const handleBioChange = (field, val) => {
    const updated = { ...heroInfo, [field]: val };
    setHeroInfo(updated);
    localStorage.setItem('davinci_portfolio_bio', JSON.stringify(updated));
  };

  const handleAddTagline = (e) => {
    e.preventDefault();
    if (!newTagline.trim()) return;
    const currentTaglines = heroInfo.taglines || [
      { id: 1, label: 'Full Stack Web' },
      { id: 2, label: 'SolidWorks 3D CAD' },
      { id: 3, label: 'Photo & Video VFX' },
      { id: 4, label: 'Fine Art & Illustration' }
    ];
    const updatedTaglines = [...currentTaglines, { id: Date.now(), label: newTagline.trim() }];
    const updated = { ...heroInfo, taglines: updatedTaglines };
    setHeroInfo(updated);
    localStorage.setItem('davinci_portfolio_bio', JSON.stringify(updated));
    setNewTagline('');
  };

  const handleMoveTagline = (index, direction) => {
    const taglines = heroInfo.taglines || [
      { id: 1, label: 'Full Stack Web' },
      { id: 2, label: 'SolidWorks 3D CAD' },
      { id: 3, label: 'Photo & Video VFX' },
      { id: 4, label: 'Fine Art & Illustration' }
    ];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= taglines.length) return;
    const updatedTaglines = [...taglines];
    const [moved] = updatedTaglines.splice(index, 1);
    updatedTaglines.splice(targetIndex, 0, moved);
    const updated = { ...heroInfo, taglines: updatedTaglines };
    setHeroInfo(updated);
    localStorage.setItem('davinci_portfolio_bio', JSON.stringify(updated));
  };

  const handleDeleteTagline = (index) => {
    const taglines = heroInfo.taglines || [
      { id: 1, label: 'Full Stack Web' },
      { id: 2, label: 'SolidWorks 3D CAD' },
      { id: 3, label: 'Photo & Video VFX' },
      { id: 4, label: 'Fine Art & Illustration' }
    ];
    const updatedTaglines = taglines.filter((_, idx) => idx !== index);
    const updated = { ...heroInfo, taglines: updatedTaglines };
    setHeroInfo(updated);
    localStorage.setItem('davinci_portfolio_bio', JSON.stringify(updated));
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 300,
        background: 'rgba(7, 10, 18, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: isAdmin ? '800px' : '420px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          position: 'relative',
          border: '1px solid var(--accent-cyan)',
          boxShadow: '0 0 40px rgba(0, 229, 255, 0.3)',
          borderRadius: '16px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
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

        {/* View 1: LOGIN TERMINAL */}
        {!isAdmin ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--button-gradient)',
                  border: '1px solid var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: 'var(--shadow-neon)',
                }}
              >
                <ShieldCheck size={28} color="var(--accent-cyan)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                DaVinci Admin Portal
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                AUTHENTICATION REQUIRED // SYSTEM CONTROL
              </p>
            </div>

            {loginError && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#ef4444',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-code)',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  ADMIN USERNAME
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--accent-cyan)' }} />
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="davinci"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-neon)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-code)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-code)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  PASSWORD
                </label>
                <div style={{ position: 'relative' }}>
                  <Key size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--accent-cyan)' }} />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-neon)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-code)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="neon-button" style={{ marginTop: '10px', justifyContent: 'center' }}>
                <Lock size={16} /> ACCESS DAVINCI PORTAL
              </button>
            </form>
          </div>
        ) : (
          /* View 2: ADMIN MANAGEMENT DASHBOARD */
          <div>
            {/* Dashboard Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="cyber-status" style={{ fontSize: '0.75rem', marginBottom: '6px' }}>
                  <span className="pulse-dot"></span> AUTHENTICATED AS DAVINCI ADMIN
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-main)' }}>
                  DaVinci Content Portal
                </h3>
              </div>

              <button
                onClick={handleLogout}
                className="neon-button-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}
              >
                <LogOut size={15} /> LOGOUT
              </button>
            </div>

            {/* Dashboard Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <button
                onClick={() => setActiveTab('projects')}
                className={activeTab === 'projects' ? 'neon-button' : 'neon-button-secondary'}
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              >
                <FolderPlus size={15} /> Projects ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={activeTab === 'skills' ? 'neon-button' : 'neon-button-secondary'}
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              >
                <Layers size={15} /> Skills Matrix
              </button>
              <button
                onClick={() => setActiveTab('bio')}
                className={activeTab === 'bio' ? 'neon-button' : 'neon-button-secondary'}
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              >
                <User size={15} /> Bio & Taglines
              </button>
            </div>

            {/* TAB 1: PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-main)' }}>
                    Portfolio Projects (Reorder & Edit)
                  </h4>
                  {!showAddProject && (
                    <button
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({
                          title: '',
                          category: 'Software Engineering',
                          typeBadge: 'Full Stack App',
                          description: '',
                          technologies: '',
                          github: 'https://github.com/DF-Ultra',
                          details: '',
                        });
                        setShowAddProject(true);
                      }}
                      className="neon-button"
                      style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                    >
                      <Plus size={15} /> Add New Project
                    </button>
                  )}
                </div>

                {/* Add / Edit Form */}
                {showAddProject && (
                  <form
                    onSubmit={handleSaveProject}
                    style={{
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-neon)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {editingProjectId ? <Edit3 size={15} /> : <Plus size={15} />}
                        {editingProjectId ? 'Edit Project' : 'Add New Project'}
                      </h5>
                      <button
                        type="button"
                        onClick={() => setShowAddProject(false)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={labelStyle}>PROJECT TITLE</label>
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          placeholder="e.g. Autonomous Robot Simulation"
                          required
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>CATEGORY</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          style={inputStyle}
                        >
                          <option value="Software Engineering">Software Engineering</option>
                          <option value="SolidWorks CAD">SolidWorks CAD</option>
                          <option value="Video & Photo Editing">Video & Photo Editing</option>
                          <option value="Drawing & Art">Drawing & Art</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={labelStyle}>TYPE BADGE</label>
                        <input
                          type="text"
                          value={projectForm.typeBadge}
                          onChange={(e) => setProjectForm({ ...projectForm, typeBadge: e.target.value })}
                          placeholder="e.g. WebGL App, 3D CAD, Video Edit"
                          required
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>GITHUB / DEMO LINK</label>
                        <input
                          type="url"
                          value={projectForm.github}
                          onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                          placeholder="https://github.com/DF-Ultra"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>SHORT DESCRIPTION</label>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Brief summary of the project..."
                        rows={2}
                        required
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>TECHNOLOGIES (Comma separated)</label>
                      <input
                        type="text"
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                        placeholder="React, Three.js, SolidWorks, C++"
                        style={inputStyle}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={() => setShowAddProject(false)}
                        className="neon-button-secondary"
                        style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="neon-button" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                        <Check size={16} /> Save Project
                      </button>
                    </div>
                  </form>
                )}

                {/* Project List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {projects.map((proj, idx) => (
                    <div
                      key={proj.id || idx}
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '14px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Reorder Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveProject(idx, 'up')}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: idx === 0 ? 'var(--border-subtle)' : 'var(--accent-cyan)',
                              cursor: idx === 0 ? 'not-allowed' : 'pointer',
                              padding: 0,
                            }}
                            title="Move Project Up"
                          >
                            <ArrowUp size={16} />
                          </button>
                          <button
                            type="button"
                            disabled={idx === projects.length - 1}
                            onClick={() => handleMoveProject(idx, 'down')}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: idx === projects.length - 1 ? 'var(--border-subtle)' : 'var(--accent-cyan)',
                              cursor: idx === projects.length - 1 ? 'not-allowed' : 'pointer',
                              padding: 0,
                            }}
                            title="Move Project Down"
                          >
                            <ArrowDown size={16} />
                          </button>
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span className="glass-pill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                              {proj.typeBadge}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
                              {proj.category}
                            </span>
                          </div>
                          <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-main)', fontSize: '1rem' }}>
                            {proj.title}
                          </h5>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEditProjectClick(proj)}
                          className="neon-button-secondary"
                          style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                          title="Edit Project"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#ef4444',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                          title="Delete Project"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: SKILLS MANAGEMENT */}
            {activeTab === 'skills' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '16px' }}>
                  Manage & Reorder Skills Matrix
                </h4>

                {/* Add Skill Form */}
                <form
                  onSubmit={handleAddSkill}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '24px',
                    background: 'var(--bg-subtle)',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <select
                    value={newSkillCategoryIdx}
                    onChange={(e) => setNewSkillCategoryIdx(e.target.value)}
                    style={{ ...inputStyle, width: '220px' }}
                  >
                    {skills.map((cat, idx) => (
                      <option key={idx} value={idx}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Enter skill name (e.g. Next.js, SolidWorks Motion)"
                    style={{ ...inputStyle, flex: 1 }}
                    required
                  />
                  <button type="submit" className="neon-button" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                    <Plus size={15} /> Add Skill
                  </button>
                </form>

                {/* Skill Categories List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {skills.map((cat, catIdx) => (
                    <div
                      key={catIdx}
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                              type="button"
                              disabled={catIdx === 0}
                              onClick={() => handleMoveSkillCategory(catIdx, 'up')}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: catIdx === 0 ? 'var(--border-subtle)' : 'var(--accent-cyan)',
                                cursor: catIdx === 0 ? 'not-allowed' : 'pointer',
                              }}
                              title="Move Category Up"
                            >
                              <ArrowUp size={16} />
                            </button>
                            <button
                              type="button"
                              disabled={catIdx === skills.length - 1}
                              onClick={() => handleMoveSkillCategory(catIdx, 'down')}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: catIdx === skills.length - 1 ? 'var(--border-subtle)' : 'var(--accent-cyan)',
                                cursor: catIdx === skills.length - 1 ? 'not-allowed' : 'pointer',
                              }}
                              title="Move Category Down"
                            >
                              <ArrowDown size={16} />
                            </button>
                          </div>
                          <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>
                            {cat.title}
                          </h5>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>
                          {cat.subtitle}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {cat.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="glass-pill"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
                          >
                            <button
                              type="button"
                              disabled={sIdx === 0}
                              onClick={() => handleMoveSkillItem(catIdx, sIdx, 'left')}
                              style={{ background: 'none', border: 'none', color: 'inherit', cursor: sIdx === 0 ? 'not-allowed' : 'pointer', padding: 0 }}
                              title="Move Skill Left"
                            >
                              <ArrowLeft size={12} />
                            </button>
                            <span>{s}</span>
                            <button
                              type="button"
                              disabled={sIdx === cat.skills.length - 1}
                              onClick={() => handleMoveSkillItem(catIdx, sIdx, 'right')}
                              style={{ background: 'none', border: 'none', color: 'inherit', cursor: sIdx === cat.skills.length - 1 ? 'not-allowed' : 'pointer', padding: 0 }}
                              title="Move Skill Right"
                            >
                              <ArrowRight size={12} />
                            </button>
                            <X
                              size={13}
                              onClick={() => handleDeleteSkill(catIdx, s)}
                              style={{ cursor: 'pointer', color: '#ef4444', marginLeft: '4px' }}
                              title="Delete skill"
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: BIO & TAGLINES MANAGEMENT */}
            {activeTab === 'bio' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-main)' }}>
                  Edit Hero Bio Summary, Status & Key Taglines
                </h4>

                <div>
                  <label style={labelStyle}>NAME & TITLE</label>
                  <input
                    type="text"
                    value={heroInfo.name || 'Dawit Fseha'}
                    onChange={(e) => handleBioChange('name', e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>CYBER STATUS BADGE</label>
                  <input
                    type="text"
                    value={heroInfo.status || 'SENIOR // 4TH YEAR SOFTWARE ENGINEER @ MEKELLE UNIVERSITY'}
                    onChange={(e) => handleBioChange('status', e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>HERO BIO SUMMARY</label>
                  <textarea
                    value={heroInfo.bio || ''}
                    onChange={(e) => handleBioChange('bio', e.target.value)}
                    rows={4}
                    style={inputStyle}
                  />
                </div>

                {/* Key Taglines / Hero Skill Pills */}
                <div>
                  <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)', fontSize: '0.9rem', marginBottom: '10px' }}>
                    Hero Skill Pills & Taglines (Arrange & Reorder)
                  </h5>

                  <form onSubmit={handleAddTagline} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                    <input
                      type="text"
                      value={newTagline}
                      onChange={(e) => setNewTagline(e.target.value)}
                      placeholder="Add new tagline (e.g. Next.js & Cloud Arch)"
                      style={{ ...inputStyle, flex: 1 }}
                      required
                    />
                    <button type="submit" className="neon-button" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                      <Plus size={15} /> Add Tagline
                    </button>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {((heroInfo.taglines) || [
                      { id: 1, label: 'Full Stack Web' },
                      { id: 2, label: 'SolidWorks 3D CAD' },
                      { id: 3, label: 'Photo & Video VFX' },
                      { id: 4, label: 'Fine Art & Illustration' }
                    ]).map((tag, tIdx, arr) => (
                      <div
                        key={tag.id || tIdx}
                        style={{
                          background: 'var(--bg-subtle)',
                          border: '1px solid var(--border-subtle)',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span className="glass-pill" style={{ fontSize: '0.82rem' }}>
                          {tag.label}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            disabled={tIdx === 0}
                            onClick={() => handleMoveTagline(tIdx, 'up')}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: tIdx === 0 ? 'var(--border-subtle)' : 'var(--accent-cyan)',
                              cursor: tIdx === 0 ? 'not-allowed' : 'pointer',
                            }}
                            title="Move Tagline Up"
                          >
                            <ArrowUp size={15} />
                          </button>
                          <button
                            type="button"
                            disabled={tIdx === arr.length - 1}
                            onClick={() => handleMoveTagline(tIdx, 'down')}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: tIdx === arr.length - 1 ? 'var(--border-subtle)' : 'var(--accent-cyan)',
                              cursor: tIdx === arr.length - 1 ? 'not-allowed' : 'pointer',
                            }}
                            title="Move Tagline Down"
                          >
                            <ArrowDown size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTagline(tIdx)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: '6px' }}
                            title="Delete Tagline"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  fontFamily: 'var(--font-code)',
  color: 'var(--text-muted)',
  marginBottom: '4px',
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '6px',
  color: 'var(--text-main)',
  fontFamily: 'var(--font-code)',
  fontSize: '0.85rem',
  outline: 'none',
};
