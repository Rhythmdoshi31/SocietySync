# SocietySync 🏢

A modern responsive web application for managing and streamlining society/residential complex operations. 

Choose from our flexible pricing models designed for societies of all sizes.

## 🔗 Live Demo

- https://society-sync-neon.vercel.app/dashboard

*Note: For demo access, please use the following credentials:*
- **Admin**: hiro@shi.ma / nagasaki
- **Resident**: **Create new!**
- **Worker**: mani@ram.com / nagasaki

## 🌟 Features

- **Society Management**
  - Resident profiles with detailed information
  - Committee management and elections
  - Digital notice board with categories
  - Event management and RSVP system
  - Maintenance request tracking
  - Payment and dues management
  - Document management system
  - Visitor controls and details
  - Skill-based worker matching
  - Emergency calling system with direct contact to Admin:

- **User Authentication & Role Management**
  - Secure login/signup system
  - Role-based access control (RBAC)
  - JWT-based authentication
  - Session management

- **User Roles & Permissions**
  - **Admin**
    - Full system access and control
    - Manage all users and their roles
    - Oversee society finances and budgets
    - Approve maintenance requests
    - Post notices and announcements
    - Generate reports and analytics
    - Manage society policies and rules
    - View visitors and reports

  - **Resident**
    - View and update personal profile
    - View new Events and notice boards
    - Submit maintenance requests
    - View society notices and announcements
    - Participate in society events
    - Pay maintenance dues
    - Access community forums
    - Book common facilities

  - **Worker/Staff**
    - View assigned maintenance tasks
    - Update task status
    - Access work schedules
    - Submit work reports
    - View assigned areas
    - Smart tark assignment

## 🚀 Upcoming Features

- Group chats between residents
- Online society mart
- Local vendor marketplace
- Digital payment integration
- Smart parking management

## 🔮 Future Vision
- AI-powered predictive maintenance
- Automated complaint resolution
- Intelligent resource allocation
- Advanced analytics dashboard
- Blockchain-based voting system
- AR-based facility navigation

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Swiper
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Passport.js
- Multer (File Upload)
- Bcrypt (Password Hashing)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/SocietySync.git
cd SocietySync
```

2. Install Frontend Dependencies
```bash
cd Client
npm install
```

3. Install Backend Dependencies
```bash
cd ../Server
npm install
```

4. Environment Setup
Create a `.env` file in the Server directory with the following variables:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Running the Application

1. Start the Backend Server
```bash
cd Server
npm start
```

2. Start the Frontend Development Server
```bash
cd Client
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
SocietySync/
├── Client/                 # Frontend React application
│   ├── public/            # Static files
│   │   └── index.html
│   ├── src/              # Source files
│   │   ├── components/   # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── utils/       # Utility functions
│   └── package.json
│
└── Server/                # Backend Node.js application
    ├── configs/          # Configuration files
    ├── middlewares/      # Express middlewares
    ├── models/          # Mongoose models
    ├── routes/          # API routes
    └── app.js           # Main application file
```

## 🔒 Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- CORS protection
- Secure session management
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries 
