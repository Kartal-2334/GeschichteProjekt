const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('benefit-card') || 
                entry.target.classList.contains('reason-card')) {
                entry.target.style.transitionDelay = `${entry.target.dataset.index * 0.1}s`;
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.benefit-card, .reason-card, .story-card, .animate-text').forEach((element, index) => {
    element.dataset.index = index;
    observer.observe(element);
});

document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.5s ease';
    });
});

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';

    const heroContent = document.querySelector('.hero-content');
    const xAxis = (window.innerWidth / 2 - window.event.clientX) / 25;
    const yAxis = (window.innerHeight / 2 - window.event.clientY) / 25;
    heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

document.querySelectorAll('.benefit-card, .reason-card, .story-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

const heroTitle = document.querySelector('.hero h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    } else {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        heroTitle.appendChild(cursor);
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = progress + '%';
    const hue = (progress * 2.4) % 360;
    progressBar.style.background = `hsl(${hue}, 100%, 50%)`;
});

document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => ripple.remove(), 600);
    });
});

const mapPoints = document.querySelectorAll('.map-point');
mapPoints.forEach(point => {
    point.addEventListener('mouseenter', () => {
        point.style.transform = 'scale(1.2)';
    });
    
    point.addEventListener('mouseleave', () => {
        point.style.transform = 'scale(1)';
    });
});

const cultureCards = document.querySelectorAll('.culture-card');
cultureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('h3').style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('h3').style.transform = 'translateY(0)';
    });
});

document.querySelectorAll('.story-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        const image = card.querySelector('.story-image img');
        image.style.transform = `scale(1.1) translateX(${rotateY * 2}px) translateY(${rotateX * 2}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        const image = card.querySelector('.story-image img');
        image.style.transform = 'scale(1.1)';
    });

    card.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            tag.style.transform = 'scale(1.1)';
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
            }, 200);
        });
    });
});


const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            entry.target.style.animation = 'float 6s ease-in-out infinite';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.story-card').forEach(card => {
    storyObserver.observe(card);
});


document.querySelectorAll('.story-content').forEach(content => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.5
    });
    
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    content.style.transition = 'all 0.5s ease';
    observer.observe(content);
}); 

document.addEventListener('DOMContentLoaded', function() {

    const videos = document.querySelectorAll('video');
    

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                entry.target.play();
            } else {

                entry.target.pause();
            }
        });
    }, {
        threshold: 0.5
    });


    videos.forEach(video => {
        observer.observe(video);
    });

 
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });


    const migrationCtx = document.getElementById('migrationChart').getContext('2d');
    new Chart(migrationCtx, {
        type: 'line',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Zuwanderung nach Deutschland',
                data: [890000, 500000, 416000, 400000, 327000, 220000, 329000, 268000, 280000],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Anzahl der Zuwanderer'
                    }
                }
            }
        }
    });


    const integrationCtx = document.getElementById('integrationChart').getContext('2d');
    new Chart(integrationCtx, {
        type: 'bar',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Erwerbstätige mit Migrationshintergrund',
                data: [7.3, 7.8, 8.2, 8.5, 8.9, 9.1, 9.4, 9.7, 10.0],
                backgroundColor: 'rgba(52, 152, 219, 0.8)',
                borderColor: '#3498db',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Millionen Personen'
                    }
                }
            }
        }
    });
}); 