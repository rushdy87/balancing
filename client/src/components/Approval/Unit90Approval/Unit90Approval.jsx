import { useEffect, useState } from 'react';
import './Unit90Approval.scss';
import { getAllUnitData } from '../../../api/admin';
import TankApprovel from '../TankApprovel/TankApprovel';
import PumpingApproval from '../PumpingApproval/PumpingApproval';
import LightTransportApproval from '../LightTransportApproval/LightTransportApproval';
import AddNotes from '../../AddNotes/AddNotes';

const Unit90Approval = ({ day }) => {
  const [tanks, setTanks] = useState([]);
  const [pumping, setPumping] = useState([]);
  const [lightTransport, setLightTransport] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllUnitData('u90', day);
      console.log(data);

      setTanks(data?.tanks);
      setPumping(data?.pumping);
      setLightTransport(data?.lightTransport);
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

      {pumping?.length === 0 ? (
        <h2>لم تتم اضافة بيانات ضخ المنتجات</h2>
      ) : (
        <div className='pumping-wrapper'>
          <h3 className='Approval_subtitle'>ضخ المنتجات</h3>
          {pumping.map(({ product, toKarbala, toNajaf }) => {
            return (
              <PumpingApproval
                key={`${product}_pumping`}
                product={product}
                toKarbala={toKarbala}
                toNajaf={toNajaf}
                day={day}
              />
            );
          })}
        </div>
      )}

      {lightTransport?.length === 0 ? (
        <h2>لم تتم اضافة تحميل المنتجات الخفيفة</h2>
      ) : (
        <div className='lightTransportWrapper'>
          <h3 className='Approval_subtitle'>تحميل المنتجات الخفيفة</h3>
          {lightTransport.map(({ product, quantity, tankers }) => {
            return (
              <LightTransportApproval
                key={`${product}_transport`}
                product={product}
                quantity={quantity}
                tankers={tankers}
                day={day}
              />
            );
          })}
        </div>
      )}

      <AddNotes unit='u90' day={day} />
    </div>
  );
};

export default Unit90Approval;
