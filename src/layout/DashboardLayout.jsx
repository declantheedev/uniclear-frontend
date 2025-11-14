import SideBar from '../components/common/SideBar';
import { useAuth } from '../context/AuthContext';
import { sidebarLinks } from '../config/sidebarLinks';

function DashboardLayout({ children }) {
  const { role } = useAuth();
  const navigationItems = sidebarLinks[role] || [];

  return (
    <div className="min-h-screen flex">
      <SideBar
        navigationItems={navigationItems}
      />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;