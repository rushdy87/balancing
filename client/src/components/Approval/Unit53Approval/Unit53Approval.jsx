import { useEffect, useState } from 'react';
import './Unit53Approval.scss';
import { getAllUnitData } from '../../../api/admin';
import TankApprovel from '../TankApprovel/TankApprovel';
import AsphaltTransportApproval from '../AsphaltTransportApproval/AsphaltTransportApproval';

const isObjectEmpty = (objectName) => {
  return (
    Object.keys(objectName).length === 0 && objectName.constructor === Object
  );
};

const Unit53Approval = ({ day }) => {
  const [tanks, setTanks] = useState([]);
  const [pAsphaltTransport, setPAsphaltTransport] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getAllUnitData('u53', day);
      setTanks(data?.tanks);
      setPAsphaltTransport(data?.pavingAsphaltTransport);
    })();
  }, [day]);

  return (
    <div className='Approval_cotainer'>
      <h2>Unit 53</h2>
      {tanks?.length === 0 ? (
        <h2>لم تتم اضافة الخزين بعد!</h2>
      ) : (
        <div className='tanks-wrapper'>
          <h3 className='Approval_subtitle'>الخزين</h3>
          {tanks.map(({ tag_number, product, tov, isConfirmed }) => (
            <TankApprovel
              key={tag_number}
              unit='u53'
              tag_number={tag_number}
              product={product}
              tov={tov}
              isConfirmed={isConfirmed}
              day={day}
            />
          ))}
        </div>
      )}

      {isObjectEmpty(pAsphaltTransport) ? (
        <h2>لم تتم اضافة كميات اسفلت الرصف</h2>
      ) : (
        <div className='pAsphaltTransport_wrapper'>
          <h3 className='Approval_subtitle'>اسفلت الرصف</h3>
          <AsphaltTransportApproval
            quantity={pAsphaltTransport.quantity}
            tankers={pAsphaltTransport.tankers}
            day={day}
          />
        </div>
      )}
    </div>
  );
};

export default Unit53Approval;
