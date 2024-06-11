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

  const ChangeTankValue = (index, key, value) => {
    const newTanks = [...tanksInfo];
    newTanks[index][key] = value;
    setTanksInfo(newTanks);
  };

  const updateTanksValues = () => {
    console.log(tanksInfo);
  };

  return (
    <TanksInfoContext.Provider
      value={{ tanksInfo, ChangeTankValue, updateTanksValues }}
    >
      {children}
    </TanksInfoContext.Provider>
  );
};
