import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Utils/axios';

const OtpVerification = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (!otpValue || otpValue.length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }
    try {
      const response = await axios.post('/auth/verify-otp', { email, otp: otpValue });
      if (response.status === 200) {
        toast.success('OTP verified successfully');
        setTimeout(() => {
          navigate('/signin');
        }, 1500);
      } else {
        setError(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post('/auth/resend-otp', { email });
      if (response.status === 200) {
        toast.success('OTP resent successfully');
        setTimeLeft(60);
        setIsResendDisabled(true);
      } else {
        toast.error(response.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold mb-6">Verify OTP</h2>
          <p>
            We have sent an OTP to <strong>{email}</strong>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6 space-x-2">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-16 h-16 text-center border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-2xl"
              />
            ))}
          </div>
          {error && <div className="text-red-500 mb-3">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md shadow-md hover:bg-white hover:text-black hover:border hover:border-black"
          >
            Verify OTP
          </button>
        </form>
        <div className="text-center mt-4">
          {isResendDisabled ? (
            <p className="text-gray-500">Resend OTP in {timeLeft} seconds</p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-indigo-600 hover:underline"
              disabled={isResendDisabled}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
