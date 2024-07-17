"use client"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await axios.put(`/api/user?email=${email}`,formData);
      const userId = response.data.userId;
      router.push(`/Dashboard/${userId}`);
  } catch (error) {
      setError('Invalid email or password');
  }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <section className="max-w-md w-full">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-6 font-bold">Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                name="email" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                name="password" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="submit"
            >
              Log in
            </button>
            <div className="text-center mt-4">
              <p className="text-sm">
                Dont have an account? <a className="text-blue-500" href="/Register">Register</a>
              </p>
            </div>
          </form>

        </div>
      </section>
    </div>
  );
};

export default LoginPage;
