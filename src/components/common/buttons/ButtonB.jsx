// Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonB = ({
  text,
  onClick,
  disabled = false,
  to, // For react-router-dom Link
}) => {
    return (
      <Link to={to}>
        <button
          className='px-5 py-2.5 rounded-md text-sm font-medium border-2 bg-blue-600 text-white border-gray-300 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 disabled:text-white disabled:border-blue-400 disabled:cursor-not-allowed cursor-pointer'
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </Link>
    );
  }

export default ButtonB;