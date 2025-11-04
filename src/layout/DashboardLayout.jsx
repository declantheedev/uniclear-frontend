import SideBar from '../components/common/SideBar';
 const navigationItems = getNavigationByRole(user.role);
 
function DashboardLayout({ children, userRole}) {
 
  return (
    <div className="dashboard-container">
      <SideBar 
        navigationItems={navigationItems} 
      />
      <main>
        {children}
      </main>
    </div>
  );
}
export default DashboardLayout