import { useEffect, useState } from 'react';
import './CrudeOilApproval.scss';
import { confirmCrudeOil } from '../../../api/admin';
import Button from '../../Button/Button';
import NumberInput from '../../NumberInput/NumberInput';
import { updateCrudeOil } from '../../../api/crude-oil';

const CrudeOilApproval = ({ crudeOil, day }) => {
  const [confirmation, setConfirmation] = useState(crudeOil.isConfirmed);
  const [editMode, setEditMode] = useState(false);
  const [crudeOilData, setCrudeOilData] = useState({ ...crudeOil });

  useEffect(() => {
    setConfirmation(crudeOil.isConfirmed);
    setCrudeOilData({ ...crudeOil });
    console.log('useEffect');
  }, [crudeOil.isConfirmed]);

  const handleConfirmation = async () => {
    try {
      const confirmationResult = await confirmCrudeOil(day);
      setConfirmation(confirmationResult);
    } catch (error) {
      console.error('Failed to confirm crude oil:', error);
    }
  };

  const handleValueChange = (event) => {
    const volume = parseInt(event.target.value, 10);
    const name = event.target.name;

    setCrudeOilData((prev) => ({ ...prev, [name]: volume }));
  };

  const editHandler = async () => {
    await updateCrudeOil({
      day,
      items: {
        reservoir_m3: crudeOilData.reservoir_m3,
        reservoir_bbl: crudeOilData.reservoir_bbl,
        receiving: crudeOilData.receiving,
        sending: crudeOilData.sending,
      },
    });
    setEditMode(false);
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
              id='reservoir_m3'
              name='reservoir_m3'
              value={crudeOilData.reservoir_m3}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_reservoir_bbl'>
            <label htmlFor='reservoir_bbl'>خزين النفط الخام (bbl)</label>
            <NumberInput
              id='reservoir_bbl'
              name='reservoir_bbl'
              value={crudeOilData.reservoir_bbl}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_receiving'>
            <label htmlFor='receiving'>النفط الخام المستلم</label>
            <NumberInput
              id='receiving'
              name='receiving'
              value={crudeOilData.receiving}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_sending'>
            <label htmlFor='sending'>النفط الخام المرسل</label>
            <NumberInput
              id='sending'
              name='sending'
              value={crudeOilData.sending}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_save_btn'>
            <Button onClick={editHandler}>Save</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudeOilApproval;
