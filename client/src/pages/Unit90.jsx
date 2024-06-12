import { useContext } from 'react';

import { AddTanksForm } from '../components';
import { TanksInfoContext } from '../context/TanksInfoContext';
import { addVolumeToTanks } from '../utils/api';

const Unit90 = () => {
  const { getTanksGroupedByProduct } = useContext(TanksInfoContext);

  const tanks = [...getTanksGroupedByProduct('u90')];

  const addVolumes = async (day, tanks) => {
    //tanks her: {u52:[], u53:[]}
    try {
      await addVolumeToTanks('u90', { day, tanks: tanks['u90'] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AddTanksForm unit='Unit 90' tanksGroup={tanks} action={addVolumes} />
    </div>
  );
};

export default Unit90;
