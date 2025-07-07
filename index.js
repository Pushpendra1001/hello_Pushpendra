// Enhanced Portfolio JavaScript with Advanced Animations

// Initialize GSAP and register plugins
gsap.registerPlugin(ScrollTrigger);

// Global Variables
let locoScroll;
let cursor;
let isLoading = true;

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Simple smooth scroll function without locomotive scroll conflicts
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offset = targetId === '#hero' ? 0 : -100;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: elementPosition + offset,
            behavior: 'smooth'
        });
    }
}

// Enhanced Locomotive Scroll Setup (Optional - can be disabled)
function initSmoothScrolling() {
    // Skip locomotive scroll for now to avoid conflicts
    console.log('Using native smooth scrolling');
}

// Enhanced Loading Animation
function initLoader() {
    const loader = $('#loader');
    const loadingText = $('#loading-text');
    
    // Multi-language texts
    const texts = [
        "Hello!!", 
        "Hola!!", 
        "Bonjour!!", 
        "Hallo!!", 
        "Ciao!!", 
        "Namaste!!", 
        "こんにちは!!", 
        "안녕하세요!!", 
        "Привет!!", 
        "مرحبا!!"
    ];
    
    let textIndex = 0;
    
    // Prevent scrolling during loading
    document.body.style.overflow = "hidden";
    
    // Text cycling animation
    const textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % texts.length;
        loadingText.textContent = texts[textIndex];
        
        // Add subtle animation to text change
        gsap.fromTo(loadingText, 
            { 
                scale: 0.95,
                opacity: 0.7
            },
            { 
                scale: 1,
                opacity: 1,
                duration: 0.1,
                ease: 'power2.out'
            }
        );
    }, 100);
    
    // Hide loader after 3 seconds
    setTimeout(() => {
        clearInterval(textInterval);
        hideLoader();
    }, 3000);
    
    function hideLoader() {
        // Animate loader exit
        gsap.to(loader, {
            y: '-100vh',
            duration: 1.2,
            ease: 'power4.inOut',
            onComplete: () => {
                loader.style.display = 'none';
                document.body.style.overflow = "auto"; // Restore scrolling
                isLoading = false;
                initAnimations();
            }
        });
        
        // Animate text exit
        gsap.to(loadingText, {
            scale: 1.2,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        });
    }
}

// Enhanced Cursor Effect
function initCursor() {
    cursor = $('#cursor');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor interactions
    const interactiveElements = $$('a, button, .project-card, .tech-icon, .social-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.mixBlendMode = 'difference';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.mixBlendMode = 'difference';
        });
    });
}

