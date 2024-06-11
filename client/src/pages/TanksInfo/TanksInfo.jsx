import { useContext } from 'react';

import { TanksInfoContext } from '../../context/TanksInfoContext';

import './TanksInfo.scss';

const TanksInfo = () => {
  const { tanksInfo, ChangeTankValue, updateTanksValues } =
    useContext(TanksInfoContext);

  const renderTanks = tanksInfo.map((tank, index) => {
    return (
      <div className='tanksInfo-row' key={tank.tag_number}>
        <p className='tanksInfo-column'>{tank.tag_number}</p>
        <p className='tanksInfo-column'>{tank.product}</p>
        <div className='tanksInfo-column'>
          <input
            type='number'
            id='bottom'
            name='bottom'
            volue={tank.bottom}
            onChange={(e) => ChangeTankValue(index, 'bottom', e.target.value)}
          />
        </div>
        <div className='tanksInfo-column'>
          <input
            type='number'
            id='working_volume'
            name='working_volume'
            volue={tank.working_volume}
            onChange={(e) =>
              ChangeTankValue(index, 'working_volume', e.target.value)
            }
          />
        </div>
      </div>
    );
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTanksValues();
  };

  return (
    <div className='tanksInfo-container'>
      <div className='tanksInfo-row'>
        <h3 className='tanksInfo-column'>اسم الخزان</h3>
        <h3 className='tanksInfo-column'>المنتوج</h3>
        <h3 className='tanksInfo-column'>القعر</h3>
        <h3 className='tanksInfo-column'>الحجم التشغيلي</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {renderTanks}
        <button className='tanksInfo-btn'>حفظ</button>
      </form>
    </div>
  );
};

export default TanksInfo;
