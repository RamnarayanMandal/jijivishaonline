import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom"; // Correct import for Link from react-router-dom
import axios from 'axios';

export const SignUpForm = () => {
  // State variables for form fields and handling errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const URI = import.meta.env.VITE_API_URL;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Simple form validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setIsLoading(true); // Set loading state
      setError(''); // Clear previous errors

      // Send a POST request to the registration endpoint
      const response = await axios.post(`${URI}api/admin/register`, { email, password });

      if (response.status === 200) {
        alert('Registration successful! OTP sent to your email.');
        setEmail(''); // Clear email field
        setPassword(''); // Clear password field
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred during registration.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to sign up for an account.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>} {/* Display error if exists */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign Up'}
            </Button>
            
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/" className="underline"> {/* Correct route for login */}
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
