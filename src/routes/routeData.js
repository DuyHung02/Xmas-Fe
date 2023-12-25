import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/user/Profile";
import Test from "../layouts/components/test/Test";

const authorizedRoutes = [
  { path: '/', element: <Dashboard /> },
  { path: '/profile', element: <Profile /> },
  { path: '/test', element: <Test />}
];

export { authorizedRoutes };
