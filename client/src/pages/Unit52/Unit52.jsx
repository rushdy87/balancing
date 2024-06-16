import { useContext, useEffect, useState } from 'react';

import {
  AddTanksForm,
  Datepicker,
  Button,
  Blending,
  Modal,
  ContentPreview,
} from '../../components';
import { TanksInfoContext } from '../../context/TanksInfoContext';
import { addBlending, addVolumeToTanks } from '../../utils/api';

import './Unit52.scss';

const products = [
  { id: 1, column: 'lpg', name: 'الغاز السائل' },
  { id: 2, column: 'pg', name: 'البنزين السوبر' },
  { id: 3, column: 'rg', name: 'البنزين المحسن' },
  { id: 4, column: 'diesel', name: 'زيت الغاز' },
  { id: 5, column: 'hfo', name: 'زيت الوقود الثقيل' },
];

const Unit52 = () => {
  const [tanks, setTanks] = useState({});
  const [day, setDay] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );

  const [blendingQuantities, setBlendingQuantities] = useState({});

  const [showPreview, setShowPreview] = useState(false);

  const { getTanksGroupedByProduct } = useContext(TanksInfoContext);

  const changeDate = (newDate) => {
    setDay(
      `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    );
  };

  useEffect(() => {
    if (showPreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showPreview]);

  const tanksGroupe = [...getTanksGroupedByProduct('u52')];

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(tanks);
    console.log(blendingQuantities);
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
      <form className='u52_tanks-form' onSubmit={handleSubmit}>
        <div className='u52_tanks'>
          <h3>الخزين</h3>
          <AddTanksForm tanksGroup={tanksGroupe} setTanks={setTanks} />
        </div>
        <div className='u52_blending'>
          <h3>مزج المنتجات</h3>
          <Blending
            products={products}
            setBlendingQuantities={setBlendingQuantities}
          />
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
