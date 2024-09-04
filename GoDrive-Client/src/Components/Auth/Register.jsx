import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import constants from '../../Utils/constant';
import AuthForm from './FormComponents/AuthForm';
import InputField from './FormComponents/InputField';
import DropdownField from './FormComponents/DropdownField';
import PasswordField from './FormComponents/PasswordField';
import SubmitButton from './FormComponents/SubmitButton';
import SocialButton from './FormComponents/SocialButton';
import { FaUser, FaEnvelope, FaGoogle, FaFacebookF } from 'react-icons/fa';
import axios from '../../Utils/axios';
import { validatePassword } from '../../Utils/validation';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const passwordValidation = validatePassword(password, confirmPassword);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      return;
    }
    try {
      const response = await axios.post('/auth/register', {
        name,
        email,
        password,
        role: userType,
      });

      const data = response.data;

      if (data.userExists) {
        toast.warn('User already exists, please sign in');
        navigate('/signin');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
      

        // Navigate to OTP verification page with email in state
        navigate('/verify-otp', { state: { email: email } });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <div className="bg-center" style={{ backgroundImage: `url(${constants.login_bg})` }}>
      <ToastContainer />
      <AuthForm title="Create an Account" onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
          icon={<FaUser />}
          className="border-black"
        />
        <InputField
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          icon={<FaEnvelope />}
          className="border-black"
        />
        <PasswordField
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border-black"
        />
        <PasswordField
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="border-black"
        />
        <DropdownField
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          options={[
            { value: 'driver', label: 'Driver' },
            { value: 'user', label: 'User' },
          ]}
          placeholder="Select your role"
          className="border-black"
        />
        <SubmitButton label="Sign Up" />
        <div className="text-center text-gray-600 mb-3">or</div>
        <div className="flex justify-between items-center mb-3">
          <SocialButton
            label="Sign up with Google"
            onClick={() => { /* Handle Google sign-in */ }}
            icon={<FaGoogle />}
            className="bg-blue-600 hover:bg-blue-700 text-white mr-2"
          />
          <SocialButton
            label="Sign up with Facebook"
            onClick={() => { /* Handle Facebook sign-in */ }}
            icon={<FaFacebookF />}
            className="bg-blue-900 hover:bg-blue-800 text-white ml-2"
          />
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <a href="/signin" className="hover:underline">Already have an account? Sign in</a>
        </div>
      </AuthForm>
    </div>
  );
};

export default Register;
