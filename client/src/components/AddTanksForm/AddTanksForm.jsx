import { useState, useEffect } from 'react';
import { Button, Datepicker } from '../../components';
import './AddTanksForm.scss';

const AddTanksForm = ({ unit, tanksGroup, action }) => {
  const [tanks, setTanks] = useState({});
  const [day, setDay] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  const [isFormValid, setIsFormValid] = useState(false);

  const changeDate = (newDate) => {
    setDay(
      `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    );
  };

  const handleValuesChange = (event) => {
    const tag = event.target.name;
    const value = parseInt(event.target.value, 10);
    const u = 'u' + tag.split('-')[1];

    setTanks((prev) => {
      const unitExists = prev[u] || {};
      const updatedUnit = {
        ...unitExists,
        [tag]: value,
      };
      return {
        ...prev,
        [u]: updatedUnit,
      };
    });
  };

  useEffect(() => {
    const allTanksFilled = tanksGroup.every((tankGroup) =>
      tankGroup.tanks.every(
        (tag) => tanks['u' + tag.split('-')[1]]?.[tag] !== undefined
      )
    );
    setIsFormValid(allTanksFilled);
  }, [tanks, tanksGroup]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      action(day, tanks);
    }
  };

  return (
    <div className='AddTanksForm-container'>
      <h1>{unit}</h1>
      <Datepicker date={day} changeDate={changeDate} />
      <form className='AddTanksForm-form' onSubmit={handleSubmit}>
        <div className='AddTanksForm-form_inputs'>
          {tanksGroup.map((tank) => (
            <fieldset className='AddTanksForm_fieldset' key={tank.product}>
              <legend>
                <span>{tank.product}</span>
              </legend>
              {tank.tanks.map((tag) => (
                <div className='AddTanksForm-inputfield' key={tag}>
                  <input
                    type='number'
                    id={tag}
                    name={tag}
                    onChange={handleValuesChange}
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              ))}
            </fieldset>
          ))}
        </div>
        <Button
          type='submit'
          className='AddTanksForm-btn'
          disabled={!isFormValid}
        >
          معاينة
        </Button>
      </form>
    </div>
  );
};

export default AddTanksForm;
