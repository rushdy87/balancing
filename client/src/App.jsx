import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';
import {
  Home,
  Login,
  TanksInfo,
  Unit52,
  Unit53,
  Unit90,
  Users,
  Reports,
} from './pages';

function App() {
  const token = true;
  const renderRoutes = token ? (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/users' element={<Users />} />
      <Route path='/tanks-info' element={<TanksInfo />} />

      <Route path='/u52' element={<Unit52 />} />
      <Route path='/u53' element={<Unit53 />} />
      <Route path='/u90' element={<Unit90 />} />

      <Route path='/reports' element={<Reports />} />

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  ) : (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
  return <Router>{renderRoutes}</Router>;
}

export default App;
