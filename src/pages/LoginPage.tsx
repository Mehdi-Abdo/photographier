import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    // In a real app, this would authenticate with a backend
    console.log('Login attempt:', { email, password });
    alert('Login successful! In a real app, you would be redirected to the dashboard.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;