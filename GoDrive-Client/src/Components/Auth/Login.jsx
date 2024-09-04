import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import constants from '../../Utils/constant';
import AuthForm from './FormComponents/AuthForm';
import InputField from './FormComponents/InputField';
import SubmitButton from './FormComponents/SubmitButton';
import Checkbox from './FormComponents/Checkbox';
import SocialButton from './FormComponents/SocialButton';
import { FaGoogle, FaFacebookF, FaEnvelope } from 'react-icons/fa';
import PasswordField from './FormComponents/PasswordField';
import axios from '../../Utils/axios';
import { useAuth } from '../../Context/AuthContext'; // Update this path according to your file structure

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const { data } = await axios.post('/auth/login', { email, password });
  
      setAuth({
        token: data.token,
        role: data.role,
        name: data.name,
        email: data.email,
        id: data.id
      });
  
     // Check role and verification status for drivers
if (data.role === 'driver') {
  if (data.verified) {
    navigate('/duty');
  } else {
    navigate('/driver');
  }
} else {
  // Handle other roles as usual
  switch (data.role) {
    case 'admin':
      navigate('/admin');
      break;
    case 'user':
      navigate('/user');
      break;
    default:
      navigate('/duty');
      break;
  }
}

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      if (error.response?.status === 404) {
        toast.error('Email not found. Redirecting to sign-up...');
        navigate('/signup');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleGoogleSignIn = () => {
    toast.info('Google sign-in not implemented yet');
  };

  const handleFacebookSignIn = () => {
    toast.info('Facebook sign-in not implemented yet');
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${constants.login_bg})` }}
    >
      <ToastContainer />
      <AuthForm title="Sign in" onSubmit={handleSubmit}>
        <InputField
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          icon={<FaEnvelope />}
        />
        <PasswordField
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Checkbox
          label="Keep me signed in"
          name="keepSignedIn"
          checked={keepSignedIn}
          onChange={(e) => setKeepSignedIn(e.target.checked)}
        />
        <SubmitButton label="Sign in" disabled={loading} />
        {loading && <p>Loading...</p>}
        <div className="text-center text-gray-600 mb-3">or</div>
        <div className="flex justify-between items-center">
          <SocialButton
            label="Sign in with Google"
            onClick={handleGoogleSignIn}
            icon={<FaGoogle />}
            className="bg-blue-600 hover:bg-blue-700 text-white mr-2 text-xs"
          />
          <SocialButton
            label="Sign in with Facebook"
            onClick={handleFacebookSignIn}
            icon={<FaFacebookF />}
            className="bg-blue-900 hover:bg-blue-800 text-white ml-2 text-xs"
          />
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:underline">Forgot password?</Link>
          <Link to="/signup" className="hover:underline">Don&apos;t have an account? Register</Link>
        </div>
      </AuthForm>
    </div>
  );
};

export default Login;
