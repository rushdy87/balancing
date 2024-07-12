import { addTanksVolumes } from './u52tanks';
import { addBlendingVolumes } from './blending';
import { addOilVolumes } from './crude-oil';
import { addNaturalGasVolumes } from './natural-gas';

export const addUnit52Data = async (
  tanksData,
  blendingData,
  oilData,
  gasData
) => {
  const results = await Promise.all([
    addTanksVolumes(tanksData),
    addBlendingVolumes(blendingData),
    addOilVolumes(oilData),
    addNaturalGasVolumes(gasData),
  ]);

  const errors = results
    .filter((result) => result.error)
    .map((result) => result.error);

  if (errors.length > 0) {
    return errors;
  }

  console.log(results);
};
