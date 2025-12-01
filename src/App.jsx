import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";

import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import WorkoutForm from "./pages/WorkoutForm";
import WorkoutDetail from "./pages/WorkoutDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "workouts/new",
        element: (
          <RequireAuth>
            <WorkoutForm />
          </RequireAuth>
        ),
      },
      {
        path: "workouts/:id",
        element: (
          <RequireAuth>
            <WorkoutDetail />
          </RequireAuth>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
