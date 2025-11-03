# Changelog

All notable changes to the Admin Dashboard will be documented in this file.

## [Unreleased] - 2024-11-03

### Added

#### Role-Based Access Control
- Implemented `ProtectedRoute.tsx` component for frontend route protection
- Added admin-only access enforcement for Users and Policies pages
- Integrated with backend ABAC (Attribute-Based Access Control) system
- Created comprehensive access control with both UI and API protection

#### User Profile Management
- Created `ProfilePage.tsx` with full profile editing capabilities
- Added user statistics display (forms, fields, API calls, storage)
- Implemented profile image upload via URL
- Added account information section

#### Theme Management
- Created `ThemeContext.tsx` for centralized theme management
- Added theme toggle button in header with sun/moon icons
- Implemented localStorage persistence for theme preference
- Added system theme preference detection
- Applied dark/light mode classes across all components

#### Session Management System
- **Backend**:
  - Created session model (`backend/src/models/session.model.ts`)
  - Implemented session repository with full CRUD operations
  - Added session service with token hashing and user agent parsing
  - Integrated session creation into OAuth flow
  - Added session management endpoints to auth routes
  
- **Frontend**:
  - Created session service (`services/session.service.ts`)
  - Implemented `SessionsPage.tsx` for viewing and managing sessions
  - Added session list with device information and activity tracking
  - Implemented session revocation (individual and bulk)

### Changed

#### Header Component
- Updated to display actual user data from AuthContext
- Added user dropdown menu with profile actions
- Integrated theme toggle functionality
- Improved styling for dark/light mode consistency
- Added proper avatar handling with fallback

#### Sidebar Component
- Updated theme classes for better dark/light mode support
- Fixed background and border colors
- Improved text contrast in both themes

#### App Component
- Added ProfilePage and SessionsPage to routing
- Implemented hash-based navigation
- Added ThemeProvider wrapper
- Enhanced page switching logic

#### Types
- Added `Session` interface with full session metadata
- Extended `Page` type to include 'profile' and 'sessions'
- Updated type definitions for better type safety

#### OAuth Service
- Integrated session creation on successful authentication
- Added IP address and user agent capture
- Enhanced logout to revoke sessions
- Added metadata parameters for session tracking

### Dependencies

#### Backend
- Added `ua-parser-js` (^1.0.37) for user agent parsing
- Added `uuid` (^9.0.1) for session ID generation
- Added corresponding TypeScript types

### Fixed
- Header now shows real user information instead of hardcoded data
- Theme persistence across page reloads
- Proper dark/light mode contrast throughout the application
- Avatar display with proper fallback handling

### Security
- Implemented SHA-256 token hashing for session storage
- Added session expiration management
- Activity-based session tracking
- Secure session revocation mechanisms

## API Changes

### New Endpoints
- `GET /auth/sessions` - Get all user sessions
- `GET /auth/sessions/active` - Get active sessions only
- `DELETE /auth/sessions/:sessionId` - Revoke specific session
- `POST /auth/sessions/revoke-all` - Revoke all sessions except current

### Modified Endpoints
- `POST /auth/logout` - Now handles session revocation
- OAuth callbacks now capture and create sessions

### Removed

#### Unused Code Cleanup
- Removed `hooks/useRoleCheck.ts` (unused)
- Deleted outdated `RBAC_IMPLEMENTATION.md` (replaced by ABAC)
- Deleted redundant `CHANGES_SUMMARY.txt` (consolidated in CHANGELOG)

## Breaking Changes
None

## Migration Guide
No migration required for existing installations. New features are additive.

## Documentation
- Added `IMPLEMENTATION_SUMMARY.md` with detailed implementation notes
- Updated inline code documentation
- Added JSDoc comments to new services and methods

