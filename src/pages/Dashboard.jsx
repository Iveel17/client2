import React, { useEffect, useState } from 'react';
import authService from '@/services/authService';  // default import
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    let mounted = true;

    if (!token) {
      navigate('/login');
      return;
    }

    authService.getCurrentUser()  // call method on default instance
      .then((data) => {
        const userObj = data?.user || data;
        if (mounted) setUser(userObj);
      })
      .catch((err) => {
        console.error('Failed fetching profile', err);
        navigate('/login');
      });

    return () => { mounted = false; };
  }, [navigate, token]);

  const onLogout = async () => {
    await authService.logout();  // call method on default instance
    navigate('/login');
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl">Welcome, {user.email}</h1>
      <p>User id: {user.id || user._id || 'unknown'}</p>
      <button onClick={onLogout} className="mt-4 bg-red-600 text-white px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}
