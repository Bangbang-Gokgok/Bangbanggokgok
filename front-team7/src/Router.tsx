import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useLogin } from '@/features/auth';

import FeedMapPage from '@/pages/FeedMapPage';
import SearchPage from '@/pages/SearchPage';
import ProfilePage from '@/pages/ProfilePage';
import ProfileEditPage from '@/pages/ProfileEditPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import HomePage from '@/pages/HomePage';
import AuthRouter from '@/components/AuthRouter';

const AppRouter = () => {
  useLogin();

  return (
    <Router>
      <Routes>
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
        <Route
          path="/profile-edit"
          element={
            <AuthRouter>
              <ProfileEditPage />
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
