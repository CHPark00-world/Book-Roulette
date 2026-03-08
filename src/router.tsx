import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import MainPage from './pages/mainPage';
import CommunityPage from './pages/community';
import ChatPage from './pages/chatPage';
import PostDetailPage from './pages/postDetailPage';

export const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <MainPage /> },
  { path: ROUTES.COMMUNITY, element: <CommunityPage /> },
  { path: ROUTES.COMMUNITY_POST, element: <PostDetailPage /> },
  { path: ROUTES.CHAT, element: <ChatPage /> },
]);
