'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../../styles/globals.css';

const LoginPage = () => {
  const [userID, setUserID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login, store the JWT token
        localStorage.setItem('token', data.token); // Store JWT token in localStorage
        console.log('Login successful:', data);

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        console.error('Login failed:', data.message);
        alert(data.message); // Display error message to the user
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white-200 via-teal-300 to-teal-400 py-12 px-6 sm:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl space-y-8">
        <div className="flex justify-center mb-6">
          <img src="/az.png" alt="Login logo" width={256} height={100} />
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="userID" className="sr-only">User ID</label>
              <input
                id="userID"
                name="userID"
                type="text"
                required
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
                placeholder="User ID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out"
            >
              Sign in
            </button>
          </div>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 transition-all duration-200 ease-in-out">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
