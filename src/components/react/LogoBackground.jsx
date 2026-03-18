import { useEffect, useRef, useCallback } from 'react';

export default function LogoBackground() {
  const containerRef = useRef(null);

  const loadLogo = useCallback(async () => {
    try {
      const res = await fetch('/logo.svg');
      const text = await res.text();
      if (!containerRef.current) return;

      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(text, 'image/svg+xml');
      const svg = svgDoc.querySelector('svg');
      if (!svg) return;

      const clone = svg.cloneNode(true);
      clone.setAttribute('width', '100%');
      clone.setAttribute('height', '100%');
      clone.style.display = 'block';

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(clone);
    } catch (e) {}
  }, []);

  useEffect(() => { loadLogo(); }, [loadLogo]);

  return <div ref={containerRef} className="logo-background" />;
}
