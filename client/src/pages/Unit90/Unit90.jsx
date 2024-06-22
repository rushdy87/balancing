import { useContext, useEffect, useMemo, useState } from 'react';

import { TanksInfoContext } from '../../context/TanksInfoContext';
import {
  AddTanksForm,
  Button,
  ContentPreview,
  Datepicker,
  Modal,
  Pumping,
  Transport,
} from '../../components';

import './Unit90.scss';

const Unit90 = () => {
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
    () => getTanksGroupedByProduct('u90'),
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

  // pumping
  const [pumpingQuantities, setPumpingQuantities] = useState({
    pgPumping: { toKarbala: 0, toNajaf: 0 },
    rgPumping: { toKarbala: 0, toNajaf: 0 },
    dieselPumping: { toKarbala: 0, toNajaf: 0 },
    kerosenePumping: { toKarbala: 0, toNajaf: 0 },
  });

  // Transport
  const [lpgTransport, setLPGTransport] = useState({ quantity: 0, tankers: 0 });
  const [rgTransport, setRGTransport] = useState({ quantity: 0, tankers: 0 });
  const [atkTransport, setATKTransport] = useState({ quantity: 0, tankers: 0 });

  // HFO Transport
  const [hfo1Transport, setHFO1Transport] = useState({
    quantity: 0,
    tankers: 0,
  });
  const [hfo2Transport, setHFO2Transport] = useState({
    quantity: 0,
    tankers: 0,
  });
  const [hfo3Transport, setHFO3Transport] = useState({
    quantity: 0,
    tankers: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPreview(true);
  };

  return (
    <div className='u90-container'>
      <div className='u90_header'>
        <h1>Unit 90</h1>
        <Datepicker date={day} changeDate={changeDate} />
      </div>
      <div className='hr' />
      <form className='u90_form' onSubmit={handleSubmit}>
        <div className='u90_tanks'>
          <h3 className='u90_subheading'>الخزين</h3>
          <div>
            {tanks && (
              <AddTanksForm tanksGroup={tanksGroup} setTanks={setTanks} />
            )}
          </div>
        </div>
        <div className='u90_pumping'>
          <h3 className='u90_subheading'>
            ضخ المنتجات الخفيفة الى شركة خطوط الانابيب النفطية
          </h3>
          <div>
            <Pumping
              pumpingQuantities={pumpingQuantities}
              setPumpingQuantities={setPumpingQuantities}
            />
          </div>
        </div>
        <div className='u90_transport'>
          <h3 className='u90_subheading'>تحميل المنتجات</h3>
          <div className='u90_transport_items'>
            <Transport item='lpg' setTransport={setLPGTransport} />
            <Transport item='rg' setTransport={setRGTransport} />
            <Transport item='atk' setTransport={setATKTransport} />
          </div>
        </div>
        <div className='u90_transport'>
          <h3 className='u90_subheading'>تحميل زيت الوقود الثقيل</h3>
          <div className='u90_transport_items'>
            <Transport item='1' setTransport={setHFO1Transport} />
            <Transport item='2' setTransport={setHFO2Transport} />
            <Transport item='3' setTransport={setHFO3Transport} />
          </div>
        </div>
        <div className='u90_btn'>
          <Button type='submit' className='AddTanksForm-btn'>
            معاينة
          </Button>
        </div>
      </form>
      {showPreview && (
        <Modal
          renderedContent={
            <ContentPreview
              content={{
                day,
                unit: 'Unit 90',
                subjects: {
                  tanks,
                  ...pumpingQuantities,
                  lpgTransport,
                  rgTransport,
                  atkTransport,
                  hfo1Transport,
                  hfo2Transport,
                  hfo3Transport,
                },
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

export default Unit90;
