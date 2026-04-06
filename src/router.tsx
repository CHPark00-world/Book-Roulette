import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import MainPage from './pages/mainPage';
import CommunityPage from './pages/community';
import ChatPage from './pages/chatPage';
import PostDetailPage from './pages/postDetailPage';
import MyPage from './pages/myPage';
import BookFilterPage from './pages/bookFilterPage';
import NewsPage from './pages/newsPage';
import NewsDetailPage from './pages/newsDetailPage';
import ProtectedRoute from './component/common/protectedRoute';
import BookDetailPage from './pages/bookDetailPage';

export const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <MainPage /> },
  { path: ROUTES.COMMUNITY, element: <CommunityPage /> },
  { path: ROUTES.COMMUNITY_POST, element: <PostDetailPage /> },
  {
    path: ROUTES.CHAT,
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.MYPAGE,
    element: (
      <ProtectedRoute>
        <MyPage />
      </ProtectedRoute>
    ),
  },
  { path: ROUTES.BOOK_FILTER, element: <BookFilterPage /> },
  { path: ROUTES.BOOK_DETAIL, element: <BookDetailPage /> },
  { path: ROUTES.NEWS, element: <NewsPage /> },
  { path: ROUTES.NEWS_DETAIL, element: <NewsDetailPage /> },
]);
