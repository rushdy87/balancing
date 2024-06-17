import { useContext, useEffect, useMemo, useState } from 'react';

import { TanksInfoContext } from '../../context/TanksInfoContext';
import {
  AddTanksForm,
  Blending,
  Button,
  ContentPreview,
  Datepicker,
  Modal,
} from '../../components';

import './Unit52.scss';

const products = [
  { id: 1, column: 'lpg', name: 'الغاز السائل' },
  { id: 2, column: 'pg', name: 'البنزين السوبر' },
  { id: 3, column: 'rg', name: 'البنزين المحسن' },
  { id: 4, column: 'diesel', name: 'زيت الغاز' },
  { id: 5, column: 'hfo', name: 'زيت الوقود الثقيل' },
];

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPreview(true);
    // try {
    //   await addVolumeToTanks('u52', { day, tanks });
    //   await addBlending({ ...blendingQuantities, day });
    //   setTanks({});
    //   setBlendingQuantities({});
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className='u52-container'>
      <div className='u52_header'>
        <h2>Unit 52</h2>
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
        <div className='u52_blending'>
          <h3 className='u52_subheading'>مزج المنتجات</h3>
          <div>
            <Blending
              products={products}
              setBlendingQuantities={setBlendingQuantities}
            />
          </div>
        </div>
        <div className='u52_crude'>
          <h3 className='u52_subheading'>النفط الخام</h3>
          <div></div>
        </div>
        <div className='u52_gas'>
          <h3 className='u52_subheading'>الغاز الطبيعي</h3>
          <div></div>
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
                subjects: { tanks, blendingQuantities },
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
