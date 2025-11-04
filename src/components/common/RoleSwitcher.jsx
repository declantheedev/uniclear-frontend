import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

const RoleSwitcher = () => {
  const { setRole } = useAuth();

  return (
    <div className="p-4 bg-gray-200">
      <h3 className="font-bold mb-2">Switch Role</h3>
      <div className="flex space-x-2">
        <Button onClick={() => setRole('admin')}>Admin</Button>
        <Button onClick={() => setRole('faculty_admin')}>Faculty Admin</Button>
        <Button onClick={() => setRole('staff')}>Staff</Button>
        <Button onClick={() => setRole('student')}>Student</Button>
      </div>
    </div>
  );
};

export default RoleSwitcher;