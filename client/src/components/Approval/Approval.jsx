import { useEffect, useState } from 'react';
import './Approval.scss';
import { getAllUnitData } from '../../api/admin';
import TankApprovel from './TankApprovel/TankApprovel';
import CrudeOilApproval from './CrudeOilApproval/CrudeOilApproval';

const unitsname = {
  u52: 'Unit 52',
  u53: 'Unit 53',
  u54: 'Unit 54',
  u90: 'Unit 90',
};

const isObjectEmpty = (objectName) => {
  return (
    Object.keys(objectName).length === 0 && objectName.constructor === Object
  );
};

const Approval = ({ unit, day }) => {
  const [tanks, setTanks] = useState([]);
  const [crudeOil, setCrudeOil] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getAllUnitData(unit, day);
      setTanks(data?.tanks);
      setCrudeOil(data.crudeOil);
    })();
  }, [day, unit, tanks, crudeOil]);

  return (
    <div className='Approval_cotainer'>
      <h2>{unitsname[unit]}</h2>
      {tanks?.length === 0 ? (
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
      {isObjectEmpty(crudeOil) ? (
        <h2>لم تتم اضافة البيانات النفط الخام</h2>
      ) : (
        <div className='crudeOil-wrapper'>
          <h3 className='Approval_subtitle'>النفط الخام</h3>
          <CrudeOilApproval crudeOil={crudeOil} day={day} />
        </div>
      )}
    </div>
  );
};

export default Approval;
