# SocietySync Frontend Architecture Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Frontend Architecture](#frontend-architecture)
4. [Component Structure](#component-structure)
5. [State Management](#state-management)
6. [Routing](#routing)
7. [UI/UX Design](#uiux-design)
8. [Performance Optimization](#performance-optimization)

## Introduction

SocietySync's frontend is built with React and modern web technologies to provide a seamless user experience. This document outlines the frontend architecture, component structure, and design principles.

## System Overview

### Core Technologies
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + Custom Hooks
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **UI Components**: Custom Components + Lucide React
- **Animations**: Framer Motion

### Key Features
- Responsive Design
- Dark/Light Mode
- Real-time Updates
- Progressive Web App (PWA)
- Offline Support
- Accessibility (WCAG 2.1)

## Frontend Architecture

### Directory Structure
```
Client/
├── public/              # Static assets
├── src/
│   ├── components/     # Reusable components
│   │   ├── common/    # Shared components
│   │   ├── layout/    # Layout components
│   │   └── features/  # Feature-specific components
│   ├── pages/         # Page components
│   ├── context/       # React Context
│   ├── hooks/         # Custom hooks
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   ├── styles/        # Global styles
│   └── assets/        # Images, icons, etc.
└── package.json
```

### Component Architecture

#### 1. Common Components
```jsx
// Example Button Component
const Button = ({ variant, children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md transition-all";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};
```

#### 2. Layout Components
```jsx
// Example Layout Structure
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        {children}
      </main>
    </div>
  );
};
```

#### 3. Feature Components
```jsx
// Example Maintenance Request Component
const MaintenanceRequest = () => {
  const [formData, setFormData] = useState({});
  const { createRequest } = useMaintenance();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRequest(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## State Management

### Context Structure
```jsx
// Example Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    // Login logic
  };

  const logout = () => {
    // Logout logic
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Custom Hooks
```jsx
// Example useAuth Hook
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## Routing

### Route Structure
```jsx
// Example Route Configuration
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      
      <Route path="/dashboard" element={<PrivateLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="events" element={<Events />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
```

## UI/UX Design

### Design System
- **Colors**
  ```css
  :root {
    --primary: #3B82F6;
    --secondary: #6B7280;
    --success: #10B981;
    --danger: #EF4444;
    --warning: #F59E0B;
  }
  ```

- **Typography**
  ```css
  :root {
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-heading: 'Poppins', sans-serif;
  }
  ```

### Responsive Design
```jsx
// Example Responsive Component
const ResponsiveGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
};
```

## Performance Optimization

### Code Splitting
```jsx
// Example Lazy Loading
const Maintenance = lazy(() => import('./pages/Maintenance'));
const Events = lazy(() => import('./pages/Events'));
```

### Image Optimization
```jsx
// Example Image Component
const OptimizedImage = ({ src, alt, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-auto"
      {...props}
    />
  );
};
```

### Caching Strategy
```jsx
// Example API Caching
const useCachedData = (key, fetchData) => {
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    if (!data) {
      fetchData().then(newData => {
        setData(newData);
        localStorage.setItem(key, JSON.stringify(newData));
      });
    }
  }, [key, data, fetchData]);

  return data;
};
```

## Best Practices

1. **Component Design**
   - Single Responsibility Principle
   - Composition over Inheritance
   - Props Validation
   - Error Boundaries

2. **Performance**
   - Memoization
   - Virtual Scrolling
   - Code Splitting
   - Bundle Optimization

3. **Accessibility**
   - Semantic HTML
   - ARIA Labels
   - Keyboard Navigation
   - Screen Reader Support

4. **Testing**
   - Unit Tests
   - Integration Tests
   - E2E Tests
   - Performance Tests

## Conclusion

This documentation provides a comprehensive overview of the SocietySync frontend architecture. The system is designed to be maintainable, scalable, and user-friendly. For any specific questions or clarifications, please refer to the component documentation or contact the development team. 