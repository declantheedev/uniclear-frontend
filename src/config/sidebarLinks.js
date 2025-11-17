export const sidebarLinks = {
  admin: [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'Home' },
    { path: '/admin/students', label: 'Students', icon: 'Users' },
    { path: '/admin/notifications', label: 'Notifications', icon: 'Bell' },
    { path: '/admin/messages', label: 'Messages', icon: 'MessageSquare' },
    { path: '/admin/faculties', label: 'Faculties', icon: 'Building2' },
    { path: '/admin/staffs', label: 'Staffs', icon: 'UserCheck' },
  ],
  faculty_admin: [
    { path: '/faculty_admin/dashboard', label: 'Dashboard', icon: 'Home' },
    { path: '/faculty_admin/reports', label: 'Reports', icon: 'FileText' },
    { path: '/faculty_admin/departments', label: 'Departments', icon: 'GitBranch' },
    { path: '/faculty_admin/students', label: 'View Students', icon: 'Users' },
    { path: '/faculty_admin/staffs', label: 'Staffs', icon: 'UserCheck' },
  ],
  staff: [
    { path: '/staff/dashboard', label: 'Dashboard', icon: 'Home' },
    { path: '/staff/attendance', label: 'Attendance', icon: 'CheckCircle' },
  ],
  student: [
    { path: '/student/dashboard', label: 'Home', icon: 'Home' },
    { path: '/student/profile', label: 'Profile', icon: 'User' },
    { path: '/student/courses', label: 'Courses', icon: 'BookOpen' },
  ],
};
