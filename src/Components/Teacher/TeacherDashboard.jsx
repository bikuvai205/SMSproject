import React from 'react';

const TeacherDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  return (
    <div className="min-h-screen bg-[#0F172A] p-6">
      <h1 className="text-3xl font-bold text-amber-300 mb-6">Teacher Dashboard</h1>
      <p className="text-gray-200">Welcome, {user.userId} (Institute: {user.instituteId})</p>
      {/* Add functionality to create Students */}
    </div>
  );
};

export default TeacherDashboard; // Ensure default export