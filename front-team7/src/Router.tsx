import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserMapPage from './pages/UserMap';
import MyMapPage from './pages/MyMap';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthRouter from './components/AuthRouter';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <AuthRouter>
            <HomePage />
          </AuthRouter>
        } />
        <Route path="/usermap/:userId" element={
          <AuthRouter>
            <UserMapPage />
          </AuthRouter>
        } />
        <Route path="/mymap" element={
          <AuthRouter>
            <MyMapPage />
          </AuthRouter>
        } />
        <Route path="/search" element={
          <AuthRouter>
            <SearchPage />
          </AuthRouter>} />
        <Route path="/profile" element={
          <AuthRouter>
            <ProfilePage />
          </AuthRouter>
        } />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
