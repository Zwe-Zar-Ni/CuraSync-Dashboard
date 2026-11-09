import { Navigate, Outlet } from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { SidebarProvider, SidebarInset } from '@/shared/components/ui/sidebar';
import useAuth from '../hooks/useAuth';
import { getRefreshToken, getToken } from '../utils/auth';

const AdminDashboard = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const hasSession = Boolean(getToken() || getRefreshToken());

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <img src="/icon.png" alt="Logo" className="w-20" />
      </div>
    );
  }
  if (!isAuthenticated && !hasSession) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex gap-4 bg-muted dark:bg-muted/50 w-screen min-h-screen overflow-hidden">
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
