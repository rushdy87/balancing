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
  Unit54,
} from './pages';
import { TanksInfoProvider } from './context/TanksInfoContext';
import { Navbar } from './components';

import { addOilVolumes } from './api/u52/crude-oil';

function App() {
  const token = true;
  async function makeRequest() {
    await addOilVolumes({
      day: '02-06-2024',
      reservoir_m3: 138692,
      reservoir_bbl: 872345,
      receiving: 13834,
      sending: 15000,
    });
  }
  makeRequest();
  const renderRoutes = token ? (
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
  return (
    <TanksInfoProvider>
      <Router>{renderRoutes}</Router>
    </TanksInfoProvider>
  );
}

export default App;