// Navigation System (Clean and Working)
function initNavigation() {
    const dynamicNav = $('#dynamic-nav');
    const navLinks = $$('.nav-link');
    const mobileToggle = $('#mobile-menu-toggle');
    const mobileMenu = $('#mobile-menu');
    const mobileNavLinks = $$('.mobile-nav-link');
    
    if (!dynamicNav || !navLinks.length) {
        console.log('Navigation elements not found');
        return;
    }
    
    console.log('Initializing navigation...');
    
    // Show navigation immediately
    gsap.set(dynamicNav, { opacity: 1, y: 0, scale: 1 });
    
    // Scroll state management
    let scrolled = false;
    window.addEventListener('scroll', () => {
        const shouldBeScrolled = window.scrollY > 80;
        if (shouldBeScrolled !== scrolled) {
            scrolled = shouldBeScrolled;
            dynamicNav.classList.toggle('scrolled', scrolled);
        }
    });
    
    // Active link management
    function updateActiveLink(targetLink) {
        // Remove active from all links
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        // Add active to target link
        if (targetLink) {
            targetLink.classList.add('active');
            
            // Update corresponding mobile link
            const href = targetLink.getAttribute('href');
            const correspondingMobileLink = $(`.mobile-nav-link[href="${href}"]`);
            if (correspondingMobileLink) {
                correspondingMobileLink.classList.add('active');
            }
        }
    }
    
    // Enhanced smooth scrolling function
    function smoothScrollToSection(targetId) {
        const targetElement = $(targetId);
        if (targetElement) {
            console.log('Scrolling to:', targetId);
            const offset = targetId === '#hero' ? 0 : -120;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: elementPosition + offset,
                behavior: 'smooth'
            });
        }
    }
    
    // Navigation link interactions
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            console.log('Navigation clicked:', targetId);
            
            // Update active state immediately
            updateActiveLink(link);
            
            // Smooth scroll to target
            smoothScrollToSection(targetId);
            
            // Click animation
            gsap.fromTo(link, 
                { scale: 1 },
                { 
                    scale: 0.95, 
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                }
            );
        });
        
        // Hover effects
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isActive = mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Mobile menu animation
            if (isActive) {
                gsap.fromTo(mobileMenu, 
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
                );
            } else {
                gsap.to(mobileMenu, {
                    opacity: 0, y: -20, duration: 0.3, ease: 'power2.in'
                });
            }
        });
    }
    
    // Mobile navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            console.log('Mobile navigation clicked:', targetId);
            
            // Close mobile menu
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Update corresponding nav link
            const correspondingNavLink = $(`.nav-link[href="${targetId}"]`);
            if (correspondingNavLink) {
                updateActiveLink(correspondingNavLink);
            }
            
            // Smooth scroll with delay
            setTimeout(() => {
                smoothScrollToSection(targetId);
            }, 200);
        });
    });
    
    // Intersection Observer for active section detection
    const sections = $$('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingNavLink = $(`.nav-link[href="#${sectionId}"]`);
                
                if (correspondingNavLink) {
                    updateActiveLink(correspondingNavLink);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    console.log('Navigation initialized successfully');
}

// Dynamic Title Changer
function initDynamicTitle() {
    const dynamicTitle = $('#dynamic-title');
    if (!dynamicTitle) return;
    
    const titles = [
        "Full Stack Developer",
        "DevOps Engineer", 
        "AI/ML Enthusiast",
        "UI/UX Designer",
        "Tech Teacher",
        "System Integrator",
        "Linux",
        "Mobile Developer",
    ];
    
    let currentIndex = 0;
    let isAnimating = false;
    
    function changeTitle() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Animate out current title
        gsap.to(dynamicTitle, {
            y: -30,
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                // Change text
                currentIndex = (currentIndex + 1) % titles.length;
                dynamicTitle.textContent = titles[currentIndex];
                
                // Add color variation based on title
                const colorClasses = {
                    "Full Stack Developer": "text-text-light",
                    "DevOps Engineer": "text-blue-400", 
                    "AI/ML Enthusiast": "text-purple-400",
                    "UI/UX Designer": "text-pink-400",
                    "Tech Teacher": "text-yellow-400",
                    "System Integrator": "text-green-400",
                    "Linux Expert": "text-orange-400",
                    "Cloud Architect": "text-cyan-400",
                    "Mobile Developer": "text-indigo-400",
                    "Data Scientist": "text-emerald-400",
                    "Blockchain Developer": "text-amber-400",
                    "Game Developer": "text-red-400",
                    "IoT Specialist": "text-teal-400",
                    "Cybersecurity Expert": "text-rose-400",
                    "AR/VR Developer": "text-violet-400"
                };
                
                // Remove all color classes
                dynamicTitle.className = dynamicTitle.className.replace(/text-\w+-\d+/g, '');
                // Add base classes back
                dynamicTitle.className += " block text-4xl md:text-6xl lg:text-7xl animate-fade-in-up transition-all duration-300";
                // Add new color class
                const newColorClass = colorClasses[titles[currentIndex]] || "text-text-light";
                dynamicTitle.classList.add(newColorClass);
                
                // Animate in new title
                gsap.fromTo(dynamicTitle, 
                    {
                        y: 30,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "elastic.out(1, 0.6)",
                        onComplete: () => {
                            isAnimating = false;
                        }
                    }
                );
            }
        });
    }
    
    // Start the animation cycle after initial page load
    setTimeout(() => {
        changeTitle();
        // Continue changing every 1.5 seconds for rapid changes
        setInterval(changeTitle, 1500);
    }, 2500); // Wait 2.5 seconds before starting the cycle
    
    // Add hover effect to pause/resume animation
    dynamicTitle.addEventListener('mouseenter', () => {
        gsap.to(dynamicTitle, {
            textShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    dynamicTitle.addEventListener('mouseleave', () => {
        gsap.to(dynamicTitle, {
            textShadow: "none",
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}

// Text Animations
function initTextAnimations() {
    // Hero title animations
    const heroTitle = $$('.animate-fade-in-up');
    heroTitle.forEach((el, index) => {
        gsap.fromTo(el, 
            { 
                opacity: 0, 
                y: 50 
            },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                delay: index * 0.2,
                ease: 'power3.out'
            }
        );
    });
    
    // Section titles
    const sectionTitles = $$('h2');
    sectionTitles.forEach(title => {
        gsap.fromTo(title,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Project Animations
function initProjectAnimations() {
    const projectCards = $$('.project-card');
    
    projectCards.forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 100,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Stats Animation
function initStatsAnimation() {
    const statItems = $$('.stat-item [data-count]');
    
    statItems.forEach(item => {
        const target = parseInt(item.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(item, {
                    innerHTML: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        item.innerHTML = Math.ceil(item.innerHTML);
                    }
                });
            }
        });
    });
}

// Skill Animations
function initSkillAnimations() {
    const skillItems = $$('.skill-item');
    
    skillItems.forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                x: -50
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Tech Stack Animation
function initTechStackAnimation() {
    const techIcons = $$('.tech-icon');
    
    techIcons.forEach((icon, index) => {
        gsap.fromTo(icon,
            {
                opacity: 0,
                scale: 0,
                rotation: -180
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: icon,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Particles Background
function initParticlesBackground() {
    const particlesContainer = $('#particles-bg');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 136, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Contact Form
function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(to right, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 2000);
    });
}

// GitHub Projects Dynamic Loading
function initGitHubProjects() {
    const container = $('#github-projects-container');
    const loadingIndicator = $('.github-projects-loading');
    
    if (!container) return;
    
    // GitHub API endpoint for user repositories
    const githubUsername = 'Pushpendra1001';
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('GitHub API request failed');
            }
            return response.json();
        })
        .then(repos => {
            // Remove loading indicator
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
            
            // Filter out forked repos and get recent ones
            const filteredRepos = repos
                .filter(repo => !repo.fork && repo.description)
                .slice(0, 6);
            
            // Create project cards
            filteredRepos.forEach((repo, index) => {
                const projectCard = createGitHubProjectCard(repo);
                container.appendChild(projectCard);
                
                // Animate card entrance
                setTimeout(() => {
                    projectCard.classList.add('loaded');
                }, index * 100);
            });
        })
        .catch(error => {
            console.log('GitHub API error:', error);
            // Remove loading indicator and show fallback
            if (loadingIndicator) {
                loadingIndicator.innerHTML = `
                    <div class="text-center text-text-light">
                        <i class="ri-github-line text-4xl mb-2"></i>
                        <p>Unable to load latest projects</p>
                        <a href="https://github.com/${githubUsername}" class="text-accent hover:underline">
                            View on GitHub →
                        </a>
                    </div>
                `;
            }
        });
}

function createGitHubProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'github-project-card project-card group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700 hover:border-accent transition-all duration-300 hover:scale-105';
    
    // Get language color
    const languageColors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Vue': '#4FC08D',
        'React': '#61dafb',
        'Flutter': '#02569B',
        'Dart': '#00B4AB',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'PHP': '#4F5D95'
    };
    
    const languageColor = languageColors[repo.language] || '#6b7280';
    
    // Format date
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
    
    // Get repository topics/tags
    const topics = repo.topics || [];
    const primaryTopic = topics[0] || repo.language || 'Code';
    
    card.innerHTML = `
        <div class="p-6">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 rounded-full" style="background-color: ${languageColor}"></div>
                    <h3 class="text-lg font-bold text-white truncate">${repo.name}</h3>
                </div>
                <div class="flex items-center space-x-2">
                    ${repo.language ? `<span class="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded-full">${repo.language}</span>` : ''}
                    ${repo.stargazers_count > 0 ? `<span class="flex items-center space-x-1 text-yellow-400 text-xs">
                        <i class="ri-star-line"></i>
                        <span>${repo.stargazers_count}</span>
                    </span>` : ''}
                </div>
            </div>
            
            <p class="text-text-light text-sm mb-4 line-clamp-2">
                ${repo.description || 'No description available'}
            </p>
            
            ${topics.length > 0 ? `
                <div class="flex flex-wrap gap-1 mb-4">
                    ${topics.slice(0, 3).map(topic => `
                        <span class="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                            ${topic}
                        </span>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="flex justify-between items-center text-xs text-gray-400 mb-4">
                <span>Updated ${updatedDate}</span>
                ${repo.size > 0 ? `<span>${Math.round(repo.size / 1024)} KB</span>` : ''}
            </div>
            
            <div class="flex justify-between items-center">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" 
                   class="text-accent hover:underline text-sm flex items-center space-x-1">
                    <i class="ri-github-line"></i>
                    <span>View Repository</span>
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer"
                       class="text-blue-400 hover:underline text-sm flex items-center space-x-1">
                        <i class="ri-external-link-line"></i>
                        <span>Live Demo</span>
                    </a>
                ` : ''}
                <i class="ri-arrow-right-up-line text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </div>
        </div>
    `;
    
    return card;
}

// CTA Button Click Handlers
function initCTAButtons() {
    const ctaButtons = $$('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            
            // Smooth scroll to target
            smoothScrollTo(targetId);
            
            // Add click animation
            gsap.timeline()
                .to(button, {
                    scale: 0.95,
                    duration: 0.15,
                    ease: 'power2.out'
                })
                .to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.5)'
                });
        });
    });
}

// Enhanced Mobile Navigation
function initMobileNavigation() {
    // Handle mobile menu visibility on scroll
    let lastScrollY = window.scrollY;
    const nav = $('#dynamic-nav');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide nav on mobile
            if (window.innerWidth <= 768) {
                nav.style.transform = 'translateX(-50%) translateY(-100%)';
            }
        } else {
            // Scrolling up - show nav
            nav.style.transform = 'translateX(-50%) translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Refresh layout after orientation change
            window.scrollTo(0, window.scrollY + 1);
            window.scrollTo(0, window.scrollY - 1);
        }, 100);
    });
}

// Enhanced Image Loading
function initImageLoading() {
    const heroImage = $('img[alt="Pushpendra Baswal"]');
    
    if (heroImage) {
        // Add loading state
        heroImage.style.opacity = '0';
        
        heroImage.addEventListener('load', () => {
            gsap.to(heroImage, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        heroImage.addEventListener('error', () => {
            // Fallback if image fails to load
            heroImage.style.opacity = '1';
            heroImage.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-dark))';
            heroImage.style.display = 'flex';
            heroImage.style.alignItems = 'center';
            heroImage.style.justifyContent = 'center';
            heroImage.innerHTML = '<span style="font-size: 4rem; color: var(--primary); font-weight: bold;">P</span>';
        });
        
        // Trigger load check
        if (heroImage.complete) {
            heroImage.dispatchEvent(new Event('load'));
        }
    }
}

// Projects Showcase Functionality
function initProjectsShowcase() {
    const marquee = $('#projects-marquee');
    const scrollLeftBtn = $('#scroll-left');
    const scrollRightBtn = $('#scroll-right');
    const pausePlayBtn = $('#pause-play');
    const showMoreBtn = $('#show-more-projects');
    
    if (!marquee) return;
    
    let isPaused = false;
    let currentDirection = 'normal';
    
    // Duplicate content for seamless scrolling
    const originalContent = marquee.innerHTML;
    marquee.innerHTML = originalContent + originalContent;
    
    // Control buttons
    if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            marquee.style.animationDirection = currentDirection === 'reverse' ? 'normal' : 'reverse';
            currentDirection = currentDirection === 'reverse' ? 'normal' : 'reverse';
        });
    }
    
    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => {
            marquee.style.animationDirection = 'normal';
            currentDirection = 'normal';
        });
    }
    
    if (pausePlayBtn) {
        pausePlayBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            marquee.style.animationPlayState = isPaused ? 'paused' : 'running';
            pausePlayBtn.innerHTML = isPaused ? '<i class="ri-play-line"></i>' : '<i class="ri-pause-line"></i>';
        });
    }
    
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            smoothScrollTo('#work');
        });
    }
    
    // Project card interactions
    const projectCards = $$('.project-showcase-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!isPaused) {
                marquee.style.animationPlayState = 'running';
            }
        });
    });
    
    console.log('Projects showcase initialized');
}

// Initialize all animations after loading
function initAnimations() {
    initTextAnimations();
    initProjectAnimations();
    initStatsAnimation();
    initSkillAnimations();
    initTechStackAnimation();
    initParticlesBackground();
    initContactForm();
    initGitHubProjects();
    initCTAButtons();
    initMobileNavigation();
    initProjectsShowcase();
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
}

// Main Initialization
function init() {
    console.log('🚀 Enhanced Portfolio Loading...');
    
    // Initialize core systems first
    initCursor();
    initImageLoading();
    initMobileNavigation();
    
    // Initialize navigation immediately for instant functionality
    initSmoothScrolling();
    initNavigation();
    initDynamicTitle();
    
    // Start the loader
    initLoader();
}

// Start the portfolio when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Resize handler
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Export for debugging
window.portfolioDebug = {
    locoScroll,
    gsap,
    ScrollTrigger
};



// Add this function to your existing index.js file
function initSheryEffects() {
    // Wait for images to load before applying effects
    const heroImage = document.querySelector('#myimage img');
    
    if (heroImage && heroImage.complete) {
        applySheryEffects();
    } else if (heroImage) {
        heroImage.addEventListener('load', applySheryEffects);
    }
}

function applySheryEffects() {
    console.log('Applying Shery.js effects...');
    
    // Hero Profile Image Effect
    Shery.imageEffect("#myimage img", {
        style: 4,
        config: {
            "uColor": {"value": false},
            "uSpeed": {"value": 1, "range": [0.1, 1], "rangep": [1, 10]},
            "uAmplitude": {"value": 2.79, "range": [0, 5]},
            "uFrequency": {"value": 5.11, "range": [0, 10]},
            "geoVertex": {"range": [1, 64], "value": 52.94},
            "zindex": {"value": -9996999, "range": [-9999999, 9999999]},
            "aspect": {"value": 1},
            "ignoreShapeAspect": {"value": true},
            "shapePosition": {"value": {"x": 0, "y": 0}},
            "shapeScale": {"value": {"x": 0.5, "y": 0.5}},
            "shapeEdgeSoftness": {"value": 0, "range": [0, 0.5]},
            "shapeRadius": {"value": 0, "range": [0, 2]},
            "currentScroll": {"value": 0},
            "scrollLerp": {"value": 0.07},
            "gooey": {"value": false},
            "infiniteGooey": {"value": false},
            "growSize": {"value": 4, "range": [1, 15]},
            "durationOut": {"value": 1, "range": [0.1, 5]},
            "durationIn": {"value": 1.5, "range": [0.1, 5]},
            "displaceAmount": {"value": 0.5},
            "masker": {"value": true},
            "maskVal": {"value": 1.79, "range": [1, 5]},
            "scrollType": {"value": 0},
            "noEffectGooey": {"value": true},
            "onMouse": {"value": 1}, // Enable mouse interaction
            "noise_speed": {"value": 0.2, "range": [0, 10]},
            "metaball": {"value": 0.2, "range": [0, 2]},
            "discard_threshold": {"value": 0.5, "range": [0, 1]},
            "antialias_threshold": {"value": 0.002, "range": [0, 0.1]},
            "noise_height": {"value": 0.5, "range": [0, 2]},
            "noise_scale": {"value": 10, "range": [0, 100]}
        }
    });

    // About Section Heading Text Effect
    Shery.textAnimate("#about h2", {
        style: 1,
        y: 10,
        delay: 0.1,
        duration: 1.5,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        multiplier: 0.1,
    });

    // Project Showcase Images Effect
    Shery.imageEffect(".project-image", {
        style: 5,
        config: {
            "a": {"value": 2, "range": [0, 30]},
            "b": {"value": 0.75, "range": [-1, 1]},
            "zindex": {"value": -9996999, "range": [-9999999, 9999999]},
            "aspect": {"value": 1.2},
            "ignoreShapeAspect": {"value": true},
            "shapePosition": {"value": {"x": 0, "y": 0}},
            "shapeScale": {"value": {"x": 0.5, "y": 0.5}},
            "shapeEdgeSoftness": {"value": 0, "range": [0, 0.5]},
            "shapeRadius": {"value": 0, "range": [0, 2]},
            "currentScroll": {"value": 0},
            "scrollLerp": {"value": 0.07},
            "gooey": {"value": true},
            "infiniteGooey": {"value": true},
            "growSize": {"value": 4, "range": [1, 15]},
            "durationOut": {"value": 1, "range": [0.1, 5]},
            "durationIn": {"value": 1.5, "range": [0.1, 5]},
            "displaceAmount": {"value": 0.5},
            "masker": {"value": true},
            "maskVal": {"value": 1.98, "range": [1, 5]},
            "scrollType": {"value": 0},
            "geoVertex": {"range": [1, 64], "value": 31.78},
            "noEffectGooey": {"value": true},
            "onMouse": {"value": 1},
            "noise_speed": {"value": 0.2, "range": [0, 10]},
            "metaball": {"value": 0.2, "range": [0, 2]},
            "discard_threshold": {"value": 0.5, "range": [0, 1]},
            "antialias_threshold": {"value": 0.002, "range": [0, 0.1]},
            "noise_height": {"value": 0.5, "range": [0, 2]},
            "noise_scale": {"value": 10, "range": [0, 100]}
        },
        gooey: true
    });

    console.log('Shery.js effects applied successfully!');
}

// Update your existing initAnimations function to include Shery effects
function initAnimations() {
    initTextAnimations();
    initProjectAnimations();
    initStatsAnimation();
    initSkillAnimations();
    initTechStackAnimation();
    initParticlesBackground();
    initContactForm();
    initGitHubProjects();
    initCTAButtons();
    initMobileNavigation();
    initProjectsShowcase();
    
    // Add Shery.js effects
    setTimeout(() => {
        initSheryEffects();
    }, 500); // Small delay to ensure everything is loaded
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
}

// Replace your applySheryEffects function with this corrected version:
function applySheryEffects() {
    console.log('Applying Shery.js effects...');
    
    // Hero Profile Image Effect - Fixed selector
    Shery.imageEffect("#myimage img", {
        style: 4,
        config: {
            "uColor": {"value": false},
            "uSpeed": {"value": 1, "range": [0.1, 1], "rangep": [1, 10]},
            "uAmplitude": {"value": 2.79, "range": [0, 5]},
            "uFrequency": {"value": 5.11, "range": [0, 10]},
            "geoVertex": {"range": [1, 64], "value": 52.94},
            "zindex": {"value": -9996999, "range": [-9999999, 9999999]},
            "aspect": {"value": 1},
            "ignoreShapeAspect": {"value": true},
            "shapePosition": {"value": {"x": 0, "y": 0}},
            "shapeScale": {"value": {"x": 0.5, "y": 0.5}},
            "shapeEdgeSoftness": {"value": 0, "range": [0, 0.5]},
            "shapeRadius": {"value": 0, "range": [0, 2]},
            "currentScroll": {"value": 0},
            "scrollLerp": {"value": 0.07},
            "gooey": {"value": false},
            "infiniteGooey": {"value": false},
            "growSize": {"value": 4, "range": [1, 15]},
            "durationOut": {"value": 1, "range": [0.1, 5]},
            "durationIn": {"value": 1.5, "range": [0.1, 5]},
            "displaceAmount": {"value": 0.5},
            "masker": {"value": true},
            "maskVal": {"value": 1.79, "range": [1, 5]},
            "scrollType": {"value": 0},
            "noEffectGooey": {"value": true},
            "onMouse": {"value": 1}, // Enable mouse interaction
            "noise_speed": {"value": 0.2, "range": [0, 10]},
            "metaball": {"value": 0.2, "range": [0, 2]},
            "discard_threshold": {"value": 0.5, "range": [0, 1]},
            "antialias_threshold": {"value": 0.002, "range": [0, 0.1]},
            "noise_height": {"value": 0.5, "range": [0, 2]},
            "noise_scale": {"value": 10, "range": [0, 100]}
        }
    });

    // About Section Heading Text Effect
    Shery.textAnimate("#about h2", {
        style: 1,
        y: 10,
        delay: 0.1,
        duration: 1.5,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        multiplier: 0.1,
    });

    // Project Gallery Images Effect
    Shery.imageEffect(".project-showcase-image", {
        style: 5,
        config: {
            "a": {"value": 2, "range": [0, 30]},
            "b": {"value": 0.75, "range": [-1, 1]},
            "zindex": {"value": -9996999, "range": [-9999999, 9999999]},
            "aspect": {"value": 1.2},
            "ignoreShapeAspect": {"value": true},
            "shapePosition": {"value": {"x": 0, "y": 0}},
            "shapeScale": {"value": {"x": 0.5, "y": 0.5}},
            "shapeEdgeSoftness": {"value": 0, "range": [0, 0.5]},
            "shapeRadius": {"value": 0, "range": [0, 2]},
            "currentScroll": {"value": 0},
            "scrollLerp": {"value": 0.07},
            "gooey": {"value": true},
            "infiniteGooey": {"value": true},
            "growSize": {"value": 4, "range": [1, 15]},
            "durationOut": {"value": 1, "range": [0.1, 5]},
            "durationIn": {"value": 1.5, "range": [0.1, 5]},
            "displaceAmount": {"value": 0.5},
            "masker": {"value": true},
            "maskVal": {"value": 1.98, "range": [1, 5]},
            "scrollType": {"value": 0},
            "geoVertex": {"range": [1, 64], "value": 31.78},
            "noEffectGooey": {"value": true},
            "onMouse": {"value": 1},
            "noise_speed": {"value": 0.2, "range": [0, 10]},
            "metaball": {"value": 0.2, "range": [0, 2]},
            "discard_threshold": {"value": 0.5, "range": [0, 1]},
            "antialias_threshold": {"value": 0.002, "range": [0, 0.1]},
            "noise_height": {"value": 0.5, "range": [0, 2]},
            "noise_scale": {"value": 10, "range": [0, 100]}
        },
        gooey: true
    });

    console.log('Shery.js effects applied successfully!');
}

// Update initSheryEffects function to check for the correct image element
function initSheryEffects() {
    // Wait for images to load before applying effects
    const heroImage = document.querySelector('#myimage img');
    
    if (heroImage && heroImage.complete) {
        applySheryEffects();
    } else if (heroImage) {
        heroImage.addEventListener('load', applySheryEffects);
    } else {
        // If image not found, try again after a short delay
        setTimeout(() => {
            const retryImage = document.querySelector('#myimage img');
            if (retryImage) {
                applySheryEffects();
            }
        }, 1000);
    }
}