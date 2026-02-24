import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout"; // The new theme layout
import { publicRoutes } from "./public.routes";
import { privateRoutes } from "./private.routes";
import ErrorFallback from "@/components/common/ErrorFallback";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: (
       <div className="h-screen w-screen bg-[#0B0E11] flex items-center justify-center">
         <ErrorFallback 
           onRetry={() => window.location.href = "/"} 
           title="System Crashed Please Try Again"
         />
       </div>
    ),
    children: [
      ...publicRoutes,
      ...privateRoutes,
    ],
  },
]);