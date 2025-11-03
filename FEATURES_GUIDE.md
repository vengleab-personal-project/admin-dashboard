# Admin Dashboard - Features Guide

## Quick Start

This guide covers the newly implemented features in the admin dashboard.

## Table of Contents
1. [User Profile Management](#user-profile-management)
2. [Theme Management](#theme-management)
3. [Session Management](#session-management)
4. [Navigation](#navigation)

---

## User Profile Management

### Accessing Your Profile
1. Click on your **avatar** in the top-right header
2. Select **"My Profile"** from the dropdown menu
3. Or navigate directly via URL hash: `#profile`

### Viewing Profile Information
The profile page displays:
- **Profile Picture**: Your current avatar
- **Name**: Your full name
- **Email**: Your email address
- **Role**: Your account role (admin, user, editor)
- **Subscription Tier**: Your current plan (free, pro, enterprise)
- **OAuth Provider**: How you signed in (Google, GitHub)
- **Last Login**: When you last logged in
- **Account Created**: When your account was created

### Editing Your Profile
1. Click the **"Edit Profile"** button
2. Update your information:
   - **Profile Picture**: Enter a URL to your profile image
   - **Full Name**: Update your display name
3. Click **"Save Changes"** to apply
4. Click **"Cancel"** to discard changes

### Usage Statistics
View your account usage:
- **Forms Created**: Total number of forms
- **Fields Generated**: Total fields created
- **API Calls (This Month)**: Current month's API usage
- **Total API Calls**: Lifetime API usage
- **Storage Used**: Storage consumption in MB
- **Last Updated**: When statistics were last calculated

---

## Theme Management

### Switching Themes
- **Method 1**: Click the **sun/moon icon** in the header
  - 🌙 Moon icon = Currently in light mode (click to switch to dark)
  - ☀️ Sun icon = Currently in dark mode (click to switch to light)
- **Automatic**: The dashboard respects your system preference on first load

### Theme Persistence
- Your theme choice is automatically saved
- Returns to your preferred theme on next visit
- Persists across different pages and sessions

### Theme Features
- **Light Mode**: Clean, bright interface optimized for daytime use
- **Dark Mode**: Easy on the eyes, perfect for low-light environments
- **Smooth Transitions**: All theme changes animate smoothly
- **Complete Coverage**: All components support both themes

---

## Session Management

### What are Sessions?
Sessions represent your active login instances across different devices and browsers. Each time you log in, a new session is created.

### Viewing Active Sessions
1. Click on your **avatar** in the header
2. Select **"Active Sessions"** from the dropdown
3. Or navigate via URL hash: `#sessions`

### Session Information
Each session displays:
- **Browser**: Browser name and version
- **Device Type**: Desktop or mobile
- **Operating System**: OS name and version
- **IP Address**: Login IP address
- **Location**: Geographic location (if available)
- **Last Activity**: When the session was last used
- **Expires**: When the session will expire
- **Status Badge**: Active/Inactive indicator

### Managing Sessions

#### Revoking a Single Session
1. Find the session you want to revoke
2. Click the **"Revoke"** button for that session
3. Confirm the action
4. The session will be immediately invalidated

#### Revoking All Other Sessions
1. Click **"Revoke All Other Sessions"** at the top
2. Confirm the action
3. All sessions except your current one will be revoked
4. You'll remain logged in on your current device

### When to Revoke Sessions
- You see an unfamiliar device or location
- You logged in from a public computer and forgot to log out
- You want to ensure only your current device has access
- You're changing your password
- You suspect unauthorized access

### Security Best Practices
- ✅ Regularly review your active sessions
- ✅ Revoke sessions from devices you no longer use
- ✅ Revoke all sessions if you suspect unauthorized access
- ✅ Be cautious with public/shared computers
- ✅ Note unfamiliar IP addresses or locations

---

## Navigation

### Header Menu
Click your avatar to access:
- **My Profile**: View and edit your profile
- **Active Sessions**: Manage your login sessions
- **Logout**: Sign out of your account

### Hash-Based Navigation
You can bookmark or share direct links:
- Profile: `#profile`
- Sessions: `#sessions`
- Dashboard: `#` or no hash

### Sidebar Navigation
Access main sections:
- **Dashboard**: Overview and statistics
- **Users**: User management (admin only)
- **Subscriptions**: Subscription management
- **Policies**: ABAC policy management

---

## Keyboard Shortcuts

While no keyboard shortcuts are currently implemented, future versions may include:
- `Ctrl/Cmd + K`: Search
- `Ctrl/Cmd + T`: Toggle theme
- `Ctrl/Cmd + P`: Open profile

---

## Troubleshooting

### Profile Won't Update
- Check your internet connection
- Ensure you have permission to update your profile
- Try refreshing the page
- Check the browser console for errors

### Theme Not Persisting
- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Ensure cookies are not being cleared on exit

### Sessions Not Loading
- Verify you're logged in
- Check your authentication token
- Try logging out and back in
- Contact support if the issue persists

### Can't Revoke Session
- Ensure you have an active internet connection
- You cannot revoke your current session
- Try refreshing the page
- Check if the session has already expired

---

## Support

For additional help:
1. Check the `IMPLEMENTATION_SUMMARY.md` for technical details
2. Review the `CHANGELOG.md` for recent changes
3. Contact your system administrator
4. Submit an issue on the project repository

---

## Tips & Tricks

### Profile Management
- Use high-quality avatar images (recommended: 200x200px minimum)
- Update your profile regularly to keep information current
- Monitor your usage statistics to stay within limits

### Theme Usage
- Use dark mode in low-light environments to reduce eye strain
- Use light mode for better readability in bright environments
- The system will remember your preference

### Session Security
- Set up a routine to check sessions weekly
- Revoke old sessions you don't recognize
- Use the "Revoke All" feature when traveling
- Monitor for unusual locations or devices

---

## FAQ

**Q: How long do sessions last?**
A: Sessions expire based on the token expiration time, typically 24 hours of inactivity.

**Q: Can I have multiple active sessions?**
A: Yes, you can be logged in on multiple devices simultaneously.

**Q: What happens when I revoke all sessions?**
A: All other devices will be logged out, but your current session remains active.

**Q: Will my theme choice affect other users?**
A: No, theme preferences are stored locally per user.

**Q: Can I see session history?**
A: Currently, only active sessions are shown. Historical data may be added in future updates.

**Q: How accurate is the location information?**
A: Location is based on IP geolocation and may not always be precise.

