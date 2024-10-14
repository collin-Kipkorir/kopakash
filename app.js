document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
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
    let deferredPrompt;
    const webAppBanner = document.getElementById('web-app-banner');
    const installButton = document.getElementById('install-app');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        webAppBanner.style.display = 'block';
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
    let deferredPrompt;

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((registration) => {
                console.log('ServiceWorker registration successful');
            }, (err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPromotion();
    });

    function showInstallPromotion() {
        const installBtn = document.getElementById('installBtn');
        installBtn.style.display = 'inline-block';
    }

    document.getElementById('installBtn').addEventListener('click', async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
            document.getElementById('installBtn').style.display = 'none';
        }
    });

    window.addEventListener('appinstalled', (evt) => {
        console.log('App was installed.');
        document.getElementById('installBtn').style.display = 'none';
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

    let deferredPrompt;

    document.getElementById('downloadApp').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('App installed');
            }
            deferredPrompt = null;
        }
    });

    // Redirect to login page if app is launched from home screen
    if (window.matchMedia('(display-mode: standalone)').matches) {
        window.location.href = '/login.html';
    }
});
