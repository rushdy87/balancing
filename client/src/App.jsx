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

function App() {
  const renderRoutes = true ? (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/users' element={<Users />} />
        <Route path='/tanks-info' element={<TanksInfo />} />

        <Route path='/u52' element={<Unit52 />} />
        <Route path='/u53' element={<Unit53 />} />
        <Route path='/u54' element={<Unit54 />} />
        <Route path='/u90' element={<Unit90 />} />

        <Route path='/reports' element={<Reports />} />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  ) : (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );

  return <Router>{renderRoutes}</Router>;
}

export default App;
