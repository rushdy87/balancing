import { useState } from 'react';
import { confirmeTank } from '../../../api/admin';
import './TankApprovel.scss';

const TankApprovel = ({ tag_number, product, pumpable, isConfirmed, day }) => {
  const [confirmation, setConfirmation] = useState(isConfirmed);

  const handleConfirmation = async () => {
    const confirmationResult = await confirmeTank('u52', day, tag_number);
    setConfirmation(confirmationResult);
  };
  return (
    <div className='TankApprovel_container'>
      <span className='TankApprovel_product'>{product}</span>
      <span className='TankApprovel_tag_number'>{tag_number}</span>
      <span className='TankApprovel_pumpable'>{pumpable}</span>
      <span className='TankApprovel_isConfirmed' onClick={handleConfirmation}>
        {confirmation ? '🟢' : '🔴'}
      </span>
    </div>
  );
};

export default TankApprovel;
