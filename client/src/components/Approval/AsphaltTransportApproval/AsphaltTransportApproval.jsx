import { useEffect, useState } from 'react';
import './AsphaltTransportApproval.scss';
import NumberInput from '../../NumberInput/NumberInput';
import Button from '../../Button/Button';
import { updateAsphaltTransport } from '../../../api/asphalt';

const AsphaltTransportApproval = ({ quantity, tankers, day }) => {
  const [editMode, setEditMode] = useState(false);
  const [transportVolumes, setTransportVolumes] = useState({
    quantity,
    tankers,
  });

  useEffect(() => {
    setTransportVolumes({ quantity, tankers });
  }, [quantity, tankers]);

  const handleValueChange = (event) => {
    const volume = parseInt(event.target.value, 10);
    const name = event.target.name;
    setTransportVolumes((prev) => ({ ...prev, [name]: volume }));
  };

  const handleEdit = async () => {
    try {
      await updateAsphaltTransport({
        day,
        items: { ...transportVolumes },
      });
    } catch (error) {
      console.log('there is an error', error);
    }

    setEditMode(false);
  };

  return (
    <div className='AsphaltTransportApproval_container'>
      <div className='AsphaltTransportApproval_wrapper'>
        <div className='AsphaltTransportApproval_volumes'>
          <div className='AsphaltTransportApproval_quantity'>
            <span>الكمية</span>
            <span>{transportVolumes.quantity}</span>
          </div>
          <div className='AsphaltTransportApproval_quantity'>
            <span>الصهاريج</span>
            <span>{transportVolumes.tankers}</span>
          </div>
        </div>
        <span
          className='AsphaltTransportApproval_edit'
          onClick={() => setEditMode(!editMode)}
        >
          ✏️
        </span>
      </div>
      {editMode && (
        <div className='edit_input'>
          <div className='quantity_input'>
            <label htmlFor='quantity'>الكمية</label>
            <NumberInput
              id='quantity'
              name='quantity'
              value={transportVolumes.quantity}
              onChange={handleValueChange}
            />
          </div>
          <div className='tankers_input'>
            <label htmlFor='tankers'>الصهاريج</label>
            <NumberInput
              id='tankers'
              name='tankers'
              value={transportVolumes.tankers}
              onChange={handleValueChange}
            />
          </div>
          <Button onClick={handleEdit}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default AsphaltTransportApproval;
