import { Calendar, LayoutDashboard, UserGroup } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SidebarNavigationItem = {
  name: string;
  name_mm: string;
  icon: LucideIcon;
  link: string;
};

export const SidebarNavigation: SidebarNavigationItem[] = [
  {
    name: 'Dashboard',
    name_mm: 'ဒက်ရှ်ဘုတ်',
    icon: LayoutDashboard,
    link: '/dashboard',
  },
  {
    name: 'Doctors',
    name_mm: 'ဆရာ၀န်များ',
    icon: UserGroup,
    link: '/dashboard/doctors',
  },
  {
    name: 'Schedule Requests',
    name_mm: 'Schedule Request များ',
    icon: Calendar,
    link: '/dashboard/schedule-requests',
  },
];
