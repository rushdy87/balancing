import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  Home,
  Login,
  Reports,
  TanksInfo,
  Unit52,
  Unit53,
  Unit54,
  Unit90,
  Users,
} from './pages';
import { Navbar } from './components';
import { useAuth } from './hooks';
import { AuthContext } from './context';

function App() {
  const { token, login, logout, role, unit, userId } = useAuth();

  const renderRoutes = () => {
    if (!token) {
      return (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </>
      );
    } else if (role === '0') {
      return (
        <>
          <Route path='/users' element={<Users />} />
          <Route path='/tanks-info' element={<TanksInfo />} />
          <Route path='/' element={<Home />} />
          <Route path='/u52' element={<Unit52 />} />
          <Route path='/u53' element={<Unit53 />} />
          <Route path='/u54' element={<Unit54 />} />
          <Route path='/u90' element={<Unit90 />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </>
      );
    } else if (unit === 'u52') {
      return <Route path='/u52' element={<Unit52 />} />;
    } else if (unit === 'u53') {
      return <Route path='/u53' element={<Unit53 />} />;
    } else if (unit === 'u54') {
      return <Route path='/u54' element={<Unit54 />} />;
    } else if (unit === 'u90') {
      return <Route path='/u90' element={<Unit90 />} />;
    } else {
      return (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </>
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <Navbar />
        <Routes>{renderRoutes()}</Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
