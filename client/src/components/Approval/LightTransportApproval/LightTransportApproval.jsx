import { useState } from 'react';
import './LightTransportApproval.scss';

const LightTransportApproval = ({ product, quantity, tankers }) => {
  const [editMode, setEditMode] = useState(false);
  const [transportVolumes, setTransportVolumes] = useState({
    quantity,
    tankers,
  });

  const handleValueChange = (event) => {
    const volume = parseInt(event.target.value, 10);
    const name = event.target.name;
    setTransportVolumes((prev) => ({ ...prev, [name]: volume }));
  };

  const handleEdit = async () => {
    setEditMode(false);
  };

  return (
    <div className='lightTransportApproval_container'>
      <div className='lightTransportApproval_wrapper'>
        <span className='lightTransportApproval_product'>{product}</span>
        <div className='lightTransportApproval_volumes'>
          <div className='lightTransportApproval_quantity'>
            <span>الكمية</span>
            <span>{transportVolumes.quantity}</span>
          </div>
          <div className='lightTransportApproval_quantity'>
            <span>الصهاريج</span>
            <span>{transportVolumes.tankers}</span>
          </div>
        </div>
        <span
          className='lightTransportApproval_edit'
          onClick={() => setEditMode(!editMode)}
        >
          ✏️
        </span>
      </div>
    </div>
  );
};

export default LightTransportApproval;
