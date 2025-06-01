# TimeTrackr

TimeTrackr is a smart time tracking and productivity web app designed for freelancers, students, and developers to log time spent on tasks, track daily goals, and get visual productivity reports.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (Google OAuth optional)
- **Charts**: Recharts or Chart.js
- **Deployment**: Vercel (frontend), Render (backend)

## Week 1 Tasks

- Finalized features and UI wireframe (using Figma).
- Set up project structure (frontend + backend repos).
- Initialized frontend with React and Tailwind CSS.
- Created backend API with Node.js and Express.
- Designed MongoDB schema for users, tasks, and time logs.

## Folder Structure

```
/TimeTrackr
  /client   (React frontend)
  /server   (Node.js/Express backend)
  README.md
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed or access to MongoDB Atlas

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd TimeTrackr
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Start the development servers:

   ```bash
   # In one terminal, start the backend
   cd server
   npm start

   # In another terminal, start the frontend
   cd client
   npm start
   ```

4. Open the app in your browser at `http://localhost:3000`.
