/* ==========================================================================
   OBSIDIAN HERO PARTICLES CANVAS
   Drifting solar energy nodes with subtle mint/cyan glow
   ========================================================================== */

export function initHeroParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];

  const particleCount = window.innerWidth < 768 ? 28 : 55;
  const maxDistance = 140;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.3 ? 'rgba(0, 229, 160, ' : 'rgba(0, 180, 255, ';
      this.alpha = Math.random() * 0.25 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineAlpha = (1 - dist / maxDistance) * 0.12;
          ctx.strokeStyle = `rgba(0, 229, 160, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
  };
}
