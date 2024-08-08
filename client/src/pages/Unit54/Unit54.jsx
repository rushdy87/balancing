import { useState } from 'react';
import './Unit54.scss';
import {
  Button,
  ContentPreview,
  Datepicker,
  Modal,
  NumberInput,
  Transport,
} from '../../components';
import { addSolidSulphurStore } from '../../api/solid-sulphur-store';
import { addTransport } from '../../api/transport';

const Unit54 = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [day, setDay] = useState(
    `${new Date().getDate() - 1}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  const changeDate = (newDate) => {
    setDay(
      `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    );
  };

  // solid Sulphur Storge
  const [solidSulphurStorge, setSolidSulphurStorge] = useState({
    big_bag: 0,
    small_bag: 0,
    silos: 0,
    temporary_shelter: 0,
  });

  // addSolid Sulphur Transport
  const [solidSulphurTransport, setSolidSulphurTransport] = useState({
    quantity: 0,
    tankers: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowPreview(true);
  };

  const addVolumes = async () => {
    const storingResult = await addSolidSulphurStore({
      day,
      ...solidSulphurStorge,
    });
    console.log(storingResult);
    setSolidSulphurStorge({
      big_bag: 0,
      small_bag: 0,
      silos: 0,
      temporary_shelter: 0,
    });

    const tarnsportResult = await addTransport('u54', {
      day,
      ...solidSulphurTransport,
    });
    console.log(tarnsportResult);
    setSolidSulphurTransport({
      quantity: 0,
      tankers: 0,
    });

    setShowPreview(false);
  };

  return (
    <div className='u54-container'>
      <div className='u54_header'>
        <h1>Unit 54</h1>
        <Datepicker date={day} changeDate={changeDate} />
      </div>
      <div className='hr' />
      <form className='u54-form' onSubmit={handleSubmit}>
        <div className='u54-form_inputs'>
          <div className='u54_input_filed'>
            <h3 className='u54_subheading'>خزين الكبريت الصلب</h3>
            <div className='u54_input_filed_box'>
              <div className='u54_input_filed_row'>
                <label htmlFor='actual_quantity'>الأكياس الكبيرة</label>
                <NumberInput
                  id='actual_quantity'
                  name='actual_quantity'
                  value={solidSulphurStorge.big_bag}
                  onChange={(e) => {
                    setSolidSulphurStorge((prev) => ({
                      ...prev,
                      big_bag: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className='u54_input_filed_row'>
                <label htmlFor='actual_quantity'>الأكياس الصغيرة</label>
                <NumberInput
                  id='actual_quantity'
                  name='actual_quantity'
                  value={solidSulphurStorge.small_bag}
                  onChange={(e) => {
                    setSolidSulphurStorge((prev) => ({
                      ...prev,
                      small_bag: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className='u54_input_filed_row'>
                <label htmlFor='actual_quantity'>السايلوات</label>
                <NumberInput
                  id='actual_quantity'
                  name='actual_quantity'
                  value={solidSulphurStorge.silos}
                  onChange={(e) => {
                    setSolidSulphurStorge((prev) => ({
                      ...prev,
                      silos: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className='u54_input_filed_row'>
                <label htmlFor='actual_quantity'>الخزين المؤقت</label>
                <NumberInput
                  id='actual_quantity'
                  name='actual_quantity'
                  value={solidSulphurStorge.temporary_shelter}
                  onChange={(e) => {
                    setSolidSulphurStorge((prev) => ({
                      ...prev,
                      temporary_shelter: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          <div className='u54_input_filed'>
            <h3 className='u54_subheading'>تحميل الكبريت الصلب</h3>

            <Transport
              item='solidSulphur'
              transport={solidSulphurTransport}
              setTransport={setSolidSulphurTransport}
            />
          </div>
        </div>
        <Button type='sumit'>معاينة</Button>
      </form>

      {/* Modal */}
      {showPreview && (
        <Modal
          renderedContent={
            <ContentPreview
              content={{
                day,
                unit: 'Unit 52',
                subjects: {
                  solidSulphurStorge,
                  solidSulphurTransport,
                },
              }}
            />
          }
          save={addVolumes}
          close={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default Unit54;
