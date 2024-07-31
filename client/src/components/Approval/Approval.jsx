import { useEffect, useState } from 'react';
import './Approval.scss';
import { getAllUnitData } from '../../api/admin';
import TankApprovel from './TankApprovel/TankApprovel';

const unitsname = {
  u52: 'Unit 52',
  u53: 'Unit 53',
  u54: 'Unit 54',
  u90: 'Unit 90',
};

const Approval = ({ unit, day }) => {
  const [tanks, setTanks] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllUnitData(unit, day);
      setTanks(data.tanks);
    })();
  }, [day, unit]);

  return (
    <div className='Approval_cotainer'>
      <h2>{unitsname[unit]}</h2>
      <div className='tanks-wrapper'>
        {tanks.length === 0 ? (
          ''
        ) : (
          <div>
            {tanks.map(({ tag_number, product, pumpable, isConfirmed }) => (
              <TankApprovel
                key={tag_number}
                tag_number={tag_number}
                product={product}
                pumpable={pumpable}
                isConfirmed={isConfirmed}
                day={day}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Approval;
