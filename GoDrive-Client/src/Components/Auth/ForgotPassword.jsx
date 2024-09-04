import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // or similar navigation hook
import constants from '../../Utils/constant';
import AuthForm from './FormComponents/AuthForm';
import InputField from './FormComponents/InputField';
import SubmitButton from './FormComponents/SubmitButton';
import { FaEnvelope } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../Utils/axios'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // instantiate navigation hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/forgot-password', { email });
      toast.success('Password reset email sent successfully!', {
        position: 'top-right',
      });
      console.log('Forgot password request response:', response.data);
      navigate('/mail-sent-success'); // navigate to the success page
    } catch (error) {
      toast.error('Failed to send password reset email. Please try again.', {
        position: 'top-right',
      });
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${constants.fp_bg})` }}>
      <AuthForm title="Forgot Password" onSubmit={handleSubmit}>
        <InputField
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          icon={<FaEnvelope />}
          className="border-black"
        />
        <SubmitButton label="Reset Password" />
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
          <a href="/signin" className="hover:underline">Back to Login</a>
        </div>
      </AuthForm>
      <ToastContainer />
    </div>
  );
  
};

export default ForgotPassword;
