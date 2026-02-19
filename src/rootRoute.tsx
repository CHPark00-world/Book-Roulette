import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/mainPage';

const router = createBrowserRouter([{ path: '/', element: <MainPage /> }]);

export default function RootRoute() {
  return <RouterProvider router={router} />;
}
