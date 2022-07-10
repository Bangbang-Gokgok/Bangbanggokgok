import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserMap from './pages/UserMap';
import MyMap from './pages/MyMap';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AuthRouter from './components/AuthRouter';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <AuthRouter>
            <Home />
          </AuthRouter>
        } />
        <Route path="/usermap/:userId" element={
          <AuthRouter>
            <UserMap />
          </AuthRouter>
        } />
        <Route path="/mymap" element={
          <AuthRouter>
            <MyMap />
          </AuthRouter>
        } />
        <Route path="/search" element={
          <AuthRouter>
            <Search />
          </AuthRouter>} />
        <Route path="/profile" element={
          <AuthRouter>
            <Profile />
          </AuthRouter>
        } />
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
