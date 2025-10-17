# Context System

This directory contains the React Context providers used for state management in the UniClear application.

## AuthContext.jsx

Manages authentication state including:
- Access and refresh tokens
- Authentication status
- Login/logout functionality
- Token refresh mechanisms
- Authenticated fetch wrapper

### Key Functions
- `login(username, password)`: Authenticates user and fetches user data
- `logout()`: Clears authentication state
- `fetchWithAuth(url, options)`: Wrapper for authenticated API calls
- `fetchUserData(token)`: Fetches user dashboard data from backend

## UserContext.jsx

Manages user profile data and loading states:
- User profile information
- Loading status for user data
- Provides user data to components throughout the app

### Key Functions
- `setUser(userData)`: Updates user data in context
- `setLoading(bool)`: Updates loading state

## Usage

Both contexts are provided at the root level in `main.jsx`:

```jsx
<UserProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
</UserProvider>
```

## Hooks

Custom hooks are provided for easy access to context values:

- `useAuth()`: Access authentication state and functions
- `useUser()`: Access user profile data and loading state

## API Endpoints

The contexts interact with the following backend endpoints:

- `POST /user_profile_api/auth/token/`: User authentication
- `POST /user_profile_api/auth/token/refresh/`: Token refresh
- `GET /user_profile_api/dashboard/`: User dashboard data (requires authentication)
- `POST /user_profile_api/auth/token/`: User authentication
- `POST /user_profile_api/auth/token/refresh/`: Token refresh
- `GET /user_profile_api/dashboard/`: User dashboard data (requires authentication)