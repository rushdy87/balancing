import { useContext } from 'react';

import { TanksInfoContext } from '../../context/TanksInfoContext';
import './AddTanksForm.scss';

const AddTanksForm = ({ unit }) => {
  const { getU52TanksGroupedByProduct } = useContext(TanksInfoContext);

  return (
    <div className='AddTanksForm-container'>
      <h1>{unit}</h1>
      <div className='AddTanksForm-form'>
        {getU52TanksGroupedByProduct().map((tank) => {
          return (
            <fieldset className='AddTanksForm_fieldset' key={tank.product}>
              <legend>{tank.product}</legend>
              {tank.tanks.map((tag) => {
                return (
                  <div className='AddTanksForm-inputfield' key={tag}>
                    <label htmlFor=''>{tag}</label>
                    <input type='number' />
                  </div>
                );
              })}
            </fieldset>
          );
        })}
      </div>
    </div>
  );
};

export default AddTanksForm;
