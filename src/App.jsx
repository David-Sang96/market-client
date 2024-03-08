import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layouts/Main";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/admin/HomeIndex";
import Profile from "./pages/profile/HomeIndex";
import SavedProduct from "./pages/savedProducts";
import AuthProvider from "./providers/AuthProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Main />,
      children: [
        {
          index: true,
          element: (
            <AuthProvider>
              <Home />,
            </AuthProvider>
          ),
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: (
            <AuthProvider>
              <Profile />
            </AuthProvider>
          ),
        },
        {
          path: "/admin",
          element: (
            <AuthProvider>
              <Admin />
            </AuthProvider>
          ),
        },
        {
          path: "/product/:id",
          element: <Details />,
        },
        {
          path: "/saved-products",
          element: (
            <AuthProvider>
              <SavedProduct />,
            </AuthProvider>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
