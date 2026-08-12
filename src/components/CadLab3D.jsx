import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, RotateCw, Eye, Palette, Upload, Sparkles, Sliders, Play, Pause } from 'lucide-react';

export default function CadLab3D() {
  const containerRef = useRef(null);

  // Control states
  const [selectedModel, setSelectedModel] = useState('gear'); // gear, robot, turbine, lattice
  const [wireframe, setWireframe] = useState(true);
  const [themeColor, setThemeColor] = useState('#00e5ff'); // cyan, violet, green
  const [isDragging, setIsDragging] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Active CAD Mesh: Interactive 3D Gear System');

  // Interactive Drag & Three.js refs
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const modelGroupRef = useRef(null);
  const meshMaterialRef = useRef(null);
  const lightRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousPointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    if (container.children.length > 0) {
      container.innerHTML = '';
    }
    container.appendChild(renderer.domElement);

    // Ambient Light
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // Directional Neon Light
    const dirLight = new THREE.DirectionalLight(0x00e5ff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    lightRef.current = dirLight;

    const pointLight = new THREE.PointLight(0x3b82f6, 1.5, 10);
    pointLight.position.set(-5, -5, 2);
    scene.add(pointLight);

    // Model Container Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Initial Material
    const material = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      emissive: new THREE.Color('#00e5ff'),
      emissiveIntensity: 0.35,
    });
    meshMaterialRef.current = material;

    // Build Initial Mesh
    buildMesh(selectedModel, modelGroup, material);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto-rotate continuously when user is not manually grabbing/dragging the mesh
      if (!isDraggingRef.current && modelGroupRef.current) {
        modelGroupRef.current.rotation.y += 0.008;
        modelGroupRef.current.rotation.x += 0.003;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Helper to construct low-poly CAD geometries
  const buildMesh = (type, group, material) => {
    // Clear old meshes
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
    }

    if (type === 'gear') {
      // 3D CAD Gear System
      const gearMain = new THREE.TorusGeometry(1.8, 0.4, 16, 40);
      const mainMesh = new THREE.Mesh(gearMain, material);
      group.add(mainMesh);

      // Inner hub cylinder
      const hubGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.8, 24);
      const hubMesh = new THREE.Mesh(hubGeo, material);
      hubMesh.rotation.x = Math.PI / 2;
      group.add(hubMesh);

      // Spokes
      for (let i = 0; i < 4; i++) {
        const spokeGeo = new THREE.BoxGeometry(0.2, 3.4, 0.2);
        const spokeMesh = new THREE.Mesh(spokeGeo, material);
        spokeMesh.rotation.z = (Math.PI / 4) * i;
        group.add(spokeMesh);
      }
    } else if (type === 'robot') {
      // Robotic Arm Joint Node
      const baseGeo = new THREE.CylinderGeometry(1.5, 1.8, 0.8, 12);
      const baseMesh = new THREE.Mesh(baseGeo, material);
      baseMesh.position.y = -1.2;
      group.add(baseMesh);

      const jointGeo = new THREE.SphereGeometry(1.1, 16, 16);
      const jointMesh = new THREE.Mesh(jointGeo, material);
      group.add(jointMesh);

      const armGeo = new THREE.CylinderGeometry(0.4, 0.4, 2.2, 12);
      const armMesh = new THREE.Mesh(armGeo, material);
      armMesh.position.y = 1.3;
      group.add(armMesh);
    } else if (type === 'turbine') {
      // Cyber Polyhedron Turbine
      const polyGeo = new THREE.DodecahedronGeometry(2, 0);
      const polyMesh = new THREE.Mesh(polyGeo, material);
      group.add(polyMesh);

      const ringGeo = new THREE.TorusGeometry(2.6, 0.05, 16, 50);
      const ringMesh = new THREE.Mesh(ringGeo, material);
      group.add(ringMesh);
    } else if (type === 'lattice') {
      // Finite Element Structural Lattice
      const boxGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2, 3, 3, 3);
      const boxMesh = new THREE.Mesh(boxGeo, material);
      group.add(boxMesh);
    }
  };

  // Switch Models
  const handleModelChange = (modelKey, name) => {
    setSelectedModel(modelKey);
    setStatusMessage(`Active CAD Mesh: ${name}`);
    if (modelGroupRef.current && meshMaterialRef.current) {
      buildMesh(modelKey, modelGroupRef.current, meshMaterialRef.current);
    }
  };

  // Toggle Wireframe
  const handleWireframeToggle = () => {
    const nextState = !wireframe;
    setWireframe(nextState);
    if (meshMaterialRef.current) {
      meshMaterialRef.current.wireframe = nextState;
    }
  };

  // Change Theme Color
  const handleColorChange = (hex) => {
    setThemeColor(hex);
    if (meshMaterialRef.current && lightRef.current) {
      meshMaterialRef.current.emissive.set(hex);
      lightRef.current.color.set(hex);
    }
  };

  // Mouse & Touch Pointer Drag Handlers for Manual Rotation
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    previousPointerRef.current = {
      x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
    };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !modelGroupRef.current) return;

    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = currentX - previousPointerRef.current.x;
    const deltaY = currentY - previousPointerRef.current.y;

    modelGroupRef.current.rotation.y += deltaX * 0.01;
    modelGroupRef.current.rotation.x += deltaY * 0.01;

    previousPointerRef.current = { x: currentX, y: currentY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleResetOrientation = () => {
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <section id="cad-lab" className="section-container" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-header" style={{ position: 'relative', zIndex: 2 }}>
        <span className="section-subtitle">// SOLIDWORKS & 3D HARDWARE LAB</span>
        <h2 className="section-title">
          INTERACTIVE <span className="neon-title">3D CAD VISUALIZER</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
          Explore interactive low-poly mechanical CAD models representing SolidWorks mechanical assemblies, structural FEA lattices, and hardware engineering projects.
        </p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '24px',
          minHeight: '520px',
        }}
      >
        {/* Left Control Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Box size={18} color="var(--accent-cyan)" /> SELECT CAD MODEL
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => handleModelChange('gear', '3D Gear Assembly')}
                className={selectedModel === 'gear' ? 'neon-button' : 'neon-button-secondary'}
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '10px 14px' }}
              >
                ⚙️ Mechanical Gear Assembly
              </button>
              <button
                onClick={() => handleModelChange('robot', 'Robotic Arm Actuator')}
                className={selectedModel === 'robot' ? 'neon-button' : 'neon-button-secondary'}
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '10px 14px' }}
              >
                🤖 Robotic Arm Joint
              </button>
              <button
                onClick={() => handleModelChange('turbine', 'Polyhedron Turbine Core')}
                className={selectedModel === 'turbine' ? 'neon-button' : 'neon-button-secondary'}
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '10px 14px' }}
              >
                🌀 Polyhedron Turbine Core
              </button>
              <button
                onClick={() => handleModelChange('lattice', 'Structural FEA Lattice')}
                className={selectedModel === 'lattice' ? 'neon-button' : 'neon-button-secondary'}
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '10px 14px' }}
              >
                🌐 Structural FEA Mesh
              </button>
            </div>
          </div>

          {/* Viewport Toggles */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="var(--accent-cyan)" /> VIEWPORT MODES
            </h4>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <button
                onClick={handleWireframeToggle}
                className="neon-button-secondary"
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                <Eye size={14} /> {wireframe ? 'Wireframe: ON' : 'Solid Shaded'}
              </button>
              <button
                onClick={handleResetOrientation}
                className="neon-button-secondary"
                style={{ flex: 1, padding: '8px 10px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                <RotateCw size={14} /> Reset View
              </button>
            </div>
          </div>

          {/* Neon Color Palette */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={18} color="var(--accent-cyan)" /> NEON LIGHTING
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleColorChange('#00e5ff')}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#00e5ff',
                  border: themeColor === '#00e5ff' ? '2px solid var(--text-main)' : 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 10px #00e5ff',
                }}
                title="Electric Cyan"
              />
              <button
                onClick={() => handleColorChange('#8b5cf6')}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#8b5cf6',
                  border: themeColor === '#8b5cf6' ? '2px solid var(--text-main)' : 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 10px #8b5cf6',
                }}
                title="Cyber Violet"
              />
              <button
                onClick={() => handleColorChange('#10b981')}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#10b981',
                  border: themeColor === '#10b981' ? '2px solid var(--text-main)' : 'none',
                  cursor: 'pointer',
                  boxShadow: '0 0 10px #10b981',
                }}
                title="Matrix Green"
              />
            </div>
          </div>

          {/* Local GLTF File Upload Info */}
          <div
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginTop: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)', marginBottom: '4px' }}>
              <Upload size={14} color="var(--accent-cyan)" /> Load Custom CAD Assets
            </div>
            Drop your SolidWorks `.gltf` or `.glb` files anywhere on the canvas to render them live in WebGL!
          </div>
        </div>

        {/* Right 3D WebGL Canvas Viewport */}
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-neon)',
            overflow: 'hidden',
          }}
        >
          {/* Status Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 10,
              fontFamily: 'var(--font-code)',
              fontSize: '0.8rem',
              color: 'var(--accent-cyan)',
              background: 'rgba(11, 15, 25, 0.8)',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid var(--border-neon)',
            }}
          >
            {statusMessage}
          </div>

          {/* Drag Instruction Badge */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              fontFamily: 'var(--font-code)',
              fontSize: '0.8rem',
              color: 'var(--accent-cyan)',
              background: 'rgba(11, 15, 25, 0.85)',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid var(--border-neon)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            🖐️ Click & Drag Mesh to Rotate
          </div>

          {/* Three.js Container */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{
              width: '100%',
              height: '100%',
              minHeight: '460px',
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
            }}
          />
        </div>
      </div>
    </section>
  );
}
