import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Sun, Eye, Droplet, RefreshCw } from 'lucide-react';

export default function ThreeBottleViewer({
  bottle,
  capColor = '#0B2545',
  brandName = 'HYDRO PURE',
  tagline = '9.5+ pH ALKALINE WATER',
  flavorNote = 'ELECTROLYTE IONIZED',
  printMaterialId = 'soft-touch-matte',
  formulaColor = '#00B4D8'
}) {
  const containerRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingPreset, setLightingPreset] = useState('studio');
  const [showDroplets, setShowDroplets] = useState(false);
  const [activeViewAngle, setActiveViewAngle] = useState('front');

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const bottleGroupRef = useRef(null);
  const labelMeshRef = useRef(null);
  const capMeshRef = useRef(null);
  const liquidMeshRef = useRef(null);
  const dropletsGroupRef = useRef(null);
  const lightsRef = useRef({});

  // Generate dynamic 2048x1024 high-res canvas label texture
  const createLabelTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;

    // Label background based on finish
    const isFoil = printMaterialId === 'metallic-foil-hologram';
    const isMatte = printMaterialId === 'soft-touch-matte';
    const isGloss = printMaterialId === 'ultra-gloss-uv';
    const isClear = printMaterialId === 'transparent-no-label';
    const isSpotUV = printMaterialId === 'spot-tactile-varnish';
    const isKraft = printMaterialId === 'kraft-textured';

    if (isClear) {
      ctx.clearRect(0, 0, w, h);
    } else if (isFoil) {
      // Shimmering cold foil metallic gradient
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#071A2F');
      g.addColorStop(0.2, '#0077B6');
      g.addColorStop(0.38, '#00F0FF');
      g.addColorStop(0.5, '#E0F2FE');
      g.addColorStop(0.62, '#00F0FF');
      g.addColorStop(0.8, '#0077B6');
      g.addColorStop(1, '#071A2F');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Micro prism holographic flecks
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let i = 0; i < 300; i++) {
        const px = Math.random() * w;
        const py = Math.random() * h;
        const ps = Math.random() * 3 + 1;
        ctx.fillRect(px, py, ps, ps);
      }
    } else if (isKraft) {
      // Natural organic kraft paper
      ctx.fillStyle = '#D97706';
      ctx.fillRect(0, 0, w, h);
      // Organic fiber speckles
      ctx.fillStyle = 'rgba(120, 53, 15, 0.12)';
      for (let i = 0; i < 500; i++) {
        const px = Math.random() * w;
        const py = Math.random() * h;
        const pw = Math.random() * 8 + 2;
        const ph = Math.random() * 2 + 1;
        ctx.fillRect(px, py, pw, ph);
      }
    } else if (isSpotUV) {
      // Velvet matte background with raised tactile UV gloss badge
      ctx.fillStyle = '#061628';
      ctx.fillRect(0, 0, w, h);
      // Subtle tactile droplet pattern
      ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
      for (let x = 60; x < w - 60; x += 80) {
        for (let y = 60; y < h - 60; y += 80) {
          ctx.beginPath();
          ctx.arc(x + (y % 160 === 0 ? 40 : 0), y, 14, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (isGloss) {
      // Ultra high gloss lacquer
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, '#0B2545');
      g.addColorStop(0.5, '#023E8A');
      g.addColorStop(1, '#001833');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Bright gloss shine reflection streak
      const shine = ctx.createLinearGradient(0, 0, w, 0);
      shine.addColorStop(0.2, 'transparent');
      shine.addColorStop(0.35, 'rgba(255, 255, 255, 0.22)');
      shine.addColorStop(0.4, 'rgba(255, 255, 255, 0.45)');
      shine.addColorStop(0.45, 'rgba(255, 255, 255, 0.22)');
      shine.addColorStop(0.6, 'transparent');
      ctx.fillStyle = shine;
      ctx.fillRect(0, 0, w, h);
    } else {
      // Soft-touch velvet matte
      ctx.fillStyle = '#071A2F';
      ctx.fillRect(0, 0, w, h);
    }

    // Label border trim & accents
    if (!isClear) {
      ctx.strokeStyle = isFoil ? '#00F0FF' : isKraft ? '#78350F' : 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 14;
      ctx.strokeRect(36, 36, w - 72, h - 72);

      // Accent colored stripe
      ctx.fillStyle = formulaColor || '#00F0FF';
      ctx.fillRect(60, 80, w - 120, 24);

      // Finish badge stamp
      ctx.fillStyle = isFoil ? 'rgba(0, 240, 255, 0.25)' : 'rgba(255, 255, 255, 0.12)';
      ctx.fillRect(w - 380, 130, 320, 50);
      ctx.font = 'bold 24px "JetBrains Mono", monospace';
      ctx.fillStyle = isFoil ? '#00F0FF' : '#E2E8F0';
      ctx.fillText(printMaterialId.toUpperCase().replace(/-/g, ' '), w - 220, 164);
    }

    // Brand Copy Center Alignment
    ctx.save();
    ctx.textAlign = 'center';

    // 1. Primary Brand Header
    ctx.font = 'bold 120px "Space Grotesk", sans-serif';
    ctx.fillStyle = isKraft ? '#FFFFFF' : '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 24;
    ctx.fillText((brandName || 'CLEAN BOTTLING').toUpperCase(), w / 2, 350);

    // 2. Subtitle Tagline
    ctx.font = 'bold 56px "JetBrains Mono", monospace';
    ctx.fillStyle = isFoil ? '#00F0FF' : isKraft ? '#FEF3C7' : '#00B4D8';
    ctx.fillText((tagline || 'PREMIUM HYDRATION').toUpperCase(), w / 2, 480);

    // 3. Chemistry / Flavor spec
    ctx.font = '600 44px "JetBrains Mono", monospace';
    ctx.fillStyle = isKraft ? '#FDE68A' : '#CBD5E1';
    ctx.fillText((flavorNote || 'MOLECULAR IONIZED').toUpperCase(), w / 2, 590);

    // 4. Capacity & Standards
    ctx.font = '500 36px "JetBrains Mono", monospace';
    ctx.fillStyle = isKraft ? '#F59E0B' : '#94A3B8';
    ctx.fillText(`${bottle.capacity?.toUpperCase()} • SQF LEVEL 3 CERTIFIED • cGMP 21 CFR 117`, w / 2, 730);

    // 5. Barcode & Certification Stamps
    const barW = 420;
    const barH = 80;
    const barX = w / 2 - barW / 2;
    const barY = 820;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(barX - 12, barY - 12, barW + 24, barH + 24);
    ctx.fillStyle = '#0F172A';
    for (let x = barX; x < barX + barW; x += 10) {
      if (Math.random() > 0.28) {
        ctx.fillRect(x, barY, 6, barH);
      }
    }

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  };

  // Create Ground Shadow Disc Texture
  const createShadowTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 240);
    grad.addColorStop(0, 'rgba(11, 37, 69, 0.45)');
    grad.addColorStop(0.4, 'rgba(11, 37, 69, 0.2)');
    grad.addColorStop(0.8, 'rgba(11, 37, 69, 0.05)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // Build Procedural 3D Bottle Geometry based on category
  const buildBottle3D = (scene) => {
    if (bottleGroupRef.current) {
      scene.remove(bottleGroupRef.current);
    }

    const group = new THREE.Group();
    bottleGroupRef.current = group;

    const isCan = bottle.category === 'aluminum-can';
    const isGlass = bottle.category === 'glass';
    const isRpet = bottle.category === 'rpet';
    const isAluminumBottle = bottle.category === 'aluminum-bottle';

    const labelTexture = createLabelTexture();

    // Material roughness/metalness parameters based on active print substrate
    let labelRoughness = 0.2;
    let labelMetalness = 0.05;
    let labelClearcoat = 0.0;

    if (printMaterialId === 'soft-touch-matte') {
      labelRoughness = 0.75;
      labelMetalness = 0.02;
    } else if (printMaterialId === 'ultra-gloss-uv') {
      labelRoughness = 0.06;
      labelMetalness = 0.15;
      labelClearcoat = 1.0;
    } else if (printMaterialId === 'metallic-foil-hologram') {
      labelRoughness = 0.12;
      labelMetalness = 0.88;
      labelClearcoat = 0.8;
    } else if (printMaterialId === 'kraft-textured') {
      labelRoughness = 0.9;
      labelMetalness = 0.0;
    } else if (printMaterialId === 'spot-tactile-varnish') {
      labelRoughness = 0.35;
      labelMetalness = 0.2;
      labelClearcoat = 0.9;
    }

    // 1. MAIN CONTAINER BODY
    if (isCan) {
      // Sleek Can Geometry
      const canRadius = 1.1;
      const canHeight = bottle.capacity?.includes('473ml') ? 4.2 : 3.6;

      // Body Cylinder
      const bodyGeo = new THREE.CylinderGeometry(canRadius, canRadius, canHeight, 64, 1, true);
      const canMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: isCan ? 0.85 : labelMetalness,
        roughness: labelRoughness,
        clearcoat: labelClearcoat,
        clearcoatRoughness: 0.1,
        map: labelTexture
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, canMat);
      group.add(bodyMesh);
      labelMeshRef.current = bodyMesh;

      // Top Neck-in Cone
      const neckGeo = new THREE.CylinderGeometry(canRadius * 0.88, canRadius, 0.4, 64);
      const metalMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.95,
        roughness: 0.15
      });
      const neckMesh = new THREE.Mesh(neckGeo, metalMat);
      neckMesh.position.y = canHeight / 2 + 0.2;
      group.add(neckMesh);

      // Top Lid Disk
      const lidGeo = new THREE.CylinderGeometry(canRadius * 0.86, canRadius * 0.86, 0.05, 64);
      const lidMesh = new THREE.Mesh(lidGeo, metalMat);
      lidMesh.position.y = canHeight / 2 + 0.42;
      group.add(lidMesh);

      // Rim Bevel Collar
      const rimGeo = new THREE.TorusGeometry(canRadius * 0.87, 0.04, 16, 64);
      rimGeo.rotateX(Math.PI / 2);
      const rimMesh = new THREE.Mesh(rimGeo, metalMat);
      rimMesh.position.y = canHeight / 2 + 0.44;
      group.add(rimMesh);

      // Stay-on Tab
      const tabGeo = new THREE.BoxGeometry(0.32, 0.04, 0.65);
      const tabMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(capColor),
        metalness: 0.9,
        roughness: 0.18
      });
      const tabMesh = new THREE.Mesh(tabGeo, tabMat);
      tabMesh.position.set(0, canHeight / 2 + 0.47, 0.2);
      group.add(tabMesh);
      capMeshRef.current = tabMesh;

      // Tab Center Rivet
      const rivetGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.06, 16);
      const rivetMesh = new THREE.Mesh(rivetGeo, metalMat);
      rivetMesh.position.set(0, canHeight / 2 + 0.48, 0);
      group.add(rivetMesh);

      // Bottom Chime Cone
      const bottomGeo = new THREE.CylinderGeometry(canRadius, canRadius * 0.85, 0.35, 64);
      const bottomMesh = new THREE.Mesh(bottomGeo, metalMat);
      bottomMesh.position.y = -canHeight / 2 - 0.175;
      group.add(bottomMesh);

    } else if (isGlass) {
      // Luxury Flint Glass Bottle
      const bottleRadius = bottle.capacity?.includes('750ml') ? 1.25 : 1.05;
      const bottleHeight = bottle.capacity?.includes('750ml') ? 4.6 : 3.8;

      // Outer Glass Physical Material (Transparent, high refractive realism)
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.96,
        opacity: 1,
        transparent: true,
        roughness: 0.03,
        ior: 1.52,
        thickness: 0.9,
        specularIntensity: 1.0,
        specularColor: 0xffffff,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02
      });

      // Glass Body Cylinder
      const bodyGeo = new THREE.CylinderGeometry(bottleRadius, bottleRadius, bottleHeight * 0.55, 64);
      const bodyMesh = new THREE.Mesh(bodyGeo, glassMat);
      bodyMesh.position.y = -bottleHeight * 0.1;
      group.add(bodyMesh);

      // Heavy Base Glass Layer (Punt Base)
      const baseGeo = new THREE.CylinderGeometry(bottleRadius, bottleRadius * 0.96, 0.65, 64);
      const baseMesh = new THREE.Mesh(baseGeo, glassMat);
      baseMesh.position.y = -bottleHeight * 0.1 - (bottleHeight * 0.55) / 2 - 0.325;
      group.add(baseMesh);

      // Curved Tapered Shoulder
      const shoulderGeo = new THREE.CylinderGeometry(bottleRadius * 0.42, bottleRadius, bottleHeight * 0.28, 64);
      const shoulderMesh = new THREE.Mesh(shoulderGeo, glassMat);
      shoulderMesh.position.y = -bottleHeight * 0.1 + (bottleHeight * 0.55) / 2 + (bottleHeight * 0.28) / 2;
      group.add(shoulderMesh);

      // Neck
      const neckGeo = new THREE.CylinderGeometry(bottleRadius * 0.38, bottleRadius * 0.42, bottleHeight * 0.22, 64);
      const neckMesh = new THREE.Mesh(neckGeo, glassMat);
      neckMesh.position.y = shoulderMesh.position.y + (bottleHeight * 0.28) / 2 + (bottleHeight * 0.22) / 2;
      group.add(neckMesh);

      // Glass Neck Collar Ring
      const collarGeo = new THREE.TorusGeometry(bottleRadius * 0.41, 0.05, 16, 48);
      collarGeo.rotateX(Math.PI / 2);
      const collarMesh = new THREE.Mesh(collarGeo, glassMat);
      collarMesh.position.y = neckMesh.position.y + (bottleHeight * 0.22) / 2 - 0.08;
      group.add(collarMesh);

      // Inner Liquid Column with Refraction
      const liquidGeo = new THREE.CylinderGeometry(bottleRadius * 0.88, bottleRadius * 0.88, bottleHeight * 0.65, 32);
      const liquidMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(formulaColor || 0x00B4D8),
        transmission: 0.92,
        transparent: true,
        opacity: 0.85,
        roughness: 0.04,
        ior: 1.333
      });
      const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
      liquidMesh.position.y = -bottleHeight * 0.12;
      group.add(liquidMesh);
      liquidMeshRef.current = liquidMesh;

      // Label Band on Front
      const labelGeo = new THREE.CylinderGeometry(bottleRadius + 0.018, bottleRadius + 0.018, bottleHeight * 0.35, 64, 1, true, -Math.PI * 0.42, Math.PI * 0.84);
      const labelMat = new THREE.MeshPhysicalMaterial({
        map: labelTexture,
        transparent: true,
        side: THREE.DoubleSide,
        roughness: labelRoughness,
        metalness: labelMetalness,
        clearcoat: labelClearcoat,
        clearcoatRoughness: 0.1
      });
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -bottleHeight * 0.08;
      group.add(labelMesh);
      labelMeshRef.current = labelMesh;

      // Luxury Cap / Closure
      const capGeo = new THREE.CylinderGeometry(bottleRadius * 0.42, bottleRadius * 0.42, 0.48, 32);
      const capMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(capColor),
        metalness: 0.85,
        roughness: 0.18
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.y = neckMesh.position.y + (bottleHeight * 0.22) / 2 + 0.24;
      group.add(capMesh);
      capMeshRef.current = capMesh;

    } else {
      // Sleek Aluminum / Eco rPET Bottle
      const bottleRadius = 1.08;
      const bottleHeight = bottle.capacity?.includes('750ml') ? 4.8 : 4.0;

      const containerMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: isAluminumBottle ? 0.92 : 0.05,
        roughness: isAluminumBottle ? (printMaterialId === 'soft-touch-matte' ? 0.55 : 0.12) : 0.05,
        clearcoat: isRpet ? 1.0 : labelClearcoat,
        clearcoatRoughness: 0.05,
        map: labelTexture
      });

      // Body
      const bodyGeo = new THREE.CylinderGeometry(bottleRadius, bottleRadius, bottleHeight * 0.58, 64);
      const bodyMesh = new THREE.Mesh(bodyGeo, containerMat);
      bodyMesh.position.y = -bottleHeight * 0.08;
      group.add(bodyMesh);
      labelMeshRef.current = bodyMesh;

      // rPET Grip Rib Rings (if rPET)
      if (isRpet) {
        for (let i = -1; i <= 1; i++) {
          const ribGeo = new THREE.TorusGeometry(bottleRadius + 0.01, 0.03, 16, 48);
          ribGeo.rotateX(Math.PI / 2);
          const ribMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2 });
          const ribMesh = new THREE.Mesh(ribGeo, ribMat);
          ribMesh.position.y = -bottleHeight * 0.08 + i * 0.7;
          group.add(ribMesh);
        }
      }

      // Conical Tapered Shoulder
      const shoulderGeo = new THREE.CylinderGeometry(bottleRadius * 0.4, bottleRadius, bottleHeight * 0.26, 64);
      const shoulderMat = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        metalness: isAluminumBottle ? 0.95 : 0.15,
        roughness: 0.18
      });
      const shoulderMesh = new THREE.Mesh(shoulderGeo, shoulderMat);
      shoulderMesh.position.y = -bottleHeight * 0.08 + (bottleHeight * 0.58) / 2 + (bottleHeight * 0.26) / 2;
      group.add(shoulderMesh);

      // Threaded Neck
      const neckGeo = new THREE.CylinderGeometry(bottleRadius * 0.38, bottleRadius * 0.4, 0.35, 32);
      const neckMesh = new THREE.Mesh(neckGeo, shoulderMat);
      neckMesh.position.y = shoulderMesh.position.y + (bottleHeight * 0.26) / 2 + 0.175;
      group.add(neckMesh);

      // ROPP Aluminum Screw Cap with knurling & tamper band
      const capGeo = new THREE.CylinderGeometry(bottleRadius * 0.42, bottleRadius * 0.42, 0.5, 32);
      const capMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(capColor),
        metalness: 0.9,
        roughness: 0.2
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.y = neckMesh.position.y + 0.175 + 0.25;
      group.add(capMesh);
      capMeshRef.current = capMesh;

      // Tamper Evident Ring
      const tamperGeo = new THREE.TorusGeometry(bottleRadius * 0.425, 0.03, 16, 32);
      tamperGeo.rotateX(Math.PI / 2);
      const tamperMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
      const tamperMesh = new THREE.Mesh(tamperGeo, tamperMat);
      tamperMesh.position.y = neckMesh.position.y + 0.175 + 0.05;
      group.add(tamperMesh);

      // Bottom Base Cone
      const baseGeo = new THREE.CylinderGeometry(bottleRadius, bottleRadius * 0.92, 0.25, 64);
      const baseMesh = new THREE.Mesh(baseGeo, shoulderMat);
      baseMesh.position.y = -bottleHeight * 0.08 - (bottleHeight * 0.58) / 2 - 0.125;
      group.add(baseMesh);
    }

    // Realistic Contact Shadow Plane Beneath Container
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createShadowTexture(),
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -2.7;
    group.add(shadowMesh);

    // Droplets Group (if enabled)
    const dropletsGroup = new THREE.Group();
    dropletsGroupRef.current = dropletsGroup;
    if (showDroplets) {
      const dropGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const dropMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.95,
        transparent: true,
        roughness: 0.02,
        ior: 1.33
      });
      for (let i = 0; i < 60; i++) {
        const drop = new THREE.Mesh(dropGeo, dropMat);
        const theta = Math.random() * Math.PI * 2;
        const rad = 1.12;
        const y = (Math.random() - 0.5) * 3.0;
        drop.position.set(Math.cos(theta) * rad, y, Math.sin(theta) * rad);
        drop.scale.set(1 + Math.random(), 1 + Math.random() * 2, 0.6);
        dropletsGroup.add(drop);
      }
    }
    group.add(dropletsGroup);

    scene.add(group);
  };

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer with high-DPI antialiasing and tone mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio 3-Point Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00b4d8, 1.0);
    fillLight.position.set(-6, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 2.8);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    const bottomReflect = new THREE.DirectionalLight(0xffffff, 0.6);
    bottomReflect.position.set(0, -5, 4);
    scene.add(bottomReflect);

    lightsRef.current = { ambientLight, keyLight, fillLight, rimLight };

    // Build 3D Container
    buildBottle3D(scene);

    // Interactive Drag Orbit Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging || !bottleGroupRef.current) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      bottleGroupRef.current.rotation.y += deltaX * 0.008;
      bottleGroupRef.current.rotation.x = Math.max(-0.35, Math.min(0.35, bottleGroupRef.current.rotation.x + deltaY * 0.005));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => { isDragging = false; };

    // Touch support
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || !bottleGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;
      bottleGroupRef.current.rotation.y += deltaX * 0.008;
      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { isDragging = false; };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart);
    dom.addEventListener('touchmove', onTouchMove);
    dom.addEventListener('touchend', onTouchEnd);

    // Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging && bottleGroupRef.current) {
        bottleGroupRef.current.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, [bottle.id, capColor, brandName, tagline, flavorNote, printMaterialId, formulaColor, showDroplets]);

  // Handle Preset Lighting Mode
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights.keyLight) return;
    if (lightingPreset === 'dramatic') {
      lights.keyLight.intensity = 1.0;
      lights.rimLight.intensity = 4.5;
      lights.fillLight.intensity = 0.4;
    } else if (lightingPreset === 'warm') {
      lights.keyLight.color.setHex(0xfff1e6);
      lights.keyLight.intensity = 2.4;
      lights.fillLight.color.setHex(0xfcd34d);
    } else {
      lights.keyLight.color.setHex(0xffffff);
      lights.keyLight.intensity = 2.2;
      lights.fillLight.color.setHex(0x00b4d8);
      lights.rimLight.intensity = 2.8;
    }
  }, [lightingPreset]);

  // Reset Angle
  const resetView = () => {
    if (bottleGroupRef.current) {
      bottleGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      
      {/* 3D Canvas Viewport */}
      <div className="relative w-full h-[460px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-100/60 border border-slate-200 shadow-inner flex items-center justify-center">
        
        {/* Interactive 3D WebGL Canvas */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating 3D HUD Controls */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10 font-mono text-[11px]">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-brand-blue font-bold shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            3D PBR WebGL Engine
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-600 font-semibold border border-slate-200">
            {bottle.capacity}
          </span>
        </div>

        {/* Rotation & Angle Toggles */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
          
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 backdrop-blur-md shadow-sm ${
                autoRotate ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
              }`}
              title="Toggle 360° Turntable Rotation"
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{autoRotate ? '360° Spin' : 'Paused'}</span>
            </button>

            <button
              onClick={resetView}
              className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200 text-xs font-mono transition-all backdrop-blur-md shadow-sm"
              title="Reset View Orientation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setShowDroplets(!showDroplets)}
              className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 backdrop-blur-md shadow-sm ${
                showDroplets ? 'bg-sky-500 text-white border-sky-600' : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
              }`}
              title="Toggle Condensation Droplets"
            >
              <Droplet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chilled Frost</span>
            </button>

            <div className="bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 flex items-center gap-1 shadow-sm">
              <button
                onClick={() => setLightingPreset('studio')}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold ${
                  lightingPreset === 'studio' ? 'bg-brand-navy text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Studio
              </button>
              <button
                onClick={() => setLightingPreset('dramatic')}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold ${
                  lightingPreset === 'dramatic' ? 'bg-brand-navy text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rim
              </button>
            </div>
          </div>

        </div>

      </div>

      <div className="w-full pt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>💡 Click and drag to inspect 360° container curvature</span>
        <span className="text-brand-blue font-bold">{bottle.material}</span>
      </div>

    </div>
  );
}
