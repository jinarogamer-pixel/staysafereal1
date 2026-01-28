import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import gsap from 'gsap';

interface ThreeExperienceProps {
  currentSection: string;
}

export const ThreeExperience: React.FC<ThreeExperienceProps> = ({ currentSection }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    springs: any;
    objects: any;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    particles: THREE.Points;
  } | null>(null);

  // Init Scene ONE TIME
  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0F1114');
    scene.fog = new THREE.FogExp2(0x0F1114, 0.02);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(4, 3, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mountRef.current.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 768;
    
    let composer: EffectComposer | null = null;
    if (!isMobile) {
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.85);
        bloomPass.threshold = 0.2;
        bloomPass.strength = 0.4; 
        bloomPass.radius = 0.5;
        composer.addPass(bloomPass);
    }

    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x0F1114, 0.4);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xfffaed, 1);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = isMobile ? 512 : 2048;
    dirLight.shadow.mapSize.height = isMobile ? 512 : 2048;
    scene.add(dirLight);

    // Helpers
    const createNoiseTexture = (size = 512, scale = 1, opacity = 1) => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0,0,size,size);
            for(let i=0; i<5000; i++) {
                ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1 * opacity})`;
                ctx.fillRect(Math.random()*size, Math.random()*size, Math.random()*scale + 1, Math.random()*scale + 1);
            }
        }
        return new THREE.CanvasTexture(canvas);
    };

    const materials = {
        floor: new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.1, metalness: 0.1, normalMap: createNoiseTexture(512, 4, 0.5) }),
        wall: new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8, roughnessMap: createNoiseTexture(512, 2, 0.8) }),
        furniture: new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.6 }),
        metal: new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.2, metalness: 0.8 }),
        accent: new THREE.MeshStandardMaterial({ color: 0x00A896, emissive: 0x002220 }),
        accentGold: new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 0.6 }),
        glow: new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0xffaa00, emissiveIntensity: 2, roughness: 0, transmission: 0.9 })
    };

    const objects: any = {};
    const springs: any = {};
    const roomGroup = new THREE.Group();
    
    // Build Room
    const floor = new THREE.Mesh(new THREE.BoxGeometry(10, 0.2, 10), materials.floor);
    floor.position.y = -0.1; floor.receiveShadow = true; roomGroup.add(floor);
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(10, 6, 0.2), materials.wall);
    backWall.position.set(0, 3, -5); backWall.receiveShadow = true; roomGroup.add(backWall);
    const couch = new THREE.Group();
    couch.add(new THREE.Mesh(new THREE.BoxGeometry(3, 0.5, 1.5), materials.furniture));
    couch.position.set(2, 0.5, -3); roomGroup.add(couch);
    scene.add(roomGroup);

    // Particles (Dust Motes)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xD4AF37, // Gold dust
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Objects with Springs
    const addSpringObject = (name: string, obj: THREE.Object3D, stiffness = 0.1) => {
        obj.visible = false;
        scene.add(obj);
        objects[name] = obj;
        springs[name] = { targetScale: 0, currentScale: 0, velocity: 0, stiffness, damping: 0.8 };
    };

    // Grab Bars
    const bars = new THREE.Group();
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.5), materials.metal);
    bar.rotation.z = Math.PI/2; bar.position.set(0, 1.2, -4.8); bars.add(bar);
    addSpringObject('grabBars', bars);

    // Ramp
    const ramp = new THREE.Mesh(new THREE.BoxGeometry(2, 0.1, 4), materials.accent);
    ramp.rotation.z = 0.1; ramp.position.set(-3.5, 0.2, 0);
    addSpringObject('ramp', ramp);

    // Lights
    const lights = new THREE.Group();
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.2), materials.glow);
    b.position.set(-4.5, 3, 2); lights.add(b);
    addSpringObject('lighting', lights);

    // Surgery
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.8), materials.accentGold);
    seat.position.set(0, 0.6, 2);
    addSpringObject('surgery', seat);

    // How It Works
    const clipboard = new THREE.Group();
    const board = new THREE.Mesh(new THREE.BoxGeometry(1, 1.4, 0.1), materials.accentGold);
    clipboard.add(board);
    clipboard.position.set(0, 2, 0);
    addSpringObject('howItWorks', clipboard);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.enableZoom = false;

    // Store refs for update
    sceneRef.current = { springs, objects, camera, controls, particles };

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (composer) composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
        const delta = clock.getDelta();
        
        // Physics
        Object.keys(springs).forEach(key => {
            const s = springs[key];
            const o = objects[key];
            const force = (s.targetScale - s.currentScale) * s.stiffness;
            s.velocity = (s.velocity + force) * s.damping;
            s.currentScale += s.velocity;
            
            if (o) {
                if (s.currentScale > 0.01) {
                    o.visible = true;
                    o.scale.setScalar(s.currentScale);
                } else {
                    o.visible = false;
                }
            }
        });
        
        // Floating animation for How It Works
        if (springs.howItWorks.targetScale > 0.5) {
            objects.howItWorks.position.y = 2 + Math.sin(clock.elapsedTime * 2) * 0.1;
            objects.howItWorks.rotation.y = Math.sin(clock.elapsedTime) * 0.2;
        }

        // Animate Particles
        if (sceneRef.current?.particles) {
           sceneRef.current.particles.rotation.y = clock.elapsedTime * 0.05;
           sceneRef.current.particles.position.y = Math.sin(clock.elapsedTime * 0.2) * 0.2;
        }

        controls.update();
        if (composer) composer.render();
        else renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        mountRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
    };
  }, []);

  // Update Effect
  useEffect(() => {
    if (!sceneRef.current) return;
    const { springs, camera, controls } = sceneRef.current;
    
    // Reset defaults
    springs.grabBars.targetScale = 0;
    springs.ramp.targetScale = 0;
    springs.lighting.targetScale = 0;
    springs.surgery.targetScale = 0;
    springs.howItWorks.targetScale = 0;
    controls.autoRotateSpeed = 0.5;

    switch (currentSection) {
        case 'hero':
            gsap.to(camera.position, { duration: 1, x: 4, y: 3, z: 6 });
            break;
        case 'philosophy':
            gsap.to(camera.position, { duration: 3, x: 6, y: 4, z: 8 }); // Pull back for big text
            controls.autoRotateSpeed = 0.2; // Slow down
            break;
        case 'fall-prevention':
            springs.grabBars.targetScale = 1;
            gsap.to(camera.position, { duration: 1.5, x: 1, y: 2, z: -2 });
            break;
        case 'mobility':
            springs.ramp.targetScale = 1;
            gsap.to(camera.position, { duration: 1.5, x: -4, y: 1.5, z: 3 });
            break;
        case 'lighting':
            springs.lighting.targetScale = 1;
            gsap.to(camera.position, { duration: 1.5, x: 0, y: 3, z: 5 });
            break;
        case 'surgery':
            springs.surgery.targetScale = 1;
            gsap.to(camera.position, { duration: 1.5, x: 0, y: 1, z: 4 });
            break;
        case 'how-it-works':
            springs.howItWorks.targetScale = 1;
            gsap.to(camera.position, { duration: 1.5, x: 0, y: 2, z: 3 });
            break;
        case 'booking':
            controls.autoRotateSpeed = 2; // Excitement
            gsap.to(camera.position, { duration: 2, x: 5, y: 5, z: 5 });
            break;
        case 'about':
            springs.grabBars.targetScale = 1;
            springs.ramp.targetScale = 1;
            springs.lighting.targetScale = 1;
            springs.surgery.targetScale = 1;
            gsap.to(camera.position, { duration: 2, x: 7, y: 6, z: 7 });
            break;
    }
  }, [currentSection]);

  const isMobile = window.innerWidth < 768;

  return (
    <div 
        ref={mountRef} 
        className="fixed top-0 left-0 w-full h-full z-0" 
        style={{ pointerEvents: isMobile ? 'none' : 'auto' }} 
    />
  );
};