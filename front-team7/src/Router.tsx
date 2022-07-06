import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserMap from './pages/UserMap';
import MyMap from './pages/MyMap';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';


const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
        {isLoggedIn ?
          <>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/usermap/:userId"
              element={<UserMap />}
            />
            <Route
              path="/mymap"
              element={<MyMap />}
            />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </>
          :
          <Route
            path="/"
            element={<Login />}
          />
        }
      </Routes>
    </Router>
  );
};

export default AppRouter;