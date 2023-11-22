import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Details from '../pages/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/details',
    element: <Details />
  }
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
