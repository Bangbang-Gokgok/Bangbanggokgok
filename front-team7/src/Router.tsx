import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FeedMapPage from '@/pages/FeedMapPage';
import SearchPage from '@/pages/SearchPage';
import ProfilePage from '@/pages/ProfilePage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import HomePage from '@/pages/HomePage';
import AuthRouter from '@/components/AuthRouter';
import InfiniteScrollHomePage from './pages/InfiniteScrollHomePage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* /temp는 무한 스크롤 css 문제 해결용도로 잠깐 만들어놓은 것! 무한 스크롤 css 문제 해결 후 삭제할 예정입니다. */}
        <Route
          path="/temp"
          element={
            <AuthRouter>
              <InfiniteScrollHomePage />
            </AuthRouter>
          }
        />
        <Route
          path="/"
          element={
            <AuthRouter>
              <HomePage />
            </AuthRouter>
          }
        />
        <Route
          path="/feedmap/:userId"
          element={
            <AuthRouter>
              <FeedMapPage />
            </AuthRouter>
          }
        />
        <Route
          path="/search"
          element={
            <AuthRouter>
              <SearchPage />
            </AuthRouter>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRouter>
              <ProfilePage />
            </AuthRouter>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
