# SocietySync Backend Architecture Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Backend Architecture](#backend-architecture)
4. [Database Design](#database-design)
5. [API Endpoints](#api-endpoints)
6. [Authentication Flow](#authentication-flow)
7. [Security Measures](#security-measures)
8. [Deployment](#deployment)

## Introduction

SocietySync is a comprehensive society management system that streamlines residential complex operations. This document focuses on explaining the backend architecture and how different components work together.

## System Overview

### Core Components
- **User Management System**
- **Society Management Module**
- **Maintenance System**
- **Event Management**
- **Payment Processing**
- **Notification System**

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + Passport.js
- **File Storage**: Multer
- **API Documentation**: Swagger

## Backend Architecture

### Directory Structure
```
Server/
├── app.js              # Main application file
├── configs/            # Configuration files
│   ├── database.js     # Database configuration
│   └── passport.js     # Authentication configuration
├── middlewares/        # Custom middlewares
│   ├── auth.js         # Authentication middleware
│   └── upload.js       # File upload middleware
├── models/            # Database models
│   ├── User.js        # User model
│   ├── Society.js     # Society model
│   └── Maintenance.js # Maintenance model
└── routes/            # API routes
    ├── auth.js        # Authentication routes
    ├── society.js     # Society management routes
    └── maintenance.js # Maintenance routes
```

### Key Components Explanation

#### 1. User Management
- **Registration Flow**
  ```javascript
  // Example registration flow
  User.register -> Validate Data -> Hash Password -> Create User -> Generate JWT
  ```
- **Authentication Flow**
  ```javascript
  // Example authentication flow
  User.login -> Verify Credentials -> Generate JWT -> Set Cookies
  ```

#### 2. Society Management
- **Society Creation**
  ```javascript
  // Example society creation
  Create Society -> Assign Admin -> Setup Default Settings -> Initialize Modules
  ```
- **Member Management**
  ```javascript
  // Example member management
  Add Member -> Assign Role -> Set Permissions -> Send Invitation
  ```

#### 3. Maintenance System
- **Request Flow**
  ```javascript
  // Example maintenance request
  Create Request -> Assign Worker -> Track Progress -> Update Status
  ```
- **Worker Assignment**
  ```javascript
  // Example worker assignment
  Analyze Request -> Match Skills -> Check Availability -> Assign Task
  ```

## Database Design

### Collections Structure

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  role: String,
  profile: {
    name: String,
    phone: String,
    address: String
  },
  societyId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

#### Societies Collection
```javascript
{
  _id: ObjectId,
  name: String,
  address: String,
  adminId: ObjectId,
  members: [{
    userId: ObjectId,
    role: String,
    joinedAt: Date
  }],
  settings: {
    maintenanceFee: Number,
    paymentDue: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Maintenance Collection
```javascript
{
  _id: ObjectId,
  societyId: ObjectId,
  requestedBy: ObjectId,
  assignedTo: ObjectId,
  type: String,
  description: String,
  status: String,
  priority: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication
```
POST /api/auth/register    # Register new user
POST /api/auth/login       # User login
POST /api/auth/logout      # User logout
GET  /api/auth/profile     # Get user profile
```

### Society Management
```
POST   /api/society/create     # Create new society
GET    /api/society/:id        # Get society details
PUT    /api/society/:id        # Update society
DELETE /api/society/:id        # Delete society
```

### Maintenance
```
POST   /api/maintenance/create    # Create maintenance request
GET    /api/maintenance/:id       # Get request details
PUT    /api/maintenance/:id       # Update request
GET    /api/maintenance/list      # List all requests
```

## Authentication Flow

1. **Registration Process**
   - User submits registration form
   - Backend validates data
   - Password is hashed
   - User document is created
   - JWT token is generated
   - Response sent to client

2. **Login Process**
   - User submits credentials
   - Backend verifies password
   - JWT token is generated
   - Token stored in cookies
   - User data sent to client

3. **Protected Routes**
   - Request includes JWT
   - Middleware verifies token
   - User data attached to request
   - Route handler processes request

## Security Measures

1. **Password Security**
   - Bcrypt hashing
   - Salt rounds: 10
   - Password complexity requirements

2. **JWT Security**
   - Token expiration: 24 hours
   - Refresh token mechanism
   - Secure cookie storage

3. **API Security**
   - Rate limiting
   - CORS configuration
   - Input validation
   - XSS protection

## Deployment

### Production Environment
- **Server**: Node.js on VPS
- **Database**: MongoDB Atlas
- **Storage**: AWS S3
- **CDN**: Cloudflare

### Deployment Process
1. Code pushed to repository
2. CI/CD pipeline triggered
3. Tests run automatically
4. Build created
5. Deployed to production

### Monitoring
- Error tracking
- Performance monitoring
- User analytics
- Server health checks

## Conclusion

This documentation provides a comprehensive overview of the SocietySync backend architecture. The system is designed to be scalable, secure, and maintainable. For any specific questions or clarifications, please refer to the API documentation or contact the development team. 