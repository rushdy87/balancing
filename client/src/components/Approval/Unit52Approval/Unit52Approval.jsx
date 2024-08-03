import { useEffect, useState } from 'react';
import './Unit52Approval.scss';
import { getAllUnitData } from '../../../api/admin';
import TankApprovel from '../TankApprovel/TankApprovel';
import CrudeOilApproval from '../CrudeOilApproval/CrudeOilApproval';
import NaturlGasApproval from '../NaturlGasApproval/NaturlGasApproval';
import BlendingApproval from '../BlendingApproval/BlendingApproval';

const isObjectEmpty = (objectName) => {
  return (
    Object.keys(objectName).length === 0 && objectName.constructor === Object
  );
};

const Unit52Approval = ({ day }) => {
  const [tanks, setTanks] = useState([]);
  const [crudeOil, setCrudeOil] = useState({});
  const [naturalGas, setNaturalGas] = useState({});
  const [blending, setBlending] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getAllUnitData('u52', day);
      setTanks(data?.tanks);
      setCrudeOil(data?.crudeOil);
      setNaturalGas(data?.naturalGas);
      setBlending(data?.blending);
    })();
  }, [day]);

  return (
    <div className='Approval_cotainer'>
      <h2>Unit 52</h2>
      {tanks?.length === 0 ? (
        <h2>لم تتم اضافة الخزين بعد!</h2>
      ) : (
        <div className='tanks-wrapper'>
          <h3 className='Approval_subtitle'>الخزين</h3>
          {tanks.map(({ tag_number, product, tov, isConfirmed }) => (
            <TankApprovel
              key={tag_number}
              unit='u52'
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
        <h2>لم تتم اضافة بيانات النفط الخام</h2>
      ) : (
        <div className='crudeOil-wrapper'>
          <h3 className='Approval_subtitle'>النفط الخام</h3>
          <CrudeOilApproval crudeOil={crudeOil} day={day} />
        </div>
      )}

      {isObjectEmpty(naturalGas) ? (
        <h2>لم تتم اضافة بيانات الغاز الطبيعي المستلم</h2>
      ) : (
        <div className='naturalGas-wrapper'>
          <h3 className='Approval_subtitle'>الغاز المستلم الطبيعي</h3>
          <NaturlGasApproval naturalGas={naturalGas} day={day} />
        </div>
      )}

      {isObjectEmpty(blending) ? (
        <h2>لم تتم اضافة الكميات النهائية المحضرة</h2>
      ) : (
        <div className='blending-wrapper'>
          <h3 className='Approval_subtitle'>تحضير المنتجات النهائية</h3>
          <BlendingApproval blending={blending} day={day} />
        </div>
      )}
    </div>
  );
};

export default Unit52Approval;
