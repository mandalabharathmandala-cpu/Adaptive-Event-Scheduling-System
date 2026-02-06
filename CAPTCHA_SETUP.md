# CAPTCHA Setup Guide

## Overview
This guide explains how to set up Google reCAPTCHA v2 (Checkbox) for your EventFlow application's sign-in pages.

## Step 1: Get reCAPTCHA Keys from Google

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Click the **"+"** button to create a new site
4. Fill in the following details:
   - **Label**: EventFlow
   - **reCAPTCHA type**: Select "reCAPTCHA v2" → "I'm not a robot" Checkbox
   - **Domains**: 
     - `localhost` (for development)
     - Add your domain when deploying to production
5. Accept the reCAPTCHA Terms of Service
6. Click **Submit**
7. Copy your keys:
   - **Site Key** (public)
   - **Secret Key** (private)

## Step 2: Configure Frontend

### Update home.html
Replace `YOUR_RECAPTCHA_SITE_KEY` in [home.html](home.html) with your Site Key:

```html
<div class="g-recaptcha" data-sitekey="YOUR_ACTUAL_SITE_KEY"></div>
```

**Current locations:**
- User Sign In Modal (line ~50)
- Admin Sign In Modal (line ~70)

## Step 3: Configure Backend

### Create .env file in backend directory
Create a file at `backend/.env`:

```env
RECAPTCHA_SECRET_KEY=YOUR_ACTUAL_SECRET_KEY
JWT_SECRET=your-jwt-secret-key
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
```

**⚠️ IMPORTANT**: Add `.env` to your `.gitignore` file to prevent exposing sensitive keys:
```
.env
node_modules/
```

### Update backend/.env template
Create `backend/.env.example` for reference (without actual keys):
```env
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
JWT_SECRET=your_jwt_secret_key_here
DB_HOST=localhost
DB_USER=db_user
DB_PASSWORD=db_password
DB_NAME=eventflow_db
```

## Step 4: Install Dependencies

Run in the backend directory:

```bash
npm install
```

This will install `axios` which is used for CAPTCHA verification.

## Step 5: Test the Setup

### Sign In with CAPTCHA
1. Start your backend server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

2. Open `home.html` in your browser
3. Click "User Sign In"
4. Fill in email and password
5. Click the CAPTCHA checkbox - you should see: **"I'm not a robot"**
6. Complete the CAPTCHA challenge if required
7. Click "Sign In" - the form should now validate with CAPTCHA

## How CAPTCHA Works in Your App

### Frontend Process
1. User enters email and password
2. User clicks CAPTCHA checkbox
3. Google reCAPTCHA generates a token
4. JavaScript function `onUserSigninCaptchaSuccess()` captures the token
5. User clicks "Sign In"
6. Form validation checks if CAPTCHA token exists
7. Token is sent to backend with login credentials

### Backend Process
1. Backend receives login request with CAPTCHA token
2. Calls `verifyCaptcha()` function
3. Sends token to Google's verification API
4. Google returns success/failure
5. If CAPTCHA valid AND credentials correct → User signed in
6. If CAPTCHA invalid → Error: "CAPTCHA verification failed"

## CAPTCHA Verification Endpoints

### User Sign In
- **Endpoint**: `POST /api/auth/signin`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "captchaToken": "03AOLTBLQxyz..."
  }
  ```

### Admin Sign In
- **Endpoint**: `POST /api/auth/admin-signin`
- **Body**:
  ```json
  {
    "adminId": "admin123",
    "password": "password123",
    "captchaToken": "03AOLTBLQxyz..."
  }
  ```

## Error Handling

### Common Errors

1. **"Please verify CAPTCHA"**
   - User didn't complete CAPTCHA challenge
   - Solution: Click CAPTCHA checkbox and complete the verification

2. **"CAPTCHA verification failed"**
   - Invalid or expired CAPTCHA token
   - Solution: The CAPTCHA times out after 2 minutes. Try again.

3. **"Invalid reCAPTCHA keys"**
   - Site Key or Secret Key is wrong
   - Solution: Check your keys in Google reCAPTCHA Admin Console

4. **Network requests failing**
   - Backend can't reach Google's verification API
   - Solution: Check internet connection and Google API availability

## Security Best Practices

✅ **DO:**
- Keep your Secret Key private (never expose in frontend)
- Store keys in `.env` environment variables
- Add `.env` to `.gitignore`
- Use HTTPS in production
- Verify CAPTCHA on the backend (don't trust frontend validation alone)

❌ **DON'T:**
- Commit `.env` file to git
- Expose Secret Key in client-side code
- Hardcode keys in the application
- Use old reCAPTCHA v1

## Update for Production

When deploying to production:

1. Add your production domain to reCAPTCHA settings:
   - Google reCAPTCHA Admin Console
   - Select your site
   - Add domain under "Domains"

2. Update environment variables:
   ```env
   # In your production environment (e.g., Heroku, AWS, Docker)
   RECAPTCHA_SECRET_KEY=your_production_secret_key
   RECAPTCHA_SITE_KEY=your_production_site_key
   ```

3. Update Site Key in production home.html if using different keys

## Troubleshooting

### CAPTCHA Not Showing
- Check browser console for JavaScript errors (F12)
- Verify reCAPTCHA script is loaded: 
  ```html
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  ```
- Check if domain is added to reCAPTCHA settings

### CAPTCHA Verification Always Failing
- Verify `RECAPTCHA_SECRET_KEY` in `.env` is correct
- Check backend console for errors
- Test with curl:
  ```bash
  curl -X POST https://www.google.com/recaptcha/api/siteverify \
    -d "secret=YOUR_SECRET_KEY" \
    -d "response=CAPTCHA_TOKEN"
  ```

### Mixed Content Error (HTTPS site + HTTP content)
- Ensure reCAPTCHA script uses HTTPS:
  ```html
  <script src="https://www.google.com/recaptcha/api.js"></script>
  ```

## Files Modified

✏️ **Frontend:**
- [home.html](home.html) - Added reCAPTCHA script and form fields
- [CSS/home.css](CSS/home.css) - Added CAPTCHA styling
- [JS/home.js](JS/home.js) - Added CAPTCHA token handling

✏️ **Backend:**
- [backend/routes/auth.js](backend/routes/auth.js) - Added CAPTCHA verification
- [backend/package.json](backend/package.json) - Added axios dependency
- [backend/.env](.env) - **NEW**: Environment variables

## Support

For issues with:
- **Google reCAPTCHA**: [reCAPTCHA Docs](https://developers.google.com/recaptcha/docs/v2)
- **Your App**: Check the browser console (F12) and backend server logs
- **Verification API**: [Test reCAPTCHA Integration](https://developers.google.com/recaptcha/docs/verify)

---

**Last Updated**: February 6, 2026
