import React from "react";
import constants from '../../../Utils/constant';

const Contact = () => {
  return (
    <div className="mt-16 text-left px-4 md:px-8 py-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Get in Touch with GoDrive</h1>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <div className="container mx-auto px-4 py-8">
            <ContactSection
              title="Discover Us"
              content={
                <>
                  <p>At GoDrive, we are dedicated to providing exceptional ride-hailing services. Our team of experts is here to assist you with any inquiries and ensure a seamless experience.</p>
                  <p>Whether you have questions about our services or need support, we are ready to help you find the answers you need.</p>
                </>
              }
            />
            <ContactSection
              title="Visit Us"
              content={<a href="https://goo.gl/maps/..." className="text-blue-600 underline">3rd Floor, New No. 75, 77 & 79, Lohmanradhri Towers, Pantheon Rd, Egmore, Chennai, Tamil Nadu 600008</a>}
            />
            <ContactSection
              title="Email Us"
              content={<a href="mailto:godrive945@gmail.com" className="text-blue-600 underline">godrive945@gmail.com</a>}
            />
            <ContactSection
              title="Call Us"
              content={<p>+91-9876543210</p>}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 relative">
          <div className="relative w-full h-80">
            <img src={constants.img} className="absolute bottom-0 left-0 w-44 h-60 object-cover rounded-lg z-20" alt="GoDrive Office" />
            <img src={constants.img2} className="absolute bottom-20 left-10 w-44 h-60 object-cover rounded-lg z-10" alt="GoDrive Team" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-16 bg-gray-900 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Have a Project or Inquiry?</h2>
          <h2 className="text-3xl font-bold mb-4">Let's Discuss!</h2>
          <p className="mb-6">We appreciate your interest in GoDrive. Please fill out the form below with your details, and we will get back to you as soon as possible.</p>
          <p className="mb-6">We look forward to connecting with you!</p>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <ContactForm />
        </div>
      </div>

      <div className="mt-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31514.26136237659!2d80.1695779!3d13.0302848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52640b8cf5479d%3A0x6737e8b75f21b2b4!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1625839229994!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen
          loading="lazy"
          className="w-full h-full"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

const ContactSection = ({ title, content }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold">{title}</h2>
    {content}
  </div>
);

const ContactForm = () => (
  <form className="w-full max-w-lg p-8 rounded-lg shadow-lg">
    <div className="flex flex-wrap -mx-3 mb-6">
      <InputField id="name" type="text" placeholder="Your Name" />
      <InputField id="email" type="email" placeholder="Your Email" />
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <InputField id="phone" type="text" placeholder="Phone Number" />
      <div className="w-full md:w-1/2 px-3">
        <div className="relative">
          <select
            className="appearance-none block w-full bg-transparent text-gray-400 border-b border-gray-700 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-transparent focus:border-gray-500"
            id="country"
          >
            <option value="India">India</option>
            <option value="America">America</option>
            <option value="New Zealand">New Zealand</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 01.993.883L11 4v12a1 1 0 01-1.993.117L9 16V4a1 1 0 011-1z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <textarea
          className="appearance-none block w-full bg-transparent text-gray-200 border-b border-gray-700 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-transparent focus:border-gray-500"
          id="message"
          rows="3"
          placeholder="Message"
        ></textarea>
      </div>
    </div>
    <div className="flex justify-center">
      <button
        className="bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
);

const InputField = ({ id, type, placeholder }) => (
  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <input
      className="appearance-none block w-full bg-transparent text-gray-200 border-b border-gray-700 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-transparent focus:border-gray-500"
      id={id}
      type={type}
      placeholder={placeholder}
    />
  </div>
);

export default Contact;
