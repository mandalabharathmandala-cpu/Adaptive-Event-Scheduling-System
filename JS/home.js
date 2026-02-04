// Open User Sign In Modal
function openUserSignin() {
    document.getElementById("userSigninModal").style.display = "block";
}

// Open User Sign Up Modal
function openUserSignup() {
    document.getElementById("userSignupModal").style.display = "block";
}

// Open Admin Sign In Modal
function openAdminSignin() {
    document.getElementById("adminSigninModal").style.display = "block";
}

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Switch Between Modals
function switchModal(closeId, openId) {
    closeModal(closeId);
    openModal(openId);
}

// Open Modal (generic)
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const userSigninModal = document.getElementById("userSigninModal");
    const userSignupModal = document.getElementById("userSignupModal");
    const adminSigninModal = document.getElementById("adminSigninModal");

    if (event.target == userSigninModal) {
        userSigninModal.style.display = "none";
    }
    if (event.target == userSignupModal) {
        userSignupModal.style.display = "none";
    }
    if (event.target == adminSigninModal) {
        adminSigninModal.style.display = "none";
    }
}

// Handle User Sign In Form
document.addEventListener("DOMContentLoaded", function() {
    const userSigninForm = document.getElementById("userSigninForm");
    if (userSigninForm) {
        userSigninForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            console.log("User Sign In:", { email, password });
            alert("User Sign In Successful! Redirecting...");
            // Redirect to user dashboard
            window.location.href = "pages/user.html";
        });
    }

    // Handle User Sign Up Form
    const userSignupForm = document.getElementById("userSignupForm");
    if (userSignupForm) {
        userSignupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = this.querySelector('input[placeholder="Full Name"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[placeholder*="Password (min 6"]').value;
            const confirmPassword = this.querySelector('input[placeholder="Confirm Password"]').value;
            const phone = this.querySelector('input[type="tel"]').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            console.log("User Sign Up:", { name, email, password, phone });
            alert("Account Created Successfully! You can now sign in.");
            closeModal("userSignupModal");
            openUserSignin();
        });
    }

    // Handle Admin Sign In Form
    const adminSigninForm = document.getElementById("adminSigninForm");
    if (adminSigninForm) {
        adminSigninForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const adminId = this.querySelector('input[placeholder="Admin ID"]').value;
            const password = this.querySelector('input[type="password"]').value;
            console.log("Admin Sign In:", { adminId, password });
            alert("Admin Sign In Successful! Redirecting...");
            // Redirect to admin dashboard
            window.location.href = "pages/admin.html";
        });
    }
});
