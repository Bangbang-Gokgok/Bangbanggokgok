import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import UserMap from './pages/UserMapPage';
import MyMap from './pages/MyMapPage';
import Search from './pages/SearchPage';
import Profile from './pages/ProfilePage';
import Login from './pages/LoginPage';
import NotFound from './pages/NotFoundPage';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/usermap/:userId" element={<UserMap />} />
            <Route path="/mymap" element={<MyMap />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
