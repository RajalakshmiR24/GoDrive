import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../Utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthForm from './FormComponents/AuthForm';
import PasswordField from './FormComponents/PasswordField';
import constants from '../../Utils/constant';
import { validatePassword } from '../../Utils/validation'; // Import the validatePassword function

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the passwords
    const { isValid, message } = validatePassword(newPassword, confirmPassword);
    if (!isValid) {
      toast.error(message); // Show error message using toast
      return;
    }

    try {
      await axios.post('/auth/reset-password', {
        resetToken: token,
        newPassword: newPassword,
      });
      toast.success('Password reset successful');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${constants.login_bg})` }}
    >
      <AuthForm title="Reset Password" onSubmit={handleSubmit}>
        <PasswordField
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <PasswordField
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black border border-black transition duration-300"
        >
          Reset Password
        </button>
      </AuthForm>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ResetPassword;
