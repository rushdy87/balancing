import { useContext } from 'react';

import { TanksInfoContext } from '../../context/TanksInfoContext';

import './TanksInfo.scss';

const TanksInfo = () => {
  const { tanksInfo } = useContext(TanksInfoContext);
  const renderTanks = tanksInfo.map((tank) => {
    return (
      <div className='tanksInfo-row' key={tank.tag_number}>
        <p className='tanksInfo-column'>{tank.tag_number}</p>
        <p className='tanksInfo-column'>{tank.product}</p>
        <div className='tanksInfo-column'>
          <input type='text' id={tank.bottom} name={tank.bottom} />
        </div>
        <div className='tanksInfo-column'>
          <input
            type='text'
            id={tank.working_volume}
            name={tank.working_volume}
          />
        </div>
      </div>
    );
  });
  return (
    <div className='tanksInfo-container'>
      <div className='tanksInfo-row'>
        <h3 className='tanksInfo-column'>اسم الخزان</h3>
        <h3 className='tanksInfo-column'>المنتوج</h3>
        <h3 className='tanksInfo-column'>القعر</h3>
        <h3 className='tanksInfo-column'>الحجم التشغيلي</h3>
      </div>
      <form>{renderTanks}</form>
    </div>
  );
};

export default TanksInfo;
