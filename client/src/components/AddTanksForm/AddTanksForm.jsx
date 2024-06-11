import { useState } from 'react';

import { Datepicker } from '../../components';
import './AddTanksForm.scss';

const AddTanksForm = ({ unit, tanksGroup, action }) => {
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

  return (
    <div className='AddTanksForm-container'>
      <h1>{unit}</h1>
      <Datepicker date={day} changeDate={changeDate} />
      <form className='AddTanksForm-form'>
        {tanksGroup.map((tank) => {
          return (
            <fieldset
              className={`AddTanksForm_fieldset ${
                tank.product === 'Paving Asphalt' ? 'asphalt' : ''
              }`}
              key={tank.product}
            >
              <legend>
                <span>{tank.product}</span>
              </legend>
              {tank.tanks.map((tag) => {
                return (
                  <div className='AddTanksForm-inputfield' key={tag}>
                    <input type='number' />
                    <label htmlFor=''>{tag}</label>
                  </div>
                );
              })}
            </fieldset>
          );
        })}
        <button type='submit' className='AddTanksForm-btn'>
          حفظ
        </button>
      </form>
    </div>
  );
};

export default AddTanksForm;
