import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/user/Profile";
import Test from "../layouts/components/test/Test";
import Message from "../pages/message/Message";

const authorizedRoutes = [
  { path: '/', element: <Dashboard /> },
  { path: '/profile', element: <Profile /> },
  { path: '/message', element: <Message />},
  { path: '/test', element: <Test />}
];

export { authorizedRoutes };
