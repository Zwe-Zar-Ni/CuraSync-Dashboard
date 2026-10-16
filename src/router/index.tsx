import { lazy } from "react";
import App from "@/App";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "/dashboard",
    Component: lazy(() => import("@/common/layouts/AdminDashboard")),
    errorElement: <p className="text-center py-24">Error. Not Found.</p>,
    children: [
      {
        index: true,
        Component: lazy(() => import("@/domain/dashboard/pages/DashboardPage"))
      }
    ]
  },
  {
    path: "*",
    element: <p className="text-center py-24">Error. Not Found.</p>
  }
]);

export default router;
