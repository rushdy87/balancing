import { useState } from 'react';
import { confirmeTank } from '../../../api/admin';
import './TankApprovel.scss';
import NumberInput from '../../NumberInput/NumberInput';
import Button from '../../Button/Button';
import { updateTank } from '../../../api/tanks';

const TankApprovel = ({ tag_number, product, tov, isConfirmed, day }) => {
  const [confirmation, setConfirmation] = useState(isConfirmed);
  const [editMode, setEditMode] = useState(false);
  const [tankValue, setTankValue] = useState(tov);

  const handleConfirmation = async () => {
    const confirmationResult = await confirmeTank('u52', day, tag_number);
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
    setTankValue(volume);
  };

  const handleEdit = async () => {
    const res = await updateTank('u52', tag_number, day, { tov: tankValue });
    console.log(res);
    setEditMode(false);
  };

  return (
    <div className='TankApprovel_container'>
      <div className='TankApprovel_wrapper'>
        <span className='TankApprovel_product'>{product}</span>
        <span className='TankApprovel_tag_number'>{tag_number}</span>
        <span className='TankApprovel_tov'>{tov}</span>
        <span className='TankApprovel_isConfirmed' onClick={handleConfirmation}>
          {confirmation ? '🟢' : '🔴'}
        </span>
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
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleEdit}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default TankApprovel;
