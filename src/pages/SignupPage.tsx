import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage: React.FC = () => {
  const handleSignup = (name: string, email: string, password: string) => {
    // In a real app, this would create an account with a backend
    console.log('Signup attempt:', { name, email, password });
    alert('Account created successfully! In a real app, you would be redirected to the dashboard.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <SignupForm onSignup={handleSignup} />
      </div>
    </div>
  );
};

export default SignupPage;