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

  // change the information of tank (bottom, working_volume,)
  const ChangeTankValue = (index, key, value) => {
    const newTanks = [...tanksInfo];
    newTanks[index][key] = value;
    setTanksInfo(newTanks);
  };

  // send to api to change the tanks information..
  const updateTanksValues = () => {
    const newValues = tanksInfo.map(
      ({ tag_number, bottom, working_volume }) => ({
        tag_number,
        bottom,
        working_volume,
      })
    );
    console.log(newValues);
  };

  const getTanksGroupedByProduct = (unit) => {
    // Filter tanks for unit "u52", "u53", "u90"
    const u52Tanks = tanksInfo.filter((tank) => tank.unit === unit);

    // Reduce tanks to the desired format
    const groupedTanks = u52Tanks.reduce((acc, tank) => {
      // Check if the product already exists in the accumulator
      const productGroup = acc.find((group) => group.product === tank.product);

      if (productGroup) {
        // If product group exists, add the tag_number to the tanks array
        productGroup.tanks.push({ [tank.tag_number]: 0 });
      } else {
        // If product group does not exist, create a new group
        acc.push({
          product: tank.product,
          tanks: [{ [tank.tag_number]: 0 }],
        });
      }

      return acc;
    }, []);

    return groupedTanks;
  };

  return (
    <TanksInfoContext.Provider
      value={{
        tanksInfo,
        ChangeTankValue,
        updateTanksValues,
        getTanksGroupedByProduct,
      }}
    >
      {children}
    </TanksInfoContext.Provider>
  );
};
