import { type RouteObject, redirect } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout"; // Import the clean MainLayout

const authLoader = async () => {
  const user = localStorage.getItem("userData");
  if (!user) {
    throw redirect(`/connect?redirectTo=${encodeURIComponent(window.location.pathname)}`);
  }
  return null;
};

export const privateRoutes: RouteObject[] = [
  {
    element: <MainLayout />, // Wraps children with Sidebar + Header
    loader: authLoader,      // Protects all children below
    children: [
      {
        path: "dashboard",
        element: <div>Dashboard Overview</div>,
      },
      {
        path: "users",
        element: <div>Wallet Page (Protected)</div>,
      },
      {
        path: "settings",
        element: <div>User Settings</div>,
      },
      {
        path: "analytics",
        element: <div>User Profile</div>,
      },
    ],
  },
];