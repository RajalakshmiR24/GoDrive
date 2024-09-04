import { useNavigate } from 'react-router-dom';
import constants from '../../../Utils/constant';

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-gray-900 flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${constants.dark})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl p-8 max-w-xl text-center text-white z-10 flex flex-col md:flex-row items-center">
        <div className="md:order-2 md:ml-8 flex-shrink-0">
          <img src={constants.NotFound} alt="Not Found" className="h-64 w-auto" />
        </div>
        <div className="md:order-1">
          <h1 className="text-5xl font-bold mb-4">404 Error</h1>
          <p className="text-3xl mb-4">Oops!</p>
          <p className="mb-8 text-lg">
            A 404 is an HTTP status code that means you're able to communicate
            with the server but the server can't find the specific page.
          </p>
          <button
            onClick={handleHomeClick}
            className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-6 rounded-full shadow-md"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
