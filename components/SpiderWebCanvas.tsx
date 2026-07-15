"use client";
import React, { useRef, useEffect } from "react";

export const SpiderWebCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Node representation
    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const points: Point[] = [];
    const maxPoints = Math.min(60, Math.floor((width * height) / 25000)); // Density cap
    const maxDistance = 140; // Web link radius

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    // Initialize random nodes
    for (let i = 0; i < maxPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw central spider web lines (concentric decagons + radial lines radiating from mouse when active)
      if (mouse.active) {
        ctx.beginPath();
        const radialLines = 8;
        const webLevels = 4;
        
        // Draw radial lines from mouse
        for (let r = 0; r < radialLines; r++) {
          const angle = (r * Math.PI * 2) / radialLines;
          const endX = mouse.x + Math.cos(angle) * maxDistance;
          const endY = mouse.y + Math.sin(angle) * maxDistance;
          
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(endX, endY);
        }

        // Draw concentric connections
        for (let lvl = 1; lvl <= webLevels; lvl++) {
          const radius = (maxDistance / webLevels) * lvl;
          for (let r = 0; r <= radialLines; r++) {
            const angle = (r * Math.PI * 2) / radialLines;
            const x = mouse.x + Math.cos(angle) * radius;
            const y = mouse.y + Math.sin(angle) * radius;
            
            if (r === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
        }
        ctx.strokeStyle = "rgba(226, 54, 54, 0.08)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 2. Render particle mesh webs
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        
        // Move particle
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce borders
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226, 54, 54, 0.4)";
        ctx.fill();

        // Connect node to mouse if close
        if (mouse.active) {
          const distMouse = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (distMouse < maxDistance + 20) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            const alpha = (1 - distMouse / (maxDistance + 20)) * 0.15;
            ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Connect node to other nodes (standard mesh web)
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / maxDistance) * 0.1;
            ctx.strokeStyle = `rgba(226, 54, 54, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-transparent transition-opacity duration-500"
    />
  );
};
