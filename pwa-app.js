document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading time (remove this in production)
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('loginContent').style.display = 'block';
    }, 2000); // 2 seconds delay, adjust as needed

    const pwaLoginForm = document.getElementById('pwaLoginForm');
    const pwaRegistrationForm = document.getElementById('pwaRegistrationForm');

    if (pwaLoginForm) {
        pwaLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const phone = document.getElementById('pwaLoginPhone').value;
            const password = document.getElementById('pwaLoginPassword').value;

            // Here you would typically send this data to your server for authentication
            // For this example, we'll just simulate a successful login
            console.log('Login attempt:', phone, password);

            // Simulate an API call with a setTimeout
            setTimeout(() => {
                // In a real app, you'd check the server response here
                const loginSuccessful = true; // This would be based on the server response

                if (loginSuccessful) {
                    // Redirect to the home page
                    window.location.href = 'pwa-home.html';
                } else {
                    // Show an error message
                    alert('Login failed. Please check your credentials and try again.');
                }
            }, 1000); // Simulate a 1-second delay for the API call
        });
    }

    if (pwaRegistrationForm) {
        pwaRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('pwaRegName').value;
            const phone = document.getElementById('pwaRegPhone').value;
            const email = document.getElementById('pwaRegEmail').value;
            const idNumber = document.getElementById('pwaRegIdNumber').value;
            const dob = document.getElementById('pwaRegDob').value;
            const password = document.getElementById('pwaRegPassword').value;
            const termsAgreed = document.getElementById('pwaRegTerms').checked;

            if (!termsAgreed) {
                alert('Please agree to the Terms and Conditions');
                return;
            }

            // Here you would typically send this data to your server
            console.log('PWA Registration attempt:', { name, phone, email, idNumber, dob, password });
            // For demo purposes, we'll just show an alert
            alert('PWA Registration successful!');
            // Here you would typically redirect to the login page or main app interface
            window.location.href = 'pwa-login.html';
        });
    }
});
