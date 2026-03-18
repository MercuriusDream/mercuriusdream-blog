import { useEffect, useRef } from 'react';

export default function SnowCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const COUNT = Math.floor((w * h) / 8000);
    const flakes = [];

    for (let i = 0; i < COUNT; i++) {
      flakes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.2 + 0.4,
        vx: Math.random() * 0.6 - 0.3,
        vy: Math.random() * 0.7 + 0.2,
        o: Math.random() * 0.5 + 0.15,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.008 + 0.003,
        swingAmp: Math.random() * 0.8 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.swing += f.swingSpeed;
        f.x += f.vx + Math.sin(f.swing) * f.swingAmp;
        f.y += f.vy;
        if (f.y > h + 10) { f.y = -10; f.x = Math.random() * w; }
        if (f.x > w + 10) f.x = -10;
        if (f.x < -10) f.x = w + 10;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 220, 235, ${f.o})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
