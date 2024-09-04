
import constants from '../../../Utils/constant';

const About = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <header className="flex justify-between items-center py-4">
        <div className="text-lg font-bold">
          <img src="/path-to-your-logo.png" alt="GoDrive Logo" className="h-8" />
        </div>
        <div className="flex space-x-4">
          <button className="p-2">
            <i className="fas fa-search"></i>
          </button>
          <button className="p-2">
            <i className="fas fa-shopping-cart"></i>
          </button>
          <img
            src="/path-to-your-profile-picture.jpg"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="mt-16 text-center bg-cover bg-center max-w-7xl h-56 mx-auto flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${constants.black2})` }}
      >
        <h1 className="text-4xl font-bold text-white">
          Welcome to GoDrive: Your Trusted Ride-Hailing Companion
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-white">
          At GoDrive, we revolutionize your travel experience. Request a ride, track your driver's location, and pay seamlessly through our app.
        </p>
      </section>

      {/* Features Section */}
      <section className="flex flex-wrap mt-16">
        <div className="w-full md:w-1/2 p-4">
          <img src={constants.car} alt="Car" className="w-3/4 h-auto mx-auto rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Why Choose GoDrive?</h2>
          <p className="text-lg">
            GoDrive offers safe, affordable, and convenient rides 24/7 with professional drivers. Book easily and pay through multiple options.
          </p>
          <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
            Learn More
          </button>
        </div>
      </section>

      {/* Real-Time Tracking and Payment Options */}
      <section className="flex flex-wrap mt-16">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Real-Time Tracking</h2>
          <p className="text-lg">
            Stay informed with real-time tracking. Know your driver’s location and estimated arrival time for a seamless experience.
          </p>
          <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
            Learn More
          </button>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <img src={constants.bike2} alt="Bike" className="w-3/4 h-auto mx-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Ride Scheduling and Environment Commitment */}
      <section className="flex flex-wrap mt-16">
        <div className="w-full md:w-1/2 p-4">
          <img src={constants.auto} alt="Auto" className="w-3/4 h-auto mx-auto rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Ride Scheduling</h2>
          <p className="text-lg">
            Plan your rides in advance with our ride-scheduling feature. Perfect for early flights, important meetings, or any planned event.
          </p>
          <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
            Learn More
          </button>
        </div>
      </section>

      {/* Commitment to Environment */}
      <section className="flex flex-wrap mt-16">
        <div className="w-full md:w-1/2 p-4">
          <p className="text-2xl font-bold text-black">Our Commitment to the Environment</p>
          <p className="text-lg mt-2 text-black">
            We encourage the use of fuel-efficient vehicles and eco-friendly practices in our operations to reduce our carbon footprint.
          </p>
          <button className="bg-black hover:bg-gray-200 text-white font-bold py-2 px-4 rounded mt-4">
            Learn More
          </button>
        </div>
        <div className="w-full md:w-1/2 flex p-4 space-x-4">
          <div className="flex-1 rounded-lg shadow-md p-4 bg-black">
            <img src={constants.Icon} alt="Feature 1" className="mb-2 rounded-lg shadow-lg" />
            <p className="text-white font-bold">High Quality Rides.</p>
          </div>
          <div className="flex-1 rounded-lg shadow-md p-4 bg-black">
            <img src={constants.Icon1} alt="Feature 2" className="mb-2 rounded-lg shadow-lg" />
            <p className="text-white font-bold">Safety and Comfort.</p>
          </div>
          <div className="flex-1 rounded-lg shadow-md p-4 bg-black">
            <img src={constants.Icon2} alt="Feature 3" className="mb-2 rounded-lg shadow-lg" />
            <p className="text-white font-bold">Efficient Route Planning.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
