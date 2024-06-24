import { useContext, useEffect, useMemo, useState } from 'react';

import { TanksInfoContext } from '../../context/TanksInfoContext';
import {
  AddTanksForm,
  Blending,
  Button,
  ContentPreview,
  CrudeOil,
  Datepicker,
  Modal,
  NaturalGas,
} from '../../components';

import './Unit52.scss';

const Unit52 = () => {
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
    () => getTanksGroupedByProduct('u52'),
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

  // Blending
  const [blendingQuantities, setBlendingQuantities] = useState({
    lpg: 0,
    pg: 0,
    rg: 0,
    diesel: 0,
    hfo: 0,
  });

  // Crude Oil
  const [crudeOil, setCrudeOil] = useState({
    reservoir_m3: 0,
    reservoir_bbl: 0,
    receiving: 0,
    sending: 0,
  });

  // Natural Gas
  const [naturalGas, setNaturalGas] = useState({
    receiving_m3: 0,
    receiving_mscf: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPreview(true);
    // add tanks // {day, tanks}
    console.log({ day, tanks });
    // add blending
    console.log({ day, ...blendingQuantities });
    // add crude
    console.log({ day, ...crudeOil });
    // add Gas
    console.log({ day, ...naturalGas });
  };

  return (
    <div className='u52-container'>
      <div className='u52_header'>
        <h1>Unit 52</h1>
        <Datepicker date={day} changeDate={changeDate} />
      </div>
      <div className='hr' />
      <form className='u52_form' onSubmit={handleSubmit}>
        <div className='u52_tanks'>
          <h3 className='u52_subheading'>الخزين</h3>
          <div>
            {tanks && (
              <AddTanksForm tanksGroup={tanksGroup} setTanks={setTanks} />
            )}
          </div>
        </div>
        <div className='blending_and_crude'>
          <div className='u52_blending'>
            <h3 className='u52_subheading'>مزج المنتجات</h3>
            <div>
              <Blending setBlendingQuantities={setBlendingQuantities} />
            </div>
          </div>

          <div className='u52_crudeOil'>
            <h3 className='u52_subheading'>النفط الخام</h3>
            <div>
              <CrudeOil setCrudeOil={setCrudeOil} />
            </div>
          </div>
          <div className='u52_gas'>
            <h3 className='u52_subheading'>الغاز الطبيعي</h3>
            <div>
              <NaturalGas setNaturalGas={setNaturalGas} />
            </div>
          </div>
        </div>
        <div className='u52_btn'>
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
                unit: 'Unit 52',
                subjects: { tanks, blendingQuantities, crudeOil, naturalGas },
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

export default Unit52;
