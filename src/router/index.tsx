import { lazy } from 'react';
import App from '@/App';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/login',
    Component: lazy(() => import('@/domain/auth/pages/LoginPage')),
  },
  {
    path: '/dashboard',
    Component: lazy(() => import('@/common/layouts/AdminDashboard')),
    errorElement: <p className="text-center py-24">Error. Not Found.</p>,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/domain/dashboard/pages/DashboardPage')),
      },
      {
        path: 'doctors',
        Component: lazy(() => import('@/domain/doctors/pages/DoctorsPage')),
      },
      {
        path: 'doctors/:id',
        Component: lazy(
          () => import('@/domain/doctors/pages/DoctorDetailsPage'),
        ),
      },
      {
        path: 'schedule-requests',
        Component: lazy(
          () => import('@/domain/schedule-requests/pages/ScheduleRequestsPage'),
        ),
      },
    ],
  },
  {
    path: '*',
    element: <p className="text-center py-24">Error. Not Found.</p>,
  },
]);

export default router;
