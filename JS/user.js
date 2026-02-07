// Modal Management Functions
function openSignin() {
    closeModal('authModal');
    document.getElementById('signinModal').style.display = 'block';
}

function openSignup() {
    closeModal('authModal');
    document.getElementById('signupModal').style.display = 'block';
}

function openUserProfile() {
    const userData = JSON.parse(localStorage.getItem('currentUser')) || {
        name: 'Guest User',
        email: 'user@example.com',
        phone: '+91 XXXXX XXXXX'
    };
    
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profilePhone').textContent = userData.phone;
    document.getElementById('profileEvents').textContent = userData.registrations || 0;
    
    document.getElementById('profileModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchModal(closeId, openId) {
    closeModal(closeId);
    document.getElementById(openId).style.display = 'block';
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    location.reload();
}

// CAPTCHA Functions
let userCaptchaAnswer = 0;

function generateUserCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    userCaptchaAnswer = eval(num1 + operator + num2);
    
    const questionElement = document.getElementById('userCaptchaQuestion');
    questionElement.textContent = `What is ${num1} ${operator} ${num2}?`;
    
    // Clear previous answer
    const captchaInput = document.getElementById('userCaptchaInput');
    if (captchaInput) {
        captchaInput.value = '';
        captchaInput.classList.remove('captcha-error', 'captcha-success');
    }
}

function validateUserCaptcha() {
    const captchaInput = document.getElementById('userCaptchaInput');
    const userAnswer = parseInt(captchaInput.value);
    
    if (userAnswer === userCaptchaAnswer) {
        captchaInput.classList.remove('captcha-error');
        captchaInput.classList.add('captcha-success');
        return true;
    } else {
        captchaInput.classList.remove('captcha-success');
        captchaInput.classList.add('captcha-error');
        setTimeout(() => {
            captchaInput.classList.remove('captcha-error');
        }, 500);
        return false;
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const authModal = document.getElementById('authModal');
    const signinModal = document.getElementById('signinModal');
    const signupModal = document.getElementById('signupModal');
    const profileModal = document.getElementById('profileModal');

    if (event.target == authModal) authModal.style.display = 'none';
    if (event.target == signinModal) signinModal.style.display = 'none';
    if (event.target == signupModal) signupModal.style.display = 'none';
    if (event.target == profileModal) profileModal.style.display = 'none';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentUser');
    
    // Show auth modal if not logged in
    if (!currentUser) {
        document.getElementById('authModal').style.display = 'block';
    }
    
    // Generate CAPTCHA when signin modal opens
    const signinModal = document.getElementById('signinModal');
    const originalOpenSignin = openSignin;
    window.openSignin = function() {
        originalOpenSignin();
        generateUserCaptcha();
    };

    // Handle Sign In Form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Validate CAPTCHA first
            if (!validateUserCaptcha()) {
                alert('Incorrect CAPTCHA. Please try again.');
                return;
            }
            
            // Store user data (in real app, verify with server)
            const userData = {
                email: email,
                name: email.split('@')[0],
                phone: '+91 XXXXX XXXXX',
                registrations: 0
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            alert('Sign In Successful!');
            closeModal('signinModal');
            location.reload();
        });
    }

    // Handle Sign Up Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[placeholder="Full Name"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[placeholder*="Password (min 6"]').value;
            const confirmPassword = this.querySelector('input[placeholder="Confirm Password"]').value;
            const phone = this.querySelector('input[type="tel"]').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Store user data
            const userData = {
                name: name,
                email: email,
                phone: phone,
                registrations: 0
            };

            localStorage.setItem('currentUser', JSON.stringify(userData));
            alert('Account Created Successfully! Welcome ' + name + '!');
            closeModal('signupModal');
            location.reload();
        });
    }

    // Handle Event Registration
    const eventBtns = document.querySelectorAll('.event-btn');
    eventBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser) {
                alert('Please sign in to register for events!');
                document.getElementById('authModal').style.display = 'block';
                return;
            }

            alert('Successfully registered for the event!');
            // Update registration count
            currentUser.registrations = (currentUser.registrations || 0) + 1;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        });
    });
});
