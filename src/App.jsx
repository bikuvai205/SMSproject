import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Webpages/LandingPage'; // Landing page import
import GettingStartedPage from './Webpages/GettingStartPage'; // Getting Started page import (handles registration)
import LoginPage from './Webpages/LoginPage'; // Login page import
import SuperAdminDashboard from './components/Superadmin/SuperAdminDashboard'; // Super Admin dashboard
import TeacherDashboard from './components/Teacher/TeacherDashboard'; // Teacher dashboard
import StudentDashboard from './components/Student/StudentDashboard'; // Student dashboard

function App() {
  return (
    <Routes>
      {/* Landing page (home page) */}
      <Route path="/" element={<LandingPage />} />
      {/* Getting Started page (also serves as registration) */}
      <Route path="/getting-started" element={<GettingStartedPage />} />
      {/* Login page */}
      <Route path="/login" element={<LoginPage />} />
      {/* Role-specific dashboards */}
      <Route path="/super-admin" element={<SuperAdminDashboard />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
      {/* Catch-all route for unknown paths */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;