// Button.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LinkA = ({
  text,
  onClick,
  disabled = false,
  to, // For react-router-dom Link
}) => {
    return (
      <Link to={to}>
        <button
          className="text-blue-600 hover:text-blue-700 flex items-center mx-auto cursor-pointer"
          onClick={onClick}
          disabled={disabled}
        >
          {text} <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </Link>
    );
  }

export default LinkA;