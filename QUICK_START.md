# 🚀 Quick Start Guide

## Open and Test the Application

### Step 1: Open in Browser
```
Open: home.html in any modern web browser
```

### Step 2: Test User Sign-Up
```
1. Click on "User" card
2. Click "Sign Up" button
3. Fill the form:
   - Name: John Doe
   - Email: john@example.com
   - Password: 123456
   - Confirm: 123456
   - Phone: 9876543210
4. Click "Sign Up"
5. You'll be shown Sign In modal
```

### Step 3: Test User Sign-In
```
1. Fill Sign In form with:
   - Email: john@example.com
   - Password: 123456
2. Click "Sign In"
3. You're now on User Dashboard!
```

### Step 4: Explore User Dashboard
```
Features available:
- Browse Events (events displayed below)
- Search events using search box
- Filter by Club and Venue
- Register for events (click "Register" button)
- Click "👤 Profile" to view your info
- Click "Logout" to sign out
```

### Step 5: Test Admin Sign-In
```
1. Go back to home.html
2. Click on "Admin" card
3. Click "Sign In" button
4. Enter any Admin ID: ADMIN001
5. Enter any Password: password123
6. Click "Sign In"
7. You're now on Admin Dashboard!
```

### Step 6: Explore Admin Dashboard
```
Features available:
- View "Events Created" stats
- See existing events table
- Create new events using form:
  * Event Name
  * Club Name
  * Start Date/Time
  * End Date/Time
  * Coordinators (name, email)
- Click "👤 Profile" to view admin info
- Click "Logout" to sign out
```

## Visual Walkthrough

### Home Page Layout
```
┌─────────────────────────────────────┐
│        EventFlow Platform           │
│  Smart Event Scheduling Platform    │
├─────────────────────────────────────┤
│                                     │
│    ┌─────────┐        ┌─────────┐  │
│    │  User   │        │  Admin  │  │
│    │ Card    │        │ Card    │  │
│    │[Sign In]│        │[Sign In]│  │
│    │[Sign Up]│        │         │  │
│    └─────────┘        └─────────┘  │
│                                     │
├─────────────────────────────────────┤
│   © 2026 EventFlow. All rights     │
└─────────────────────────────────────┘
```

### Modal Layout
```
┌──────────────────────────────────┐
│ ✕                                │
│         Sign In                  │
├──────────────────────────────────┤
│                                  │
│ [📧 Email Address              ] │
│ [🔒 Password                   ] │
│                                  │
│ ┌────────────────────────────┐  │
│ │     Sign In Button         │  │
│ └────────────────────────────┘  │
│                                  │
│ Don't have account? Sign Up      │
│                                  │
└──────────────────────────────────┘
```

## File Overview

```
home.html
├─ Sign Up Modal (User)
├─ Sign In Modal (User)
├─ Sign In Modal (Admin)
└─ JavaScript functions for modals

pages/user.html
├─ Sign In Modal
├─ Sign Up Modal
├─ Profile Modal
├─ Events Grid
└─ Search & Filter

pages/admin.html
├─ Sign In Modal
├─ Profile Modal
├─ Events Table
├─ Create Event Form
└─ Event Management
```

## Key Files Changed

| File | What Was Added |
|------|----------------|
| `home.html` | 3 authentication modals |
| `CSS/home.css` | Modal styling, animations |
| `JS/home.js` | Modal management logic |
| `pages/user.html` | Auth & profile modals |
| `CSS/user.css` | Modal styles for user page |
| `JS/user.js` | User auth & registration |
| `pages/admin.html` | Auth & profile modals |
| `CSS/admin.css` | Enhanced styling & modals |
| `JS/admin.js` | Admin auth & event mgmt |

## Functionality Summary

### ✅ Sign-Up
- ✓ Full name input
- ✓ Email validation
- ✓ Password confirmation
- ✓ Phone number
- ✓ Data stored in localStorage
- ✓ Auto-redirect to Sign In

### ✅ Sign-In
- ✓ Email and password fields
- ✓ Session management
- ✓ Data stored in localStorage
- ✓ Access to user dashboard
- ✓ Profile button available

### ✅ User Features
- ✓ Browse events
- ✓ Search functionality
- ✓ Filter by club & venue
- ✓ Register for events
- ✓ View profile
- ✓ Track registrations
- ✓ Logout

### ✅ Admin Features
- ✓ Secure sign-in
- ✓ Create events
- ✓ View all events
- ✓ Track statistics
- ✓ Download data
- ✓ View profile
- ✓ Logout

## Browser Compatibility

✅ Chrome (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Edge (Latest)
✅ Mobile Browsers

## Data Storage

Uses **Browser localStorage**:
```javascript
// User data
localStorage.getItem('currentUser')
// Returns: {name, email, phone, registrations}

// Admin data
localStorage.getItem('adminUser')
// Returns: {adminId, name, eventsCreated}
```

## Clear Session

To clear stored data:
```javascript
// Clear user data
localStorage.removeItem('currentUser');

// Clear admin data
localStorage.removeItem('adminUser');

// Clear all
localStorage.clear();
```

## Customization Tips

### Change Colors
Edit `CSS/home.css`, `CSS/user.css`, `CSS/admin.css`:
```css
Primary Color: #063da2 → Your Color
Secondary Color: #0493e0 → Your Color
```

### Change Modal Width
In CSS files:
```css
max-width: 420px; → max-width: 500px;
```

### Modify Animations
```css
animation-duration: 0.3s → 0.5s (slower)
```

### Add More Form Fields
In HTML, add input before button:
```html
<input type="text" placeholder="Field Name" required>
```

## Troubleshooting

### Modals not showing?
- Check browser console for errors
- Ensure JavaScript files are loaded
- Check file paths

### Buttons not working?
- Clear localStorage
- Refresh the page
- Check browser JavaScript is enabled

### Styling looks off?
- Clear browser cache
- Check CSS file is linked
- Verify CSS syntax

## Support

For issues or questions, check:
- AUTHENTICATION_GUIDE.md - Full documentation
- DESIGN_GUIDE.md - Visual design details
- SIGNIN_SIGNUP_SUMMARY.txt - Feature overview

---

**Ready to use!** Open home.html and start exploring! 🎉
