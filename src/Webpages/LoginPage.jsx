import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GettingStartNav from '../Components/Getting_Started/GettingStartNav';
import LoginForm from '../Components/Login/LoginForm';
import GettingStartFooter from '../Components/Getting_Started/GettingStartedFooter';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async ({ instituteId, userId, password }) => {
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instituteId, userId, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      // Store user data in localStorage for session management
      localStorage.setItem('user', JSON.stringify(data));

      // Redirect based on role
      if (data.role === 'superAdmin') {
        navigate('/super-admin');
      } else if (data.role === 'teacher') {
        navigate('/teacher');
      } else if (data.role === 'student') {
        navigate('/student');
      }
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    }
  };

  return (
    <>
      <GettingStartNav />
      <LoginForm onSubmit={handleLogin} error={error} />
      <div className="border-t border-gray-700"></div>
      <GettingStartFooter />
    </>
  );
};

export default LoginPage;