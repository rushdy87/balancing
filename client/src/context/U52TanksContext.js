import { createContext, useEffect, useState } from 'react';

export const U52TanksContext = createContext([]);

const U52TanksProvider = ({ children }) => {
  const [u52Tanks, setU52Tanks] = useState({});
  //{day: "01-01-2024, tanks: {[tag_number]: [TOV]}"}

  return (
    <U52TanksContext.Provider value={{ u52Tanks, setU52Tanks }}>
      {children}
    </U52TanksContext.Provider>
  );
};
