import SideBar from '../components/common/SideBar';
 const navigationItems = getNavigationByRole(user.role);
 
function DashboardLayout({ children, userRole}) {

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
export default DashboardLayout