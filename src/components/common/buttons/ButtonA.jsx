// Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonA = ({
  text,
  onClick,
  disabled = false,
  to, // For react-router-dom Link
}) => {
    return (
      <Link to={to}>
        <button
          className='px-5 py-2.5 rounded-md text-sm font-medium border-2 bg-white text-gray-800 border-gray-300 hover:border-blue-500 active:border-blue-600 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed cursor-pointer'
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </Link>
    );
  }

export default ButtonA;