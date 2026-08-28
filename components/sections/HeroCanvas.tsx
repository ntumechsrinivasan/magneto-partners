"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hub: boolean;
  phase: number;
}

interface Packet {
  from: Node;
  to: Node;
  progress: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animationFrame = 0;
    let frameCount = 0;
    const packets: Packet[] = [];
    const hubPairFrames = new Map<string, number>();

    const HUB_RANGE = 185;
    const NODE_RANGE = 108;
    const HUB_PROB = 0.18;
    const DRIFT_SPEED = 0.28;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const count = Math.min(55, Math.floor((width * height) / 13000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * DRIFT_SPEED * 2,
        vy: (Math.random() - 0.5) * DRIFT_SPEED * 2,
        hub: Math.random() < HUB_PROB,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      frameCount += 1;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const isHubPair = a.hub || b.hub;
          const range = isHubPair ? HUB_RANGE : NODE_RANGE;
          if (dist > range) continue;

          ctx.beginPath();
          if (isHubPair) {
            ctx.strokeStyle = "rgba(0,184,255,0.35)";
            ctx.lineWidth = 0.7;
            ctx.setLineDash([]);
          } else {
            ctx.strokeStyle = "rgba(58,111,255,0.4)";
            ctx.lineWidth = 0.35;
            ctx.setLineDash([3, 7]);
          }
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.setLineDash([]);

          if (isHubPair) {
            const key = `${i}-${j}`;
            const last = hubPairFrames.get(key) ?? -90;
            if (frameCount - last >= 90) {
              hubPairFrames.set(key, frameCount);
              packets.push({ from: a, to: b, progress: 0 });
            }
          }
        }
      }

      for (let p = packets.length - 1; p >= 0; p--) {
        const packet = packets[p];
        packet.progress += 0.018;
        if (packet.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }
        const px = packet.from.x + (packet.to.x - packet.from.x) * packet.progress;
        const py = packet.from.y + (packet.to.y - packet.from.y) * packet.progress;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#00ffb8";
        ctx.fill();
      }

      for (const node of nodes) {
        if (node.hub) {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 16);
          glow.addColorStop(0, "rgba(0,184,255,0.35)");
          glow.addColorStop(1, "rgba(0,184,255,0)");
          ctx.beginPath();
          ctx.fillStyle = glow;
          ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
          ctx.fill();

          const ringRadius = 9 + Math.sin(frameCount * 0.05 + node.phase) * 2;
          ctx.beginPath();
          ctx.strokeStyle = "rgba(0,184,255,0.6)";
          ctx.lineWidth = 1;
          ctx.arc(node.x, node.y, ringRadius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.fillStyle = "#00b8ff";
          ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.fillStyle = "rgba(58,111,255,0.5)";
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrame = requestAnimationFrame(step);
    }

    resize();
    step();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
