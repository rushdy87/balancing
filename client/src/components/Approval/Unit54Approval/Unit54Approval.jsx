import { useEffect, useState } from 'react';
import AddNotes from '../../AddNotes/AddNotes';
import './Unit54Approval.scss';
import { getAllUnitData } from '../../../api/admin';
import SolidSulphurTransportApproval from '../SolidSulphurTransportApproval/SolidSulphurTransportApproval';
import SolidSulphuProductionApproval from '../SolidSulphuProductionApproval/SolidSulphuProductionApproval';

const isObjectEmpty = (objectName) => {
  return (
    Object.keys(objectName).length === 0 && objectName.constructor === Object
  );
};

const Unit54Approval = ({ day }) => {
  const [store, setStore] = useState({});
  const [production, setProduction] = useState({});
  const [transport, setTransport] = useState({});

  useEffect(() => {
    (async () => {
      const data = await getAllUnitData('u54', day);
      setStore(data?.store);
      setProduction(data?.production);
      setTransport(data?.transport);
    })();
  }, [day]);

  return (
    <div className='Approval_cotainer'>
      <h2>Unit 54</h2>
      {isObjectEmpty(store) ? (
        <h2>لم تتم اضافة خزين الكبريت الصلب</h2>
      ) : (
        <div className='solidSulphur_store_wrapper'></div>
      )}
      {isObjectEmpty(production) ? (
        <h2>لم تتم اضافة انتاج الكبريت الصلب</h2>
      ) : (
        <div className='solidSulphur_production_wrapper'>
          <h3 className='Approval_subtitle'>إنتاج الكبريت</h3>
          <SolidSulphuProductionApproval
            quantity={production.quantity}
            day={day}
          />
        </div>
      )}
      {isObjectEmpty(transport) ? (
        <h2>لم تتم اضافة كميات تحميل الكبريت الصلب </h2>
      ) : (
        <div className='solidSulphur_transport_wrapper'>
          <h3 className='Approval_subtitle'>الكبريت المُحمل</h3>
          <SolidSulphurTransportApproval
            quantity={transport?.quantity}
            tankers={transport?.tankers}
            day={day}
          />
        </div>
      )}
      <AddNotes unit='u54' day={day} />
    </div>
  );
};

export default Unit54Approval;
