// Add this at the beginning of your app.js
if (window.matchMedia('(display-mode: standalone)').matches) {
    // App is running in standalone mode (installed as PWA)
    if (window.location.pathname !== '/pwa-login.html') {
        window.location.href = '/pwa-login.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {  // Add this check
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Change navbar style on scroll
    function changeNavbarStyle() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Highlight active section in navbar
    function highlightActiveSection() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust for navbar height
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Event listeners
    window.addEventListener('scroll', changeNavbarStyle);
    window.addEventListener('scroll', highlightActiveSection);

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarCollapse.classList.remove('show');
        });
    });

    // Initialize
    changeNavbarStyle();
    highlightActiveSection();

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const phone = document.getElementById('loginPhone').value;
            const password = document.getElementById('loginPassword').value;
            // Here you would typically send this data to your server
            console.log('Login attempt:', phone, password);
            // For demo purposes, we'll just close the modal and show an alert
            var modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modal.hide();
            alert('Login successful!');
        });
    }

    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const phone = document.getElementById('registerPhone').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            // Here you would typically send this data to your server
            console.log('Registration attempt:', name, phone, email, password);
            // For demo purposes, we'll just close the modal and show an alert
            var modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            modal.hide();
            alert('Registration successful! Please check your phone for a verification code.');
        });
    }

    // Phone number validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    });

    // Loan application form handling
    const loanForm = document.getElementById('loanApplicationForm');
    if (loanForm) {
        loanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = document.getElementById('loanAmount').value;
            const purpose = document.getElementById('loanPurpose').value;
            // Here you would typically send this data to your server
            console.log('Loan application:', amount, purpose);
            // For demo purposes, we'll just show an alert
            alert('Loan application submitted successfully! We will review your application and get back to you soon.');
            // Close the modal (assuming you're using Bootstrap modals)
            const modal = bootstrap.Modal.getInstance(document.getElementById('loanModal'));
            if (modal) modal.hide();
        });
    }

    // Web App Installation

    const webAppBanner = document.getElementById('web-app-banner');
    const installButton = document.getElementById('install-app');

    let deferredPrompt;

    function handleDownloadClick(e) {
        e.preventDefault();
        console.log('Download App clicked');
        if (deferredPrompt) {
            console.log('deferredPrompt available, showing prompt...');
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                console.log('User choice result:', choiceResult.outcome);
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
        } else {
            console.log('deferredPrompt not available');
            alert('App installation is not available at the moment. Please try again later or check if the app is already installed.');
        }
    }

    // Add click event listeners to all download elements
    const downloadElements = [
        document.getElementById('downloadAppLink'),
        document.getElementById('downloadAppButton'),
        document.getElementById('appStoreDownload'),
        document.getElementById('playStoreDownload')
    ];

    downloadElements.forEach(element => {
        if (element) {
            element.addEventListener('click', handleDownloadClick);
        }
    });

    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('beforeinstallprompt event fired');
        e.preventDefault();
        deferredPrompt = e;
        // Show all download elements
        downloadElements.forEach(element => {
            if (element) {
                element.style.display = 'inline-block';
            }
        });
    });

    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        }
        webAppBanner.style.display = 'none';
    });

    window.addEventListener('appinstalled', () => {
        webAppBanner.style.display = 'none';
        deferredPrompt = null;
        console.log('PWA was installed');
    });

    // Example of dynamic content loading (e.g., for testimonials or loan calculator)
    function loadTestimonials() {
        // This is where you'd typically fetch testimonials from a server
        const testimonials = [
            { name: "John D.", text: "Kopa Kash made getting a loan so easy. I was approved within hours!" },
            { name: "Sarah M.", text: "The app is user-friendly and the customer service is excellent. Highly recommended!" },
            { name: "Michael R.", text: "I love how I can manage my loan repayments right from my phone. Great service!" }
        ];

        const testimonialContainer = document.getElementById('testimonials');
        if (testimonialContainer) {
            testimonialContainer.innerHTML = testimonials.map(t => `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">"${t.text}"</p>
                            <footer class="blockquote-footer">${t.name}</footer>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Call this function when the page loads
    loadTestimonials();

    // Simple loan calculator
    const loanCalculator = document.getElementById('loanCalculator');
    if (loanCalculator) {
        loanCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('calcAmount').value);
            const term = parseInt(document.getElementById('calcTerm').value);
            const rate = 0.1; // 10% interest rate, for example
            const monthlyRate = rate / 12;
            const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
            
            document.getElementById('calcResult').textContent = `Estimated monthly payment: $${monthlyPayment.toFixed(2)}`;
        });
    }

    // PWA functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, (err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    // Add this for testing
    window.addEventListener('load', () => {
        console.log('Page loaded. Checking PWA installability...');
        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported');
        } else {
            console.log('Service Worker is not supported');
        }
    });

    window.addEventListener('appinstalled', (evt) => {
        console.log('App was installed successfully');
    });

    // Function to check if user is logged in
    function isUserLoggedIn() {
        // Implement your login check logic here
        // For example, check if a token exists in localStorage
        return localStorage.getItem('userToken') !== null;
    }

    // Redirect to login/register page if not logged in
    document.addEventListener('DOMContentLoaded', () => {
        if (!isUserLoggedIn()) {
            // You might want to change this to your actual login page
            window.location.href = '#login';
        }
    });

    // Open login modal if app is launched from home screen
    if (window.matchMedia('(display-mode: standalone)').matches) {
        document.addEventListener('DOMContentLoaded', () => {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        });
    }

    window.addEventListener('load', () => {
        console.log('Window loaded. Checking PWA installability...');
        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported');
        } else {
            console.log('Service Worker is not supported');
        }
    });
});
