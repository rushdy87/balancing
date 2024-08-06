import { useEffect, useState } from 'react';
import './PumpingApproval.scss';
import NumberInput from '../../NumberInput/NumberInput';
import Button from '../../Button/Button';
import { updatePumping } from '../../../api/pumping';

const PumpingApproval = ({ product, toKarbala, toNajaf, day }) => {
  const [editMode, setEditMode] = useState(false);
  const [pumpingVolumes, setPumpingVolumes] = useState({ toKarbala, toNajaf });

  useEffect(() => {
    setPumpingVolumes({ toKarbala, toNajaf });
  }, [toKarbala, toNajaf]);

  const handleValueChange = (event) => {
    const volume = parseInt(event.target.value, 10);
    const name = event.target.name;
    setPumpingVolumes((prev) => ({ ...prev, [name]: volume }));
  };

  const handleEdit = async () => {
    await updatePumping(product, {
      day,
      items: { ...pumpingVolumes },
    });

    setEditMode(false);
  };

  return (
    <div className='PumpingApproval_container'>
      <div className='PumpingApproval_wrapper'>
        <span className='PumpingApproval_product'>{product}</span>
        <div className='PumpingApproval_volumes'>
          <span className='PumpingApproval_toKarbala'>
            <span>كربلاء</span>
            <span>{pumpingVolumes.toKarbala}</span>
          </span>
          <span className='PumpingApproval_toNajaf'>
            <span>النجف</span>
            <span>{pumpingVolumes.toNajaf}</span>
          </span>
        </div>
        <span
          className='PumpingApproval_edit'
          onClick={() => setEditMode(!editMode)}
        >
          ✏️
        </span>
      </div>

      {editMode && (
        <div className='edit_input'>
          <div className='side_input'>
            <label htmlFor='toKarbala'>كربلاء</label>
            <NumberInput
              id='toKarbala'
              name='toKarbala'
              value={pumpingVolumes.toKarbala}
              onChange={handleValueChange}
            />
          </div>
          <div className='side_input'>
            <label htmlFor='toNajaf'>النجف</label>
            <NumberInput
              id='toNajaf'
              name='toNajaf'
              value={pumpingVolumes.toNajaf}
              onChange={handleValueChange}
            />
          </div>
          <Button onClick={handleEdit}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default PumpingApproval;
