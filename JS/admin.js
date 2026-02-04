// Admin Modal Functions
function openAdminProfile() {
    const adminData = JSON.parse(localStorage.getItem('adminUser')) || {
        adminId: 'ADMIN001',
        name: 'Administrator',
        eventsCreated: 0
    };
    
    document.getElementById('adminId').textContent = adminData.adminId;
    document.getElementById('adminName').textContent = adminData.name;
    document.getElementById('adminEventsCreated').textContent = adminData.eventsCreated;
    document.getElementById('adminLastLogin').textContent = new Date().toLocaleDateString();
    
    document.getElementById('adminProfileModal').style.display = 'block';
}

function closeAdminModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function logoutAdmin() {
    localStorage.removeItem('adminUser');
    alert('Logged out successfully!');
    window.location.href = '../home.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const authModal = document.getElementById('adminAuthModal');
    const profileModal = document.getElementById('adminProfileModal');

    if (event.target == authModal) authModal.style.display = 'none';
    if (event.target == profileModal) profileModal.style.display = 'none';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const adminUser = localStorage.getItem('adminUser');
    
    // Show auth modal if not logged in
    if (!adminUser) {
        document.getElementById('adminAuthModal').style.display = 'block';
    }

    // Handle Admin Sign In Form
    const adminSigninForm = document.getElementById('adminSigninForm');
    if (adminSigninForm) {
        adminSigninForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const adminId = this.querySelector('input[placeholder="Admin ID"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Basic validation (in real app, verify with server)
            if (password.length < 6) {
                alert('Invalid credentials!');
                return;
            }

            // Store admin data
            const adminData = {
                adminId: adminId,
                name: 'Administrator ' + adminId,
                eventsCreated: 0
            };
            
            localStorage.setItem('adminUser', JSON.stringify(adminData));
            alert('Admin Sign In Successful!');
            closeAdminModal('adminAuthModal');
        });
    }

    // Handle Create Event Form
    const createEventForm = document.getElementById('createEventForm');
    if (createEventForm) {
        createEventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const eventName = this.querySelector('input[placeholder="Event Name"]').value;
            const clubName = this.querySelector('input[placeholder="Club Name"]').value;
            
            const adminData = JSON.parse(localStorage.getItem('adminUser'));
            adminData.eventsCreated = (adminData.eventsCreated || 0) + 1;
            localStorage.setItem('adminUser', JSON.stringify(adminData));
            
            alert('Event "' + eventName + '" created successfully!');
            
            // Update stats
            document.querySelector('.stats h2 span').textContent = adminData.eventsCreated;
            
            // Reset form
            this.reset();
        });
    }

    // Handle action buttons
    const btnPrimary = document.querySelectorAll('.btn-primary:not(form button)');
    btnPrimary.forEach(btn => {
        if (btn.textContent.includes('Download')) {
            btn.addEventListener('click', function() {
                alert('Downloading CSV...');
            });
        } else if (btn.textContent.includes('Participants')) {
            btn.addEventListener('click', function() {
                alert('Loading participants...');
            });
        }
    });
});
