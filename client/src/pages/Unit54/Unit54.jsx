import { useState } from 'react';

import {
  Button,
  ContentPreview,
  Datepicker,
  Modal,
  NumberInput,
} from '../../components';

import './Unit54.scss';

const Unit54 = () => {
  const [showPreview, setShowPreview] = useState(false);

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

  // solid Sulphur Storge
  const [solidSulphurStorge, setSolidSulphurStorge] = useState({
    actual_quantity: 0,
  });

  // Solid Sulphur Production
  const [solidSulphurProduction, setSolidSulphurProduction] = useState({
    quantity: 0,
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
                <label htmlFor='actual_quantity'>الكمية</label>
                <NumberInput
                  id='actual_quantity'
                  name='actual_quantity'
                  onChange={(e) => {
                    setSolidSulphurStorge({ actual_quantity: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className='u54_input_filed'>
            <h3 className='u54_subheading'>الكبريت الصلب المُنتج</h3>
            <div className='u54_input_filed_box'>
              <div className='u54_input_filed_row'>
                <label htmlFor='quantity'>الكمية</label>
                <NumberInput
                  id='quantity'
                  name='quantity'
                  onChange={(e) => {
                    setSolidSulphurProduction({ quantity: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className='u54_input_filed'>
            <h3 className='u54_subheading'>تحميل الكبريت الصلب</h3>
            <div className='u54_input_filed_box'>
              <div className='u54_input_filed_row'>
                <label htmlFor='quantity'>الكمية</label>
                <NumberInput
                  id='quantity'
                  name='quantity'
                  onChange={(e) => {
                    setSolidSulphurTransport((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className='u54_input_filed_row'>
                <label htmlFor='tankers'>عدد الشاحنات</label>
                <NumberInput
                  id='tankers'
                  name='tankers'
                  onChange={(e) => {
                    setSolidSulphurTransport((prev) => ({
                      ...prev,
                      tankers: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='u54_btn'>
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
                subjects: {
                  solidSulphurStorge,
                  solidSulphurProduction,
                  solidSulphurTransport,
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

export default Unit54;
