import { useContext } from 'react';

import { AddTanksForm } from '../../components';
import { TanksInfoContext } from '../../context/TanksInfoContext';
import { addVolumeToTanks } from '../../utils/api';

const Unit53 = () => {
  const { getTanksGroupedByProduct } = useContext(TanksInfoContext);

  const tanks = [...getTanksGroupedByProduct('u53')];

  const addVolumes = async (day, tanks) => {
    //tanks her: { u53:[]}
    try {
      await addVolumeToTanks('u53', { day, tanks: tanks['u53'] });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AddTanksForm unit='Unit 53' tanksGroup={tanks} action={addVolumes} />
    </div>
  );
};

export default Unit53;
