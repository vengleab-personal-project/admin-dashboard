# Admin Dashboard - Connected to Backend API

A modern admin dashboard for managing users, subscriptions, and ABAC policies, now fully integrated with the Node.js backend API.

## 🎯 Features

- **OAuth Authentication**: Login with Google or GitHub
- **User Management**: View and manage all users with their subscription tiers
- **Subscription Dashboard**: Monitor and upgrade subscription plans
- **ABAC Policies**: View and manage access control policies
- **Real-time Usage Tracking**: Monitor API calls, forms, and fields
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd admin-dashboard
pnpm install
# or
npm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
cp env.example .env
```

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_FRONTEND_URL=http://localhost:5174
```

### 3. Start the Backend

Make sure the backend API is running:

```bash
cd ../backend
npm run dev
```

Backend should be running at `http://localhost:3001`

### 4. Start the Admin Dashboard

```bash
pnpm dev
# or
npm run dev
```

Dashboard will open at `http://localhost:5174`

## 🔐 Authentication Flow

1. Click "Continue with Google" or "Continue with GitHub"
2. Complete OAuth authentication
3. You'll be redirected back with auth tokens
4. Dashboard automatically loads your data

## 📊 Available Pages

### Dashboard
- **Overview metrics**: Revenue, subscriptions, API calls, active users
- **API Usage Chart**: 7-day usage trends
- **Billing Stats**: Monthly revenue trends

### Users
- View all registered users
- See OAuth provider (Google/GitHub)
- Check subscription tiers
- Monitor user status

### Subscriptions
- **Current subscription**: View your plan and usage
- **Usage meters**: Track forms, API calls, and fields
- **Available plans**: Free, Pro, Enterprise
- **Upgrade/downgrade**: Switch plans instantly

### Policies
- View ABAC policies
- See policy conditions and priorities
- Manage access control rules

## 🔧 API Integration

The dashboard uses the following services:

### Authentication (`services/auth.service.ts`)
- OAuth login (Google, GitHub)
- JWT token management
- Auto token refresh

### Users (`services/user.service.ts`)
- Get all users
- Get user details and stats
- Update user information

### Subscriptions (`services/subscription.service.ts`)
- Get current subscription
- Check usage limits
- Upgrade/downgrade plans
- Calculate overage charges

### Policies (`services/policy.service.ts`)
- List ABAC policies
- Create/update policies
- Enable/disable policies

### Usage (`services/usage.service.ts`)
- Get current month usage
- View usage history
- Track usage events

## 📁 Project Structure

```
admin-dashboard/
├── components/
│   ├── layout/          # Sidebar, Header
│   ├── ui/              # Reusable UI components
│   └── icons/           # Icon components
├── context/
│   └── AuthContext.tsx  # Authentication state
├── pages/
│   ├── DashboardPage.tsx
│   ├── UsersPage.tsx
│   ├── SubscriptionsPage.tsx
│   ├── PoliciesPage.tsx
│   ├── LoginPage.tsx
│   └── OAuthCallbackPage.tsx
├── services/
│   ├── api.service.ts   # Axios configuration
│   ├── auth.service.ts  # Authentication
│   ├── user.service.ts  # User management
│   ├── subscription.service.ts
│   ├── policy.service.ts
│   └── usage.service.ts
├── config.ts            # App configuration
├── types.ts             # TypeScript types
└── App.tsx              # Main app component
```

## 🔒 Security

- **JWT Tokens**: Stored in localStorage
- **Auto Token Refresh**: Tokens automatically refreshed on expiry
- **Protected Routes**: Dashboard requires authentication
- **CORS**: Configured for backend API
- **Secure OAuth**: State parameter prevents CSRF

## 🎨 UI Components

Built with custom components:
- **Button**: Primary, outline, ghost variants
- **Card**: Header, content, footer sections
- **Badge**: Success, warning, destructive variants
- **Charts**: Line and bar charts using Recharts

## 📱 Responsive Design

- **Mobile**: Collapsible sidebar, optimized layouts
- **Tablet**: Adaptive grid layouts
- **Desktop**: Full sidebar, multi-column grids

## 🐛 Troubleshooting

### "Failed to fetch users"
- Ensure backend is running at `http://localhost:3001`
- Check OAuth authentication is complete
- Verify user has admin role

### "OAuth callback missing tokens"
- Check backend OAuth credentials
- Verify redirect URLs match in OAuth app settings
- Ensure frontend URL is correct in backend config

### "CORS error"
- Backend must allow requests from `http://localhost:5174`
- Check `FRONTEND_URL` in backend `.env`

### "Token expired"
- Tokens auto-refresh, but you may need to re-login
- Clear localStorage and login again

## 🔄 Development

### Hot Reload
Code changes automatically refresh the page

### Type Safety
Full TypeScript support with strict mode

### Linting & Formatting
```bash
pnpm lint
pnpm format
```

## 🏗️ Building for Production

```bash
pnpm build
```

Built files will be in `dist/` directory.

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set environment variables
3. Build command: `pnpm build`
4. Output directory: `dist`

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3001/api` |
| `VITE_FRONTEND_URL` | Frontend URL for OAuth | `http://localhost:5174` |

## 🚀 Next Steps

1. **Complete OAuth Setup**: Configure Google/GitHub OAuth apps
2. **Start Backend**: Ensure API is running
3. **Login**: Use OAuth to authenticate
4. **Explore**: Navigate through all dashboard pages

## 📖 API Documentation

See `/backend/README.md` for complete API documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License

---

**Built with React, TypeScript, and ❤️**
