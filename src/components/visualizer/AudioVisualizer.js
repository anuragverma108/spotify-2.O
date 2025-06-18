import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const AudioVisualizer = ({ audioData }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create bars
    const barCount = 32;
    const barGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
    const barMaterial = new THREE.MeshPhongMaterial({
      color: 0x1DB954,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < barCount; i++) {
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.position.x = (i - barCount / 2) * 0.15;
      scene.add(bar);
      barsRef.current.push(bar);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (audioData && barsRef.current.length > 0) {
        barsRef.current.forEach((bar, index) => {
          const dataIndex = Math.floor((index / barCount) * audioData.length);
          const scale = audioData[dataIndex] || 0;
          bar.scale.y = 1 + scale * 2;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-64 bg-black/20 rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default AudioVisualizer; 