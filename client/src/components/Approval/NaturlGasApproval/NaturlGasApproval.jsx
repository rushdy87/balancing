import { useEffect, useState } from 'react';
import './NaturlGasApproval.scss';
import NumberInput from '../../NumberInput/NumberInput';
import Button from '../../Button/Button';
import { updateNaturalGas } from '../../../api/natural-gas';

const NaturlGasApproval = ({ naturalGas, day }) => {
  const [editMode, setEditMode] = useState(false);
  const [naturalGasData, setNaturalGas] = useState({ ...naturalGas });

  useEffect(() => {
    setNaturalGas({ ...naturalGas });
  }, [naturalGas]);

  const handleValueChange = (event) => {
    const volume = parseInt(event.target.value, 10);
    const name = event.target.name;

    setNaturalGas((prev) => ({ ...prev, [name]: volume }));
  };

  const editHandler = async () => {
    try {
      await updateNaturalGas({
        day,
        items: {
          receiving_m3: naturalGasData.receiving_m3,
          receiving_mscf: naturalGasData.receiving_mscf,
        },
      });
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update natural gas data:', error);
    }
  };

  return (
    <div className='NaturlGasApproval'>
      <div className='receiving_m3'>
        <span>الغاز المستلم (م3)</span>
        <span>{naturalGasData.receiving_m3}</span>
      </div>
      <div className='receiving_mscf'>
        <span>الغاز المستلم (مقمق)</span>
        <span>{naturalGasData.receiving_mscf}</span>
      </div>
      <div className='confirme_and_edit'>
        <span
          className='NaturlGasApproval_edit'
          onClick={() => setEditMode(!editMode)}
        >
          ✏️
        </span>
      </div>
      {editMode && (
        <div className='edit_inputs'>
          <div className='edit_receiving_m3'>
            <label htmlFor='receiving_m3'>الغاز المستلم (م3)</label>
            <NumberInput
              id='receiving_m3'
              name='receiving_m3'
              value={naturalGasData.receiving_m3}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_receiving_mscf'>
            <label htmlFor='receiving_mscf'>الغاز المستلم (م3)</label>
            <NumberInput
              id='receiving_mscf'
              name='receiving_mscf'
              value={naturalGasData.receiving_mscf}
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

export default NaturlGasApproval;
