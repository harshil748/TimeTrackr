# TimeTrackr

A comprehensive time tracking application built with React and Node.js that helps users manage tasks, track time, and generate detailed reports.

## Features

- **User Authentication**: Secure login and registration system with JWT authentication
- **Task Management**: Create, update, and delete tasks with descriptions
- **Time Logging**: Track time spent on various tasks with start/stop functionality
- **Admin Dashboard**: Administrative interface for managing users and viewing all tasks
- **Reports Generation**: Generate detailed time tracking reports with data visualization
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **CSV Export**: Export time tracking data in CSV format

## Tools and Technologies Used

### Frontend
- **React.js**: Main frontend framework for building the user interface
- **React Router DOM**: Client-side routing for single-page application navigation
- **Tailwind CSS**: Utility-first CSS framework for responsive design and styling
- **PostCSS**: CSS post-processor for enhanced styling capabilities
- **Autoprefixer**: Automatic CSS vendor prefixing
- **Axios**: HTTP client for API communication
- **Recharts**: Data visualization library for generating charts and graphs
- **React CSV**: Library for CSV file generation and export
- **PapaParse**: CSV parsing library for data processing

### Backend
- **Node.js**: JavaScript runtime environment for server-side development
- **Express.js**: Web application framework for building RESTful APIs
- **Mongoose**: MongoDB object modeling library for Node.js
- **JSON Web Tokens (JWT)**: Secure authentication and authorization
- **CORS**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management

### Database
- **MongoDB**: NoSQL document database for data storage

### Development Tools
- **Create React App**: React application bootstrapping and development environment
- **npm**: Package manager for dependency management
- **Git**: Version control system

### Additional Libraries
- **Web Vitals**: Performance monitoring for React applications

## Project Structure

```
TimeTrackr/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components (Login, Dashboard, Reports, etc.)
│   │   └── ...
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                # Node.js/Express backend
│   ├── models/             # Mongoose data models
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware (authentication, etc.)
│   ├── index.js           # Main server file
│   └── package.json        # Backend dependencies
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/harshil748/TimeTrackr.git
cd TimeTrackr
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Set up environment variables:
Create a `.env` file in the backend directory with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5050
```

5. Start the backend server:
```bash
cd backend
node index.js
```

6. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/timelogs` - Get time logs
- `POST /api/timelogs` - Create time log
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/tasks/:userId` - Get tasks for specific user (admin only)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Open a Pull Request