import ConnectPage from "@/pages/connect/connect";
import { type RouteObject, redirect } from "react-router-dom";

// Redirect logged-in users to dashboard if they try to visit public pages
const publicLoader = async () => {
  const user = localStorage.getItem("userData");
  if (user) {
    throw redirect("/dashboard");
  }
  return null;
};

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    loader: publicLoader,
    element: <ConnectPage />,
  },
  {
    path: "connect",
    loader: publicLoader,
    element: <ConnectPage />,
  },
];