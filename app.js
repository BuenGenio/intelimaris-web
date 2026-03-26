function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('intelimaris-theme', theme);
  
  document.querySelectorAll('.theme-option').forEach(option => {
    option.classList.toggle('active', option.dataset.theme === theme);
  });
}

function toggleLangDropdown() {
  const dropdown = document.getElementById('langDropdown');
  const button = document.querySelector('.lang-current');
  
  if (dropdown && button) {
    const isOpen = dropdown.classList.contains('open');
    dropdown.classList.toggle('open');
    button.classList.toggle('open');
  }
}

function selectLanguage(lang) {
  if (typeof updateTranslations === 'function') {
    updateTranslations(lang);
  }
  
  // Update active state in dropdown
  document.querySelectorAll('.lang-option').forEach(option => {
    option.classList.toggle('active', option.dataset.lang === lang);
  });
  
  // Update current language display
  const langData = {
    en: { flag: 'assets/flag-us.svg', code: 'EN' },
    es: { flag: 'assets/flag-es.svg', code: 'ES' },
    el: { flag: 'assets/flag-gr.svg', code: 'EL' }
  };
  
  const data = langData[lang];
  if (data) {
    const flagImg = document.getElementById('currentLangFlag');
    const codeSpan = document.getElementById('currentLangCode');
    
    if (flagImg) flagImg.src = data.flag;
    if (codeSpan) codeSpan.textContent = data.code;
  }
  
  // Close dropdown
  const dropdown = document.getElementById('langDropdown');
  const button = document.querySelector('.lang-current');
  if (dropdown) dropdown.classList.remove('open');
  if (button) button.classList.remove('open');
}

// Legacy function for compatibility
function setLanguage(lang) {
  selectLanguage(lang);
}

function initTheme() {
  const savedTheme = localStorage.getItem('intelimaris-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  setTheme(theme);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('intelimaris-theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

class OceanCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.waves = [];
    this.vessels = [];
    this.signals = [];
    
    this.resize();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
    this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
  }
  
  init() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    for (let i = 0; i < 3; i++) {
      this.waves.push({
        y: this.height * 0.3 + i * 60,
        amplitude: 20 + i * 10,
        frequency: 0.01 - i * 0.002,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + i * 0.01
      });
    }
    
    for (let i = 0; i < 5; i++) {
      this.vessels.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height * 0.8,
        size: 8,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }
  
  drawParticles() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 217, 255, ${p.opacity})`;
      this.ctx.fill();
    });
  }
  
  drawWaves() {
    this.waves.forEach(wave => {
      wave.phase += wave.speed;
      
      this.ctx.beginPath();
      this.ctx.moveTo(0, wave.y);
      
      for (let x = 0; x <= this.width; x += 5) {
        const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
        this.ctx.lineTo(x, y);
      }
      
      this.ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });
  }
  
  drawVessels() {
    const time = Date.now() * 0.001;
    
    this.vessels.forEach(vessel => {
      const pulse = Math.sin(time + vessel.pulsePhase) * 0.3 + 0.7;
      
      this.ctx.beginPath();
      this.ctx.arc(vessel.x, vessel.y, vessel.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 217, 255, ${pulse * 0.6})`;
      this.ctx.fill();
      
      this.ctx.beginPath();
      this.ctx.arc(vessel.x, vessel.y, vessel.size * 0.5, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(0, 217, 255, 1)';
      this.ctx.fill();
      
      const signalRadius = vessel.size + pulse * 20;
      this.ctx.beginPath();
      this.ctx.arc(vessel.x, vessel.y, signalRadius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(0, 217, 255, ${(1 - pulse) * 0.3})`;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });
  }
  
  drawConnections() {
    for (let i = 0; i < this.vessels.length; i++) {
      for (let j = i + 1; j < this.vessels.length; j++) {
        const v1 = this.vessels[i];
        const v2 = this.vessels[j];
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          const opacity = (1 - distance / 300) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(v1.x, v1.y);
          this.ctx.lineTo(v2.x, v2.y);
          this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.drawWaves();
    this.drawParticles();
    this.drawConnections();
    this.drawVessels();
    
    requestAnimationFrame(() => this.animate());
  }
}

class MiniChart {
  constructor(canvas, type) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.type = type;
    this.data = this.generateData();
    
    this.resize();
    this.draw();
    
    setInterval(() => {
      this.data.shift();
      this.data.push(this.generateDataPoint());
      this.draw();
    }, 2000);
  }
  
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.width = rect.width;
    this.height = rect.height;
  }
  
  generateDataPoint() {
    switch(this.type) {
      case 'battery':
        return 12.8 + Math.random() * 0.8;
      case 'bilge':
        return Math.random() * 0.2;
      case 'temp':
        return 20 + Math.random() * 4;
      default:
        return Math.random();
    }
  }
  
  generateData() {
    return Array.from({ length: 20 }, () => this.generateDataPoint());
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    const max = Math.max(...this.data);
    const min = Math.min(...this.data);
    const range = max - min || 1;
    
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height);
    
    this.data.forEach((value, i) => {
      const x = (i / (this.data.length - 1)) * this.width;
      const y = this.height - ((value - min) / range) * this.height;
      
      if (i === 0) {
        this.ctx.lineTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });
    
    this.ctx.lineTo(this.width, this.height);
    this.ctx.closePath();
    
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, 'rgba(0, 217, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 217, 255, 0.05)');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    this.ctx.beginPath();
    this.data.forEach((value, i) => {
      const x = (i / (this.data.length - 1)) * this.width;
      const y = this.height - ((value - min) / range) * this.height;
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });
    
    this.ctx.strokeStyle = 'rgba(0, 217, 255, 0.8)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
}

function updateDashboardTime() {
  const timeElement = document.getElementById('dashboardTime');
  if (timeElement) {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds} UTC`;
  }
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  if (typeof initLanguage === 'function') {
    initLanguage();
  }
  
  // Close language dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const langSelector = document.querySelector('.lang-selector');
    const dropdown = document.getElementById('langDropdown');
    const button = document.querySelector('.lang-current');
    
    if (langSelector && !langSelector.contains(e.target)) {
      if (dropdown) dropdown.classList.remove('open');
      if (button) button.classList.remove('open');
    }
  });
  
  // Initialize current language display
  const currentLang = document.documentElement.getAttribute('lang') || 'en';
  const langData = {
    en: { flag: 'assets/flag-us.svg', code: 'EN' },
    es: { flag: 'assets/flag-es.svg', code: 'ES' },
    el: { flag: 'assets/flag-gr.svg', code: 'EL' }
  };
  
  const data = langData[currentLang];
  if (data) {
    const flagImg = document.getElementById('currentLangFlag');
    const codeSpan = document.getElementById('currentLangCode');
    
    if (flagImg) flagImg.src = data.flag;
    if (codeSpan) codeSpan.textContent = data.code;
  }
  
  // Update active state in dropdown
  document.querySelectorAll('.lang-option').forEach(option => {
    option.classList.toggle('active', option.dataset.lang === currentLang);
  });
  
  const oceanCanvas = document.getElementById('oceanCanvas');
  if (oceanCanvas) {
    new OceanCanvas(oceanCanvas);
  }
  
  const miniCharts = document.querySelectorAll('.mini-chart');
  miniCharts.forEach(canvas => {
    const type = canvas.dataset.chart;
    new MiniChart(canvas, type);
  });
  
  setInterval(updateDashboardTime, 1000);
  updateDashboardTime();
  
  const fadeElements = document.querySelectorAll('.capability-card, .sensor-category, .arch-card, .vision-card, .use-case-card, .business-card');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentLang = document.documentElement.getAttribute('lang') || 'en';
      const successMessage = typeof t === 'function' ? t('closing.form.success', currentLang) : 'Thank you for your interest! Our team will contact you within 24 hours.';
      alert(successMessage);
      demoForm.reset();
    });
  }
  
  const vesselCards = document.querySelectorAll('.vessel-card');
  vesselCards.forEach(card => {
    card.addEventListener('click', () => {
      vesselCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
  
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.pageYOffset);
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.pageYOffset + 200;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, 100);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

class DataStream {
  constructor() {
    this.metrics = {
      sensors: 0,
      events: 0,
      alerts: 0
    };
    
    this.startStreaming();
  }
  
  startStreaming() {
    setInterval(() => {
      this.metrics.sensors = Math.floor(Math.random() * 50) + 150;
      this.metrics.events = Math.floor(Math.random() * 100) + 500;
      this.metrics.alerts = Math.floor(Math.random() * 5);
      
      this.updateUI();
    }, 3000);
  }
  
  updateUI() {
    const sensorElements = document.querySelectorAll('[data-metric="sensors"]');
    const eventElements = document.querySelectorAll('[data-metric="events"]');
    const alertElements = document.querySelectorAll('[data-metric="alerts"]');
    
    sensorElements.forEach(el => el.textContent = this.metrics.sensors);
    eventElements.forEach(el => el.textContent = this.metrics.events);
    alertElements.forEach(el => el.textContent = this.metrics.alerts);
  }
}

if (typeof window !== 'undefined') {
  window.dataStream = new DataStream();
}

const parallaxElements = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  parallaxElements.forEach(el => {
    const speed = el.dataset.parallax || 0.5;
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const statValue = entry.target.querySelector('.stat-value');
      if (statValue && !isNaN(statValue.textContent)) {
        const endValue = parseInt(statValue.textContent);
        animateValue(statValue, 0, endValue, 2000);
        entry.target.dataset.animated = 'true';
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
  statsObserver.observe(stat);
});

console.log('%c InteliMaris ', 'background: linear-gradient(135deg, #00b8d4, #00d9ff); color: #0a0e1a; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c The Intelligence Layer for Maritime Operations ', 'color: #00d9ff; font-size: 14px; font-weight: bold;');
console.log('%c Interested in joining our team? Email: careers@intelimaris.com ', 'color: #94a3b8; font-size: 12px;');
