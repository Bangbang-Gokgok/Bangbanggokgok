import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useLogin } from '@/features/auth';

import AuthRouter from '@/components/AuthRouter';
import NotFoundPage from '@/pages/NotFoundPage';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/HomePage'));
const FeedMapPage = lazy(() => import('@/pages/FeedMapPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ProfileEditPage = lazy(() => import('@/pages/ProfileEditPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));

const AppRouter = () => {
  const { loading } = useLogin();

  if (loading) return <div></div>;

  return (
    <Suspense fallback={<LoadingSpinner />}>
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
            path="/profile/:userId"
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
          <Route
            path="/admin"
            element={
              <AuthRouter>
                <AdminPage />
              </AuthRouter>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
