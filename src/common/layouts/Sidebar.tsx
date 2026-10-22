import { SidebarNavigation } from '../config/navigation';
import { NavLink, useLocation } from 'react-router';
import { removeToken } from '../utils/auth';
import { useLogout } from '../queries';

import { Button } from '@/shared/components/ui/button';
import {
  Sidebar as SidebarPrimitive,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import { LogOut } from 'lucide-react';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined);
    removeToken();
    window.location.assign('/');
  };

  return (
    <SidebarPrimitive>
      <SidebarHeader className="flex items-center  flex-row gap-2">
        <img src="/icon.png" alt="Logo" className="w-12 h-12 rounded-xl" />
        <div>
          <h2 className="text-text-primary text-lg font-semibold">Cura Sync</h2>
          <h3 className="text-text-secondary text-sm">Admin Dashboard</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {SidebarNavigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  tooltip={item.name}
                  size="lg"
                  className="my-1"
                >
                  <NavLink
                    to={item.link}
                    className={`flex items-center w-full gap-2.5 p-3.5 border-r-2 ${pathname === item.link ? 'bg-secondary border-primary' : 'bg-transparent border-transparent'}`}
                    onClick={() => setOpenMobile(false)}
                  >
                    <item.icon
                      size={24}
                      color={pathname === item.link ? '#c70036' : '#848484'}
                      strokeWidth={2}
                    />
                    <p className="flex flex-col">
                      <span
                        className={`${pathname === item.link ? 'text-primary' : 'text-text-primary/80'} text-sm`}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`${pathname === item.link ? 'text-primary' : 'text-text-secondary'} text-xs`}
                      >
                        {item.name_mm}
                      </span>
                    </p>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full bg-muted"
        >
          <LogOut color="#848484" />
          <span className="text-text-secondary">Log Out</span>
        </Button>
      </SidebarFooter>
    </SidebarPrimitive>
  );
};

export default Sidebar;
