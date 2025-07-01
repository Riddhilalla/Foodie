import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

// Wrapper for private routes
function PrivateRoute({ element }) {
  const { isAuthenticated } = useOutletContext();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute element={<Dashboard />} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="385832049189-rlg71v1gtn8jo8crock1uu8tadp004e4.apps.googleusercontent.com">
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
