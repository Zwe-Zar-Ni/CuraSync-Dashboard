import { Outlet, useNavigate } from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { SidebarProvider, SidebarInset } from '@/shared/components/ui/sidebar';
import useAuth from '../hooks/useAuth';

const AdminDashboard = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <img src="/logo.png" alt="Logo" className="w-20" />
      </div>
    );
  }
  if (!isAuthenticated) {
    navigate('/login', {
      replace: true,
    });
  }

  return (
    <SidebarProvider>
      <div className="flex gap-4 bg-muted/50 w-screen min-h-screen overflow-hidden">
        <Sidebar />
        <SidebarInset className="flex-1 bg-transparent">
          <Navbar />
          <div className="pr-2 pl-2 lg:pl-0 pt-2">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
