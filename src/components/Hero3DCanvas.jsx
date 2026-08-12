import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.015);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 12;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00e5ff, 2, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2, 20);
    pointLight2.position.set(-4, -4, 2);
    scene.add(pointLight2);

    // Central 3D Low-Poly Mechanical CAD Wireframe Core
    const group = new THREE.Group();

    // 1. Outer Icosahedron Wireframe (Mechanical Cage)
    const icoGeometry = new THREE.IcosahedronGeometry(2.4, 1);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      wireframe: true,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.8
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    group.add(icoMesh);

    // 2. Inner Solid Octahedron CAD Core
    const coreGeometry = new THREE.OctahedronGeometry(1.4, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.4
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // 3. Orbital Wireframe Gear Rings (Engineering Motif)
    const gearGeometry1 = new THREE.TorusGeometry(3.2, 0.04, 16, 60);
    const gearMaterial1 = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true
    });
    const gearMesh1 = new THREE.Mesh(gearGeometry1, gearMaterial1);
    gearMesh1.rotation.x = Math.PI / 3;
    group.add(gearMesh1);

    const gearGeometry2 = new THREE.TorusGeometry(3.7, 0.03, 16, 60);
    const gearMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true
    });
    const gearMesh2 = new THREE.Mesh(gearGeometry2, gearMaterial2);
    gearMesh2.rotation.y = Math.PI / 4;
    group.add(gearMesh2);

    // 4. Background Node Plexus Particles
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.6
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    scene.add(group);

    // Scroll Interaction
    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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
    let autoRotation = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth scroll tracking
      scrollY += (targetScrollY - scrollY) * 0.08;
      autoRotation += 0.003;

      // Ensure 3D object group stays strictly anchored in screen center
      group.position.set(0, 0, 0);

      // Dynamic rotation driven by auto-spin and scroll position
      group.rotation.y = autoRotation + (scrollY * 0.0025);
      group.rotation.x = Math.sin(scrollY * 0.001) * 0.3;
      group.rotation.z = Math.sin(autoRotation * 0.5) * 0.1 + (scrollY * 0.001);

      // Orbital Gear Rings respond dynamically to scroll depth
      gearMesh1.rotation.z = autoRotation * 2 + (scrollY * 0.004);
      gearMesh2.rotation.z = -autoRotation * 1.5 - (scrollY * 0.003);

      // Node Plexus Particle rotation
      particlesMesh.rotation.y = -autoRotation * 0.2 - (scrollY * 0.0008);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
