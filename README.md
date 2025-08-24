# TimeTrackr

A full-stack time tracking application that allows users to manage tasks and track time spent on various activities. The application includes user authentication, task management, time logging, reporting features, and admin functionality.

## Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Task Management**: Create, update, delete, and organize tasks
- **Time Tracking**: Log start/end times for tasks with duration tracking
- **Reporting**: View time reports and analytics
- **Admin Dashboard**: Administrative features for user management
- **Responsive Design**: Clean, modern UI with dark theme support

## Tech Stack

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React** with **React Router** for navigation
- **Axios** for API requests
- **Recharts** for data visualization
- **Tailwind CSS** for styling
- **React CSV** for data export

## Project Structure

```
TimeTrackr/
├── backend/
│   ├── models/          # MongoDB models (User, Task, TimeLog)
│   ├── routes/          # API routes (auth, tasks, timelogs, admin)
│   ├── middleware/      # Authentication middleware
│   ├── index.js         # Express server setup
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components (Dashboard, Reports, etc.)
│   │   ├── App.js       # Main React app with routing
│   │   └── index.js     # React app entry point
│   ├── public/
│   └── package.json
└── README.md
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally or connection string to MongoDB Atlas)

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/harshil748/TimeTrackr.git
cd TimeTrackr
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Note**: You may need to install additional dependencies that are used in the code:
```bash
npm install bcryptjs jsonwebtoken
```

Create a `.env` file in the backend directory with the following variables:
```env
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017/timetrackr
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

## Running the Application

### Start the Backend Server
```bash
cd backend
node index.js
```
The backend server will run on `http://localhost:5050`

### Start the Frontend Development Server
```bash
cd client
npm start
```
The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Time Logs
- `GET /api/timelogs` - Get user's time logs
- `POST /api/timelogs` - Create time log entry

### Admin (Admin access required)
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/user/:id` - Delete user

## Usage

1. **Sign up** for a new account or **log in** with existing credentials
2. **Create tasks** to organize your work
3. **Start tracking time** for specific tasks
4. **View reports** to analyze your time usage
5. **Export data** in CSV format for external analysis
6. **Admin users** can manage other users through the admin dashboard

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Created by [harshil748](https://github.com/harshil748)