import React from 'react';
import { useAuth } from "@/hooks/useAuth";

import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header/Header';


const PlusPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Hello, {user.firstName}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
};

export default PlusPage;
