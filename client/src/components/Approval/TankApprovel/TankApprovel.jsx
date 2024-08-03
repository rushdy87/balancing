import { useState } from 'react';

import './TankApprovel.scss';
import NumberInput from '../../NumberInput/NumberInput';
import Button from '../../Button/Button';
import { updateTank } from '../../../api/tanks';

const TankApprovel = ({ unit, tag_number, product, tov, day }) => {
  const [editMode, setEditMode] = useState(false);
  const [tankValue, setTankValue] = useState(tov);

  const handleValueChange = (event) => {
    const volume = parseInt(event.target.value, 10);
    setTankValue(volume);
  };

  const handleEdit = async () => {
    const res = await updateTank(unit, tag_number, day, { tov: tankValue });
    console.log(res);
    setEditMode(false);
  };

  return (
    <div className='TankApprovel_container'>
      <div className='TankApprovel_wrapper'>
        <span className='TankApprovel_product'>{product}</span>
        <span className='TankApprovel_tag_number'>{tag_number}</span>
        <span className='TankApprovel_tov'>{tankValue}</span>
        <span
          className='TankApprovel_edit'
          onClick={() => setEditMode(!editMode)}
        >
          ✏️
        </span>
      </div>
      {editMode && (
        <div className='edit_input'>
          <NumberInput
            type='number'
            id={tag_number}
            name={tag_number}
            value={tankValue}
            onChange={handleValueChange}
          />
          <Button onClick={handleEdit}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default TankApprovel;
