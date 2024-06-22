import { useContext, useEffect, useMemo, useState } from 'react';

import { TanksInfoContext } from '../../context/TanksInfoContext';

import './Unit53.scss';
import {
  AddTanksForm,
  Button,
  ContentPreview,
  Datepicker,
  Modal,
  Transport,
} from '../../components';

const Unit53 = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { getTanksGroupedByProduct } = useContext(TanksInfoContext);

  const [day, setDay] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  const changeDate = (newDate) => {
    setDay(
      `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    );
  };
  const tanksGroup = useMemo(
    () => getTanksGroupedByProduct('u53'),
    [getTanksGroupedByProduct]
  );

  // Tanks
  const [tanks, setTanks] = useState({});

  useEffect(() => {
    let tanksItems = {};
    tanksGroup.forEach((item) => {
      for (const t of item.tanks) {
        tanksItems = { ...tanksItems, ...t };
      }
    });

    setTanks(tanksItems);
  }, [tanksGroup]);

  // Transport
  const [transport, setTransport] = useState({ quantity: 0, tankers: 0 });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPreview(true);
  };

  return (
    <div className='u53-container'>
      <div className='u53_header'>
        <h1>Unit 53</h1>
        <Datepicker date={day} changeDate={changeDate} />
      </div>
      <div className='hr' />
      <form className='u53_form' onSubmit={handleSubmit}>
        <div className='u53_inputs'>
          <div className='u53_tanks'>
            <h3 className='u53_subheading'>الخزين</h3>
            <div>
              {tanks && (
                <AddTanksForm tanksGroup={tanksGroup} setTanks={setTanks} />
              )}
            </div>
          </div>
          <div className='u53_transport'>
            <h3 className='u53_subheading'>تحميل اسفلت الرصف</h3>
            <div>
              <Transport item='PavingAsphalt' setTransport={setTransport} />
            </div>
          </div>
        </div>
        <div className='u53_btn'>
          <Button type='submit' className='AddTanksForm-btn'>
            معاينة
          </Button>
        </div>
      </form>

      {/* Modal */}
      {showPreview && (
        <Modal
          renderedContent={
            <ContentPreview
              content={{
                day,
                unit: 'Unit 53',
                subjects: { tanks, transport },
              }}
            />
          }
          save={() => console.log('Save')}
          close={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default Unit53;
