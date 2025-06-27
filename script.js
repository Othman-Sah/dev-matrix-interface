// Cursor following effect
let mouseX = 0, mouseY = 0;
let cursorGlow = document.getElementById('cursorGlow');
let cursorSecondary = document.getElementById('cursorSecondary');
let cursorCrosshair = document.getElementById('cursorCrosshair');

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
    
    cursorSecondary.style.left = mouseX + 'px';
    cursorSecondary.style.top = mouseY + 'px';
    
    cursorCrosshair.style.left = mouseX + 'px';
    cursorCrosshair.style.top = mouseY + 'px';
});

// Update time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('currentTime').textContent = timeString;
}
updateTime();
setInterval(updateTime, 1000);

// Typing effect
const fullText = "FULL_STACK_DEVELOPER.EXE";
let typedText = "";
let index = 0;

function typeText() {
    if (index <= fullText.length) {
        typedText = fullText.slice(0, index);
        document.getElementById('typedText').textContent = typedText;
        index++;
        setTimeout(typeText, 100);
    }
}
typeText();

// Terminal animation
const terminalLines = [
    "$ whoami",
    "alex.chen@matrix:~$ Full Stack Developer",
    "",
    "$ cat skills.txt",
    "JavaScript, TypeScript, React, Next.js",
    "Node.js, Python, PostgreSQL, MongoDB",
    "AWS, Docker, Kubernetes, CI/CD",
    "",
    "$ ls -la projects/",
    "drwxr-xr-x  5 alex  staff   160 Dec 15 10:30 neural-commerce",
    "drwxr-xr-x  3 alex  staff    96 Dec 14 14:22 blockchain-wallet",
    "drwxr-xr-x  4 alex  staff   128 Dec 13 09:15 quantum-chat",
    "",
    "$ echo 'Ready to build the future'",
    "Ready to build the future",
    "",
    "$ _"
];

let terminalIndex = 0;
const terminalContent = document.getElementById('terminalContent');

function addTerminalLine() {
    if (terminalIndex < terminalLines.length) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = terminalLines[terminalIndex];
        terminalContent.appendChild(line);
        terminalIndex++;
        setTimeout(addTerminalLine, 500);
    }
}

// Start terminal animation when section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'terminal') {
            addTerminalLine();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.getElementById('terminal'));

// Progress bar animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
            progressObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.tech-category').forEach(category => {
    progressObserver.observe(category);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<span>⏳</span><span>TRANSMITTING...</span>';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<span>✅</span><span>MESSAGE_SENT</span>';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            this.reset();
        }, 2000);
    }, 2000);
});

// Add hover effects to interactive elements
document.querySelectorAll('.btn, .project-card, .tech-category, .social-link').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
        cursorGlow.style.opacity = '0.8';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.opacity = '1';
    });
});

// System Monitor Animation
function updateSystemMetrics() {
    // Generate random values
    const cpuUsage = Math.floor(Math.random() * 40) + 30; // 30-70%
    const memoryUsage = Math.floor(Math.random() * 50) + 40; // 40-90%
    const networkUsage = Math.floor(Math.random() * 60) + 20; // 20-80%
    
    // Generate random uptime
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const uptimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    // Update values
    document.getElementById('cpuValue').textContent = cpuUsage + '%';
    document.getElementById('memoryValue').textContent = memoryUsage + '%';
    document.getElementById('networkValue').textContent = networkUsage + '%';
    document.getElementById('uptimeValue').textContent = uptimeString;
    
    // Update progress bars
    document.getElementById('cpuProgress').style.width = cpuUsage + '%';
    document.getElementById('memoryProgress').style.width = memoryUsage + '%';
    document.getElementById('networkProgress').style.width = networkUsage + '%';
    document.getElementById('uptimeProgress').style.width = '100%';
    
    // Update timestamp
    const now = new Date();
    const timestamp = now.toISOString();
    document.getElementById('timestampLine').textContent = `[TIMESTAMP] ${timestamp}`;
}

// Initialize system monitor
updateSystemMetrics();

// Update system metrics every 2-5 seconds randomly
function scheduleNextUpdate() {
    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    setTimeout(() => {
        updateSystemMetrics();
        scheduleNextUpdate();
    }, delay);
}

scheduleNextUpdate();

// Animate system monitor when section becomes visible
const monitorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateSystemMetrics();
            monitorObserver.unobserve(entry.target);
        }
    });
});

const monitorSection = document.getElementById('monitor');
if (monitorSection) {
    monitorObserver.observe(monitorSection);
}
