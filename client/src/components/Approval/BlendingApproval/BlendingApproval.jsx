import { useEffect, useState } from 'react';
import './BlendingApproval.scss';
import Button from '../../Button/Button';
import NumberInput from '../../NumberInput/NumberInput';
import { updateBlending } from '../../../api/blending';

const BlendingApproval = ({ blending, day }) => {
  const [editMode, setEditMode] = useState(false);
  const [blendingData, setBlendingData] = useState({ ...blending });

  useEffect(() => {
    setBlendingData({ ...blending });
  }, [blending]);

  const handleValueChange = (event) => {
    const volume = parseInt(event.target.value, 10);
    const name = event.target.name;

    setBlendingData((prev) => ({ ...prev, [name]: volume }));
  };

  const editHandler = async () => {
    try {
      await updateBlending({
        day,
        products: { ...blendingData },
      });
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update Blending data:', error);
    }
  };
  return (
    <div className='BlendingApproval'>
      <div className='lpg_blending'>
        <span>الغاز السائل (م3)</span>
        <span>{blendingData.lpg}</span>
      </div>
      <div className='pg_blending'>
        <span>البنزين السوبر (م3)</span>
        <span>{blendingData.pg}</span>
      </div>
      <div className='rg_blending'>
        <span>البنزين المحسن (م3)</span>
        <span>{blendingData.rg}</span>
      </div>
      <div className='diesel_blending'>
        <span>زيت الغاز (م3)</span>
        <span>{blendingData.diesel}</span>
      </div>
      <div className='hfo_blending'>
        <span>زيت الوقود الثقيل (م3)</span>
        <span>{blendingData.hfo}</span>
      </div>
      <div className='confirme_and_edit'>
        <span
          className='BlendingApproval_edit'
          onClick={() => setEditMode(!editMode)}
        >
          ✏️
        </span>
      </div>

      {editMode && (
        <div className='edit_inputs'>
          <div className='edit_lpg_blending'>
            <label htmlFor='lpg'>الغاز السائل (م3)</label>
            <NumberInput
              id='lpg'
              name='lpg'
              value={blendingData.lpg}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_pg_blending'>
            <label htmlFor='pg'>البنزين السوبر (م3)</label>
            <NumberInput
              id='pg'
              name='pg'
              value={blendingData.pg}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_rg_blending'>
            <label htmlFor='rg'>البنزين المحسن (م3)</label>
            <NumberInput
              id='rg'
              name='rg'
              value={blendingData.rg}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_diesel_blending'>
            <label htmlFor='diesel'>زيت الغاز (م3)</label>
            <NumberInput
              id='diesel'
              name='diesel'
              value={blendingData.diesel}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_hfo_blending'>
            <label htmlFor='hfo'>زيت الوقود الثقيل (م3)</label>
            <NumberInput
              id='hfo'
              name='hfo'
              value={blendingData.hfo}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_save_btn'></div>
          <Button onClick={editHandler}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default BlendingApproval;
