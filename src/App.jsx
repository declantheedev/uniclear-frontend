import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import RoleSwitcher from './components/common/RoleSwitcher.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import Students from './pages/admin/Students';
import Notification from './pages/admin/Notification';
import Messages from './pages/admin/Messages';
import Faculties from './pages/admin/Faculties';
import Staffs from './pages/admin/Staffs';

// Faculty Admin pages
import FacultyAdminDashboard from './pages/faculty_admin/Dashboard';
import Reports from './pages/faculty_admin/Reports';
import Departments from './pages/faculty_admin/Departments';
import ViewStudents from './pages/faculty_admin/ViewStudents';
import StaffsList from './pages/faculty_admin/StaffsList';



// Staff pages
import StaffDashboard from './pages/staff/Dashboard';
import Attendance from './pages/staff/Attendance';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import Courses from './pages/student/Courses';
import StudentProfile from './pages/student/Profile.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <RoleSwitcher />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/students" element={<Students />} />
              <Route path="admin/notifications" element={<Notification />} />
              <Route path="admin/messages" element={<Messages />} />
              <Route path="admin/faculties" element={<Faculties />} />
              <Route path="admin/staffs" element={<Staffs />} />
            </Route>

            {/* Faculty Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['faculty_admin']} />}>
              <Route path="faculty_admin/dashboard" element={<FacultyAdminDashboard />} />
              <Route path="faculty_admin/reports" element={<Reports />} />
              <Route path="faculty_admin/departments" element={<Departments />} />
              <Route path="faculty_admin/students" element={<ViewStudents />} />
              <Route path="faculty_admin/staffs" element={<StaffsList />} />
            </Route>

            {/* Staff Routes */}
            <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
              <Route path="staff/dashboard" element={<StaffDashboard />} />
              <Route path="staff/attendance" element={<Attendance />} />
            </Route>

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="student/dashboard" element={<StudentDashboard />} />
              <Route path="student/courses" element={<Courses />} />
              <Route path="student/profile" element={<StudentProfile />} />

            </Route>
          </Route>

          {/* Redirect to a default dashboard based on role */}
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
