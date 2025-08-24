# TimeTrackr 🕒

A modern, full-stack time tracking application built with React and Node.js. TimeTrackr helps you manage tasks, track time spent on projects, and generate insightful reports about your productivity.

## ✨ Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Task Management**: Create, update, and organize your tasks
- **Time Tracking**: Track time spent on specific tasks with start/stop functionality
- **Admin Dashboard**: Administrative interface for user management
- **Reports & Analytics**: Generate detailed reports with charts and data visualization
- **CSV Export**: Export your time data for external analysis
- **Responsive Design**: Modern UI built with Tailwind CSS that works on all devices
- **Dark Mode**: Elegant dark theme for comfortable extended use

## 🏗️ Project Structure

```
TimeTrackr/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── Timer.jsx
│   │   ├── pages/          # Main application pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── AdminDashboard.jsx
│   │   └── App.js
│   ├── public/
│   └── package.json
├── backend/                # Node.js/Express API server
│   ├── models/             # MongoDB data models
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── TimeLog.js
│   ├── routes/             # API route handlers
│   │   ├── auth.js         # Authentication endpoints
│   │   ├── tasks.js        # Task management endpoints
│   │   ├── timelogs.js     # Time logging endpoints
│   │   └── admin.js        # Admin functionality endpoints
│   ├── middleware/         # Custom middleware
│   │   └── auth.js         # JWT authentication middleware
│   ├── index.js            # Main server file
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (v4.4 or higher) - either locally or via MongoDB Atlas

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshil748/TimeTrackr.git
   cd TimeTrackr
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Environment Configuration

1. **Backend Environment Variables**
   
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5050
   MONGO_URI=mongodb://127.0.0.1:27017/timetrackr
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   ```

   For MongoDB Atlas, use:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/timetrackr
   ```

2. **Frontend Configuration**
   
   The frontend is configured to connect to `http://localhost:5050` by default.

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The API server will run on `http://localhost:5050`

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm start
   ```
   The React app will run on `http://localhost:3000`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - Create a new account or log in to start tracking time!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/test` - Test authentication route

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/user/:userId` - Get tasks for specific user (admin only)

### Time Logs
- `GET /api/timelogs` - Get all time logs for authenticated user
- `POST /api/timelogs` - Create a new time log

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/user/:id` - Delete a user (admin only)

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # If you have nodemon configured
# or
node index.js
```

### Frontend Development
```bash
cd client
npm start    # Runs in development mode with hot reload
npm test     # Run tests
npm run build # Build for production
```

### Building for Production

1. **Build the Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Serve the built files**
   The built files will be in `client/build/` and can be served by your backend or any static file server.

## 🧪 Testing

### Frontend Tests
```bash
cd client
npm test
```

### Backend Tests
Currently, backend tests are not implemented. To add tests:
```bash
cd backend
npm install --save-dev jest supertest
# Add test scripts to package.json
```

## 🐳 Docker Support

*Docker configuration is not currently implemented but can be added for easy deployment.*

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Passwords are hashed using bcryptjs
- **CORS Protection**: Configured for cross-origin requests
- **Admin Authorization**: Protected admin routes with role-based access
- **Input Validation**: Server-side validation for all API endpoints

## 🎨 Tech Stack

### Frontend
- **React** 18.3.1 - Component-based UI library
- **React Router** 7.6.2 - Client-side routing
- **Tailwind CSS** 3.4.3 - Utility-first CSS framework
- **Recharts** 2.15.3 - Charting library for data visualization
- **Axios** 1.10.0 - HTTP client for API requests
- **React CSV** 2.2.2 - CSV export functionality

### Backend
- **Node.js** - JavaScript runtime
- **Express** 5.1.0 - Web application framework
- **MongoDB** with **Mongoose** 8.15.1 - Database and ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.5.0 - Environment variable management

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (required, unique),
  password: String (required, hashed),
  isAdmin: Boolean (default: false)
}
```

### Task Model
```javascript
{
  user: ObjectId (ref: User),
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  createdAt: Date (default: now)
}
```

### TimeLog Model
```javascript
{
  user: ObjectId (ref: User),
  task: ObjectId (ref: Task),
  startTime: Date,
  endTime: Date,
  duration: Number (in seconds)
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Harshil** - [harshil748](https://github.com/harshil748)

## 🐛 Known Issues & Future Enhancements

- Add comprehensive test coverage
- Implement real-time notifications
- Add project/category grouping for tasks
- Implement time tracking goals and targets
- Add team collaboration features
- Mobile app development
- Docker containerization for easy deployment

---

**Happy Time Tracking! ⏰**