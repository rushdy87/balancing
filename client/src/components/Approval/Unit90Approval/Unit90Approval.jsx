import { useEffect, useState } from 'react';
import './Unit90Approval.scss';
import { getAllUnitData } from '../../../api/admin';
import TankApprovel from '../TankApprovel/TankApprovel';

const Unit90Approval = ({ day }) => {
  const [tanks, setTanks] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getAllUnitData('u90', day);
      setTanks(data?.tanks);
    })();
  }, [day]);

  return (
    <div className='Approval_cotainer'>
      <h2>Unit 90</h2>
      {tanks?.length === 0 ? (
        <h2>لم تتم اضافة الخزين بعد!</h2>
      ) : (
        <div className='tanks-wrapper'>
          <h3 className='Approval_subtitle'>الخزين</h3>
          {tanks.map(({ tag_number, product, tov, isConfirmed }) => (
            <TankApprovel
              key={tag_number}
              unit='u90'
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

export default Unit90Approval;
