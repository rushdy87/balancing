import { useState } from 'react';
import './CrudeOilApproval.scss';
import { confirmeCrudeOil } from '../../../api/admin';
import Button from '../../Button/Button';
import NumberInput from '../../NumberInput/NumberInput';

const CrudeOilApproval = ({ crudeOil, day }) => {
  const [confirmation, setConfirmation] = useState(crudeOil.isConfirmed);
  const [editMode, setEditMode] = useState(false);

  const handleConfirmation = async () => {
    const confirmationResult = await confirmeCrudeOil(day);
    setConfirmation(confirmationResult);
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 38: // Up arrow
      case 40: // Down arrow
      case 37: // Left arrow
      case 39: // Right arrow
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleValueChange = (event) => {
    const volume = parseInt(event.target.value, 10);
    const name = event.target.name;
  };

  return (
    <div className='CrudeOilApproval'>
      <div className='reservoir_m3'>
        <span>خزين النفط الخام (م3)</span>
        <span>{crudeOil.reservoir_m3}</span>
      </div>
      <div className='reservoir_bbl'>
        <span>خزين النفط الخام (برميل)</span>
        <span>{crudeOil.reservoir_bbl}</span>
      </div>
      <div className='receiving'>
        <span>النفط الخام المستلم</span>
        <span>{crudeOil.receiving}</span>
      </div>
      <div className='sending'>
        <span>النفط الخام المرسل</span>
        <span>{crudeOil.sending}</span>
      </div>
      <div className='confirme_and_edit'>
        <span
          className='CrudeOilApproval_isConfirmed'
          onClick={handleConfirmation}
        >
          {confirmation ? '🟢' : '🔴'}
        </span>
        <span
          className='CrudeOilApproval_edit'
          onClick={() => setEditMode(!editMode)}
        >
          ✏️
        </span>
      </div>
      {editMode && (
        <div className='edit_inputs'>
          <div className='edit_reservoir_m3'>
            <label htmlFor='reservoir_m3'>خزين النفط الخام (م3)</label>
            <NumberInput
              type='number'
              id='reservoir_m3'
              name='reservoir_m3'
              value={crudeOil.reservoir_m3}
              onChange={handleValueChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className='edit_reservoir_bbl'>
            <label htmlFor='reservoir_bbl'>خزين النفط الخام (bbl)</label>
            <NumberInput
              type='number'
              id='reservoir_bbl'
              name='reservoir_bbl'
              value={crudeOil.reservoir_bbl}
              onChange={handleValueChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className='edit_receiving'>
            <label htmlFor='receiving'>النفط الخام المستلم</label>
            <NumberInput
              type='number'
              id='receiving'
              name='receiving'
              value={crudeOil.receiving}
              onChange={handleValueChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className='edit_sending'>
            <label htmlFor='sending'>النفط الخام المرسل</label>
            <NumberInput
              type='number'
              id='sending'
              name='sending'
              value={crudeOil.sending}
              onChange={handleValueChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className='edit_save_btn'>
            <Button>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudeOilApproval;
