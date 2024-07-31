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
      setTanks(data?.tanks);
    })();
  }, [day, unit, tanks]);

  return (
    <div className='Approval_cotainer'>
      <h2>{unitsname[unit]}</h2>
      {tanks.length === 0 ? (
        <h2>لم تتم اضافة الخزين بعد!</h2>
      ) : (
        <div className='tanks-wrapper'>
          <h3 className='Approval_subtitle'>الخزين</h3>
          {tanks.map(({ tag_number, product, tov, isConfirmed }) => (
            <TankApprovel
              key={tag_number}
              tag_number={tag_number}
              product={product}
              tov={tov}
              isConfirmed={isConfirmed}
              day={day}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Approval;
