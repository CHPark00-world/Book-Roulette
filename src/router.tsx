import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import MainPage from './pages/mainPage';
import CommunityPage from './pages/community';

export const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <MainPage /> },
  { path: ROUTES.COMMUNITY, element: <CommunityPage /> },
]);
