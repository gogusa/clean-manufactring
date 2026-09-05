import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Box, Sparkles, RefreshCw, Eye } from 'lucide-react';

export default function ThreeCaseViewer({
  caseFormat,
  boxMaterial,
  caseBrandText = 'HYDRO PURE 12-PACK',
  bottleCapacity = '500ml'
}) {
  const containerRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const caseGroupRef = useRef(null);

  // Generate 1024x1024 Box Face Texture
  const createBoxTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const isKraft = boxMaterial.id === 'natural-kraft';
    const isWhite = boxMaterial.id === 'white-bleached';

    // Base Box Background
    if (isKraft) {
      ctx.fillStyle = '#D97706';
      ctx.fillRect(0, 0, w, h);
      // Faint corrugated line pattern
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      for (let y = 0; y < h; y += 8) {
        ctx.fillRect(0, y, w, 3);
      }
    } else if (isWhite) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = '#0B2545';
      ctx.fillRect(0, 0, w, h);
    }

    // Box Frame Border
    ctx.strokeStyle = (isKraft || isWhite) ? '#0B2545' : '#00F0FF';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    // Cyan highlight banner
    ctx.fillStyle = '#00B4D8';
    ctx.fillRect(50, 70, w - 100, 30);

    // Box Brand Typography
    ctx.save();
    ctx.textAlign = 'center';

    // Main Case Name
    ctx.font = 'bold 90px "Space Grotesk", sans-serif';
    ctx.fillStyle = (isKraft || isWhite) ? '#0B2545' : '#FFFFFF';
    ctx.fillText((caseBrandText || 'HYDRO PURE 12-PACK').toUpperCase(), w / 2, 320);

    // Pack Spec
    ctx.font = 'bold 50px "JetBrains Mono", monospace';
    ctx.fillStyle = '#0077B6';
    ctx.fillText(`${caseFormat.unitsPerCase} x ${bottleCapacity.toUpperCase()} • MASTER CASE`, w / 2, 450);

    // Fluting Spec
    ctx.font = '600 36px "JetBrains Mono", monospace';
    ctx.fillStyle = (isKraft || isWhite) ? '#64748B' : '#CBD5E1';
    ctx.fillText(`FLUTE: ${caseFormat.fluting.split('(')[0]} • SQF-3 CERTIFIED`, w / 2, 570);

    // Pallet Stacking & Fragile Symbols
    ctx.font = '400 30px "JetBrains Mono", monospace';
    ctx.fillStyle = (isKraft || isWhite) ? '#94A3B8' : '#64748B';
    ctx.fillText(`PALLET YIELD: ${caseFormat.palletStack.split('(')[0]}`, w / 2, 690);

    // Barcode Block
    const barW = 420;
    const barH = 100;
    const barX = w / 2 - barW / 2;
    const barY = 820;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(barX - 15, barY - 15, barW + 30, barH + 30);
    ctx.fillStyle = '#0F172A';
    for (let x = barX; x < barX + barW; x += 10) {
      if (Math.random() > 0.3) {
        ctx.fillRect(x, barY, 5, barH);
      }
    }

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
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

  // Build Procedural 3D Box & Shrink Bundle
  const buildCase3D = (scene) => {
    if (caseGroupRef.current) {
      scene.remove(caseGroupRef.current);
    }

    const group = new THREE.Group();
    caseGroupRef.current = group;

    const isShrink = caseFormat.category === 'Shrink Wrap';
    const isTray = caseFormat.category === 'Display Tray';

    const boxTex = createBoxTexture();

    if (isShrink) {
      // 3D Multi-Pack Shrink Wrap Bundle with real 3D mini-bottles inside!
      const rows = 2;
      const cols = caseFormat.unitsPerCase === 6 ? 3 : 4;
      const spacing = 1.0;

      const totalW = cols * spacing;
      const totalD = rows * spacing;
      const totalH = 3.6;

      // Draw inside mini bottles
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bGeo = new THREE.CylinderGeometry(0.42, 0.42, 3.2, 24);
          const bMat = new THREE.MeshStandardMaterial({
            color: 0x0B2545,
            metalness: 0.9,
            roughness: 0.2
          });
          const bMesh = new THREE.Mesh(bGeo, bMat);
          bMesh.position.set(
            (c - (cols - 1) / 2) * spacing,
            0,
            (r - (rows - 1) / 2) * spacing
          );
          group.add(bMesh);

          // Mini cap
          const cGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 16);
          const cMat = new THREE.MeshStandardMaterial({ color: 0x00F0FF });
          const cMesh = new THREE.Mesh(cGeo, cMat);
          cMesh.position.set(bMesh.position.x, 1.75, bMesh.position.z);
          group.add(cMesh);
        }
      }

      // Outer Translucent Shrink Film Enclosure
      const filmGeo = new THREE.BoxGeometry(totalW + 0.3, totalH, totalD + 0.3);
      const filmMat = new THREE.MeshPhysicalMaterial({
        color: 0xe0f2fe,
        transmission: 0.88,
        transparent: true,
        opacity: 0.65,
        roughness: 0.08,
        ior: 1.45,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        map: boxTex
      });
      const filmMesh = new THREE.Mesh(filmGeo, filmMat);
      group.add(filmMesh);

      // Top Carry Handle Tape
      const handleGeo = new THREE.BoxGeometry(totalW * 0.7, 0.1, 0.3);
      const handleMat = new THREE.MeshStandardMaterial({ color: 0x0077B6 });
      const handleMesh = new THREE.Mesh(handleGeo, handleMat);
      handleMesh.position.y = totalH / 2 + 0.08;
      group.add(handleMesh);

    } else {
      // 3D Master Corrugated Carton Box
      const boxW = isTray ? 4.2 : 3.8;
      const boxH = isTray ? 1.6 : 3.0;
      const boxD = isTray ? 3.0 : 2.8;

      const isLitho = boxMaterial.id === 'litho-laminated';
      const isMatte = boxMaterial.id === 'matte-softtouch';

      const boxGeo = new THREE.BoxGeometry(boxW, boxH, boxD);
      const boxMat = new THREE.MeshPhysicalMaterial({
        map: boxTex,
        roughness: isLitho ? 0.08 : isMatte ? 0.85 : 0.65,
        metalness: isLitho ? 0.12 : 0.02,
        clearcoat: isLitho ? 1.0 : 0.0,
        clearcoatRoughness: 0.05
      });
      const boxMesh = new THREE.Mesh(boxGeo, boxMat);
      group.add(boxMesh);

      // Top Sealing Tape Mesh
      const tapeGeo = new THREE.BoxGeometry(boxW + 0.02, 0.02, 0.6);
      const tapeMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.4,
        opacity: 0.85,
        transparent: true
      });
      const tapeMesh = new THREE.Mesh(tapeGeo, tapeMat);
      tapeMesh.position.y = boxH / 2 + 0.01;
      group.add(tapeMesh);
    }

    // Realistic Ground Shadow Beneath Case
    const shadowGeo = new THREE.PlaneGeometry(5.2, 5.2);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: createShadowTexture(),
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -2.1;
    group.add(shadowMesh);

    scene.add(group);
  };

  // Main Three.js setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 7, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00b4d8, 1.0);
    dirLight2.position.set(-6, 3, -4);
    scene.add(dirLight2);

    buildCase3D(scene);

    // Interactive Drag
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseMove = (e) => {
      if (!isDragging || !caseGroupRef.current) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      caseGroupRef.current.rotation.y += dx * 0.008;
      caseGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, caseGroupRef.current.rotation.x + dy * 0.005));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseUp = () => { isDragging = false; };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (autoRotate && !isDragging && caseGroupRef.current) {
        caseGroupRef.current.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, [caseFormat.id, boxMaterial.id, caseBrandText, bottleCapacity]);

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="relative w-full h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-100/60 border border-slate-200 shadow-inner flex items-center justify-center">
        
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* 3D Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10 font-mono text-[11px]">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-brand-blue font-bold shadow-sm flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5 text-brand-blue" />
            3D Secondary Packaging Model
          </span>
        </div>

        {/* Rotation Toggle */}
        <div className="absolute bottom-4 left-4 z-10">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 backdrop-blur-md shadow-sm ${
              autoRotate ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>{autoRotate ? '360° Spin' : 'Paused'}</span>
          </button>
        </div>

      </div>

      <div className="w-full pt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>💡 Click and drag to inspect case graphics and corner tape</span>
        <span className="text-brand-blue font-bold">{caseFormat.fluting.split('(')[0]}</span>
      </div>
    </div>
  );
}
