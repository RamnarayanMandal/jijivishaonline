import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OtpVerification = ({ email, password, onClose }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      // Replace with your OTP verification API endpoint
      const response = await axios.post('/api/verify-otp', { email, otp });

      if (response.status === 200) {
        alert('OTP verified successfully!');
        onClose();
      }
    } catch (error) {
      setError('Failed to verify OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="otp">OTP</Label>
        <Input
          type="text"
          id="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </Button>
    </form>
  );
};

export default OtpVerification;
