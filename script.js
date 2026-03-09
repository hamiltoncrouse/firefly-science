const canvas = document.getElementById('fireflyCanvas');
const ctx = canvas.getContext('2d');

let width, height;
const fireflies = [];
const particleCount = 60;

// Resize Handler
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

// Firefly Class
class Firefly {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = 0;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseState = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Pulsate Opacity
        this.pulseState += this.pulseSpeed;
        this.opacity = (Math.sin(this.pulseState) + 1) / 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Outer Glow
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 6
        );
        gradient.addColorStop(0, `rgba(250, 204, 21, ${this.opacity})`);
        gradient.addColorStop(0.2, `rgba(132, 204, 22, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Central Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        ctx.fill();
    }
}

// Initial Population
for (let i = 0; i < particleCount; i++) {
    fireflies.push(new Firefly());
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);
    
    fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

// Simple Scroll Reveal Effect
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.feature-section');
    const scrollPos = window.scrollY + window.innerHeight * 0.8;
    
    sections.forEach(section => {
        if (scrollPos > section.offsetTop) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Init section styles for reveal
document.querySelectorAll('.feature-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 1s ease-out';
});
