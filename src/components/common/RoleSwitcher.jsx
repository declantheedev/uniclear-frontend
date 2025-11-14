import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

const RoleSwitcher = () => {
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const handleSwitch = (newRole) => {
    // Update the role (also persisted in localStorage by AuthContext)
    setRole(newRole);

    // Immediately navigate to the appropriate dashboard for the role
    switch (newRole) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'faculty_admin':
        navigate('/faculty_admin/dashboard');
        break;
      case 'staff':
        navigate('/staff/dashboard');
        break;
      case 'student':
        navigate('/student/dashboard');
        break;
      default:
        // fallback to root
        navigate('/');
    }
  };

  return (
    <div className="p-4 bg-gray-200">
      <h3 className="font-bold mb-2">Switch Role</h3>
      <div className="flex space-x-2">
        <Button onClick={() => handleSwitch('admin')}>Admin</Button>
        <Button onClick={() => handleSwitch('faculty_admin')}>Faculty Admin</Button>
        <Button onClick={() => handleSwitch('staff')}>Staff</Button>
        <Button onClick={() => handleSwitch('student')}>Student</Button>
      </div>
    </div>
  );
};

export default RoleSwitcher;