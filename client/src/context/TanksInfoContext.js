import { createContext, useEffect, useState } from 'react';
import { fetchTanksInfo } from '../utils/api';

export const TanksInfoContext = createContext([]);

export const TanksInfoProvider = ({ children }) => {
  const [tanksInfo, setTanksInfo] = useState([]);

  useEffect(() => {
    (async () => {
      const { tanks } = await fetchTanksInfo();
      setTanksInfo(tanks);
    })();
  }, []);

  return (
    <TanksInfoContext.Provider value={{ tanksInfo, setTanksInfo }}>
      {children}
    </TanksInfoContext.Provider>
  );
};
