// src/components/Admin.jsx
import React from 'react';
import { useAuth } from '../Components/AuthContext';

const Admin = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Only accessible to authenticated users.</p>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Admin;
