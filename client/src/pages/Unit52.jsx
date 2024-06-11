import { useContext } from 'react';

import { AddTanksForm } from '../components';
import { TanksInfoContext } from '../context/TanksInfoContext';

const Unit52 = () => {
  const { getTanksGroupedByProduct } = useContext(TanksInfoContext);

  const tanks = [
    ...getTanksGroupedByProduct('u52'),
    ...getTanksGroupedByProduct('u53'),
  ];
  return (
    <div>
      <AddTanksForm unit='Unit 52' tanksGroup={tanks} action={() => {}} />
    </div>
  );
};

export default Unit52;
