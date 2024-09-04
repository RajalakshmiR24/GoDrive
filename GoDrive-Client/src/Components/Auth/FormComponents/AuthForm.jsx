import React from 'react';
import PropTypes from 'prop-types';

const AuthForm = ({ title, children, onSubmit }) => (
  <div className="flex justify-center items-center min-h-screen bg-transparent">
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 shadow-lg rounded-2xl p-6 w-full max-w-md text-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        {children}
      </form>
    </div>
  </div>
);

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
