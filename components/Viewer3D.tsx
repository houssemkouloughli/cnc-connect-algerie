"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Viewer3DProps {
    fileBuffer: ArrayBuffer | null;
    fileName: string | null;
    geometry: THREE.BufferGeometry | null;
}

export default function Viewer3D({ fileBuffer, fileName, geometry }: Viewer3DProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const frameIdRef = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current || !geometry) return;

        // Initialize Scene
        const init = () => {
            const container = containerRef.current!;
            const width = container.clientWidth;
            const height = container.clientHeight;

            // Scene
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf8f9fa);

            // Grid
            const gridHelper = new THREE.GridHelper(200, 20, 0xe2e8f0, 0xe2e8f0);
            scene.add(gridHelper);

            // Camera
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.set(50, 50, 50);

            // Renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;

            // Clear previous canvas
            container.innerHTML = '';
            container.appendChild(renderer.domElement);

            // Controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 2.0;

            // Lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
            dirLight.position.set(50, 50, 50);
            dirLight.castShadow = true;
            scene.add(dirLight);

            // Material
            const material = new THREE.MeshPhysicalMaterial({
                color: 0x2563eb,
                metalness: 0.2,
                roughness: 0.5,
                clearcoat: 0.1,
                clearcoatRoughness: 0.1,
            });

            // Mesh
            controlsRef.current = controls;

            // Animation Loop
            const animate = () => {
                frameIdRef.current = requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            };
            animate();
        };

        init();

        // Cleanup
        return () => {
            cancelAnimationFrame(frameIdRef.current);
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [geometry]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[400px] bg-slate-50 rounded-xl overflow-hidden shadow-inner" />
    );
}
