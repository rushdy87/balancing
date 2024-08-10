import { useEffect, useState } from 'react';
import NumberInput from '../../NumberInput/NumberInput';
import Button from '../../Button/Button';
import './SolidSulphurStoreApproval.scss';
import { updateSolidSulphurStore } from '../../../api/solid-sulphur-store';

const SolidSulphurStoreApproval = ({ storage, day }) => {
  const [editMode, setEditMode] = useState(false);
  const [storageData, setStorageData] = useState({ ...storage });

  const handleValueChange = (event) => {
    const volume = parseInt(event.target.value, 10);
    const name = event.target.name;

    setStorageData((prev) => ({ ...prev, [name]: volume }));
  };

  const handleEdit = async () => {
    try {
      await updateSolidSulphurStore({
        day,
        data: {
          big_bag: storageData.big_bag,
          small_bag: storageData.small_bag,
          silos: storageData.silos,
          temporary_shelter: storageData.temporary_shelter,
        },
      });
    } catch (error) {
      console.log('there is an error', error);
    }
    setEditMode(false);
  };

  useEffect(() => {
    setStorageData({ ...storage });
  }, [storage]);
  return (
    <div className='solidSulphurStoreApproval'>
      <div className='solidSulphurStoreApproval_wrapper'>
        <div className='solidSulphurStoreApproval_volumes'>
          <span>الأكياس الكبيرة</span>
          <span>{storageData.big_bag}</span>
        </div>
        <div className='solidSulphurStoreApproval_volumes'>
          <span>الأكياس الصغيرة</span>
          <span>{storageData.small_bag}</span>
        </div>
        <div className='solidSulphurStoreApproval_volumes'>
          <span>السايلوات</span>
          <span>{storageData.silos}</span>
        </div>
        <div className='solidSulphurStoreApproval_volumes'>
          <span>الخزن المؤقت</span>
          <span>{storageData.temporary_shelter}</span>
        </div>
        <div className='solidSulphurStoreApproval_volumes'>
          <span>القابل</span>
          <span>{storageData.actual_quantity}</span>
        </div>
        <div className='solidSulphurStoreApproval_volumes'>
          <span>التشغيلي</span>
          <span>{storageData.working_quantity}</span>
        </div>

        <span
          className='SolidSulphurTransportApproval_edit'
          onClick={() => setEditMode(!editMode)}
        >
          ✏️
        </span>
      </div>
      {editMode && (
        <div className='edit_inputs'>
          <div className='edit_input'>
            <label htmlFor='big_bag'>الأكياس الكبيرة</label>
            <NumberInput
              id='big_bag'
              name='big_bag'
              value={storageData.big_bag}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_input'>
            <label htmlFor='small_bag'>الأكياس الصغيرة</label>
            <NumberInput
              id='small_bag'
              name='small_bag'
              value={storageData.small_bag}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_input'>
            <label htmlFor='silos'>السايلوات</label>
            <NumberInput
              id='silos'
              name='silos'
              value={storageData.silos}
              onChange={handleValueChange}
            />
          </div>
          <div className='edit_input'>
            <label htmlFor='temporary_shelter'>الخزن المؤقت</label>
            <NumberInput
              id='temporary_shelter'
              name='temporary_shelter'
              value={storageData.temporary_shelter}
              onChange={handleValueChange}
            />
          </div>
          <Button onClick={handleEdit}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default SolidSulphurStoreApproval;
