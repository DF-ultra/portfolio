export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Mekelle Univ Software Portal',
    category: 'Software Engineering',
    typeBadge: 'landing website',
    iconType: 'Code2',
    description: 'A modern high-performance web platform built for getting detailed information about mekelle university colleges, departments and other relevant information about the university.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://df-ultra.github.io/MU/',
    demo: 'https://df-ultra.github.io/MU/',
    details: 'Built during 3rd year Software Engineering studies at Mekelle University. Features responsive UI and clean navigation.',
    accent: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(59, 130, 246, 0.2))'
  },
  {
    id: 2,
    title: '3D Mechanical Gear Assembly',
    category: 'SolidWorks CAD',
    typeBadge: 'SolidWorks 3D CAD',
    iconType: 'Box',
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
    iconType: 'Video',
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
    iconType: 'Palette',
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
    iconType: 'Box',
    description: 'Low-poly and high-precision mechanical robotic arm joint engineered for 3-axis articulated movement.',
    technologies: ['SolidWorks', 'CAD Drafting', '3D Assembly', 'FEA Analysis'],
    github: 'https://github.com/DF-Ultra',
    demo: 'https://github.com/DF-Ultra',
    details: 'Industrial robot end-effector CAD model designed with custom mounting brackets, servo housing specs, and structural weight optimization.',
    accent: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))'
  },
  {
    id: 6,
    title: 'Interactive 3D Portfolio',
    category: 'Software Engineering',
    typeBadge: 'WebGL Web App',
    iconType: 'Code2',
    description: 'Next-gen cyberpunk interactive portfolio with WebGL Three.js 3D canvas background and dark glassmorphic design.',
    technologies: ['React', 'Three.js', 'Vite', 'CSS3 Variables', 'Lucide Icons'],
    github: 'https://github.com/DF-Ultra',
    demo: 'https://github.com/DF-Ultra',
    details: 'Custom engineered web application featuring mouse-guided 3D WebGL particle fields, interactive CAD visualizer lab, responsive grid systems, and smooth UI animations.',
    accent: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(59, 130, 246, 0.2))'
  }
];

export const INITIAL_SKILLS = [
  {
    id: 1,
    title: 'Software & Web Development',
    subtitle: '4th Year Engineering Core',
    iconType: 'Code2',
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
    id: 2,
    title: 'SolidWorks & 3D CAD',
    subtitle: 'Mechanical & Structural Engineering',
    iconType: 'Box',
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
    id: 3,
    title: 'Photo & Video Editing',
    subtitle: 'Digital Content & Motion VFX',
    iconType: 'Video',
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
    id: 4,
    title: 'Drawing & Digital Art',
    subtitle: 'Visual Aesthetics & Fine Art',
    iconType: 'Palette',
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

export const INITIAL_HERO_INFO = {
  name: 'Dawit Fseha',
  status: 'SENIOR // 4TH YEAR SOFTWARE ENGINEER @ MEKELLE UNIVERSITY',
  bio: "Hi, I'm Dawit Fseha. I merge Software Development with SolidWorks 3D CAD modeling, high-end Photo & Video Editing, and fine Digital Art & Drawing to craft immersive digital & mechanical experiences.",
  taglines: [
    { id: 1, label: 'Full Stack Web', iconType: 'Cpu' },
    { id: 2, label: 'SolidWorks 3D CAD', iconType: 'Box' },
    { id: 3, label: 'Photo & Video VFX', iconType: 'Sparkles' },
    { id: 4, label: 'Fine Art & Illustration', iconType: 'Palette' }
  ]
};
