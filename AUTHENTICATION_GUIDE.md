# EventFlow - Event Scheduling System
## Authentication & Sign-In Features

### 🎯 Features Added

#### 1. **Home Page (home.html)**
- Beautiful card-based interface for User and Admin login
- **User Options:**
  - Sign In button - for existing users
  - Sign Up button - for new user registration
- **Admin Options:**
  - Sign In button - admin-only authentication

#### 2. **User Page (pages/user.html)**
- **Authentication:**
  - Sign In Modal - for existing users
  - Sign Up Modal - for new registrations
  - Profile Modal - to view user information
  - Auto-prompts for authentication on first visit
  
- **Features:**
  - Browse upcoming events
  - Filter events by club and venue
  - Register for events
  - View personal profile
  - Track registered events

#### 3. **Admin Page (pages/admin.html)**
- **Authentication:**
  - Admin Sign In Modal - secure admin access
  - Admin Profile Modal - view admin information
  
- **Features:**
  - Create and manage events
  - View all created events
  - Download participant data
  - Track event creation statistics

### 🎨 UI/UX Enhancements

#### Design Elements:
- **Modern Modal Dialogs** with smooth animations
- **Gradient Backgrounds** for visual appeal
- **Responsive Forms** with input validation
- **Hover Effects** on buttons and cards
- **Mobile-Friendly** layout with media queries
- **Glassmorphism Effects** on admin page
- **Smooth Transitions** and animations

#### Color Scheme:
- **Primary:** #063da2 (Blue)
- **Secondary:** #0493e0 (Light Blue)
- **Accent:** White for contrast
- **Gradients:** Blue to Light Blue transitions

### 🔐 Authentication Flow

#### User Registration:
1. Click "Sign Up" on home page or user page
2. Fill in:
   - Full Name
   - Email Address
   - Password (min 6 characters)
   - Confirm Password
   - Phone Number
3. Account is created and stored in browser localStorage
4. Auto-redirects to Sign In modal

#### User Sign In:
1. Click "Sign In" button
2. Enter Email and Password
3. User data is stored in localStorage
4. Access to user dashboard is granted
5. Profile button becomes available in header

#### Admin Sign In:
1. Click "Sign In" on admin card
2. Enter Admin ID and Password
3. Access to admin dashboard is granted
4. Can create and manage events

### 💾 Data Storage

- Uses **Browser localStorage** for user session management
- User data includes:
  - Name
  - Email
  - Phone Number
  - Event Registrations Count
- Admin data includes:
  - Admin ID
  - Admin Name
  - Events Created Count

### 📱 Responsive Design

- Works on desktop, tablet, and mobile devices
- Mobile-optimized modals
- Touch-friendly buttons
- Responsive form layouts
- Flexible grid system for events

### 🚀 How to Use

#### For Users:
```
1. Open home.html
2. Click "Sign Up" to create account or "Sign In" if existing
3. Browse events in the user dashboard
4. Click "Profile" to view account information
5. Click "Logout" to end session
```

#### For Admins:
```
1. Open home.html → Admin Card
2. Click "Sign In"
3. Enter Admin ID and Password
4. Create events using the form
5. View all created events in the table
6. Click "Logout" to end session
```

### 📁 File Structure

```
Adaptive Event Scheduling System/
├── home.html (Home page with sign-in/signup options)
├── CSS/
│   ├── home.css (Home page styling with modals)
│   ├── user.css (User page styling with modals)
│   └── admin.css (Admin page styling with modals)
├── JS/
│   ├── home.js (Home page authentication logic)
│   ├── user.js (User page functionality)
│   └── admin.js (Admin page functionality)
├── pages/
│   ├── user.html (User dashboard)
│   └── admin.html (Admin dashboard)
└── assets/
    └── images/
```

### ✨ Key JavaScript Functions

**home.js:**
- `openUserSignin()` - Opens user sign-in modal
- `openUserSignup()` - Opens user sign-up modal
- `openAdminSignin()` - Opens admin sign-in modal
- `closeModal(modalId)` - Closes any modal
- `switchModal()` - Switches between modals smoothly

**user.js:**
- `openSignin()` - Opens user sign-in
- `openSignup()` - Opens user sign-up
- `openUserProfile()` - Displays user profile
- `logoutUser()` - Logs out user
- Event registration handlers

**admin.js:**
- `openAdminProfile()` - Displays admin profile
- `logoutAdmin()` - Logs out admin
- Event creation handlers
- Admin dashboard functionality

### 🔒 Security Notes

- Currently uses localStorage (suitable for demo purposes)
- For production:
  - Implement server-side authentication
  - Use secure password hashing
  - Add JWT tokens
  - Implement HTTPS
  - Add CSRF protection

### 🎯 Future Enhancements

- [ ] Server-side authentication
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile editing
- [ ] Event notifications
- [ ] Social login options
- [ ] Two-factor authentication
- [ ] Event calendar view

---

**Version:** 1.0  
**Last Updated:** February 4, 2026
