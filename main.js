// set years
document.querySelectorAll('[id^="year"]').forEach(el => el.textContent = new Date().getFullYear());

// Fluid hero background (light blobs)
(function() {
    const canvas = document.getElementById('fluid-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, blobs = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = 420;
        blobs = [];
        for (let i = 0; i < 6; i++) {
            blobs.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 120 + Math.random() * 220,
                dx: (Math.random() - 0.5) * 0.15,
                dy: (Math.random() - 0.5) * 0.15,
                hue: 200 + Math.random() * 60,
                alpha: 0.12 + Math.random() * 0.06
            });
        }
    }
    window.addEventListener('resize', resize);
    resize();

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#0f1113';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        blobs.forEach(b => {
            const g = ctx.createRadialGradient(b.x, b.y, b.r * 0.1, b.x, b.y, b.r);
            g.addColorStop(0, hsla($, { b, hue }, 60 % 70 % $, { b, alpha }));
            g.addColorStop(1, hsla($, { b, hue }, 50 % 8 % 0));
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fill();
            b.x += b.dx;
            b.y += b.dy;
            if (b.x - b.r > w) b.x = -b.r;
            if (b.x + b.r < 0) b.x = w + b.r;
            if (b.y - b.r > h) b.y = -b.r;
            if (b.y + b.r < 0) b.y = h + b.r;
        });
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
})();

// Fireflies layer
(function() {
    const container = document.querySelector('.hero-fluid-bg');
    if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = 420;
        particles = [];
        for (let i = 0; i < 40; i++) {
            particles.push({ x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 2, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, a: 0.2 + Math.random() * 0.6 });
        }
    }
    window.addEventListener('resize', resize);
    resize();

    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = rgba(255, 255, 255, $, { p, a });
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
            p.a += (Math.random() - 0.5) * 0.02;
            p.a = Math.max(0.15, Math.min(0.9, p.a));
        });
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
})();

// Parallax on mouse move
(function() {
    const bg = document.querySelector('.hero-fluid-bg');
    if (!bg) return;
    document.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 6;
        bg.style.transform = translate($, { x }, px, $, { y }, px);
    });
})();

// Ensure memorial-track length
(function() {
    const track = document.querySelector('.memorial-track');
    if (!track) return;
    const initial = Array.from(track.children);
    while (track.children.length < 12) {
        initial.forEach(node => track.appendChild(node.cloneNode(true)));
    }
})();

// Simple form handling: just alert (replace with backend)
;
(function() {
    const callForm = document.getElementById('callForm');
    if (callForm) {
        callForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Заявка на вызов специалиста отправлена. Мы свяжемся с вами в ближайшее время.');
            callForm.reset();
        });
    }
    const consultForm = document.getElementById('consultForm');
    if (consultForm) {
        consultForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Заявка на консультацию принята. Менеджер свяжется с вами.');
            consultForm.reset();
        });
    }
})();