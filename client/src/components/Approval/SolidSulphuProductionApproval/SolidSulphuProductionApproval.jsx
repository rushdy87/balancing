import { useEffect, useState } from 'react';
import NumberInput from '../../NumberInput/NumberInput';
import Button from '../../Button/Button';
import './SolidSulphuProductionApproval.scss';
import { updateSolidSulphurProduct } from '../../../api/solid-sulphur-production';

const SolidSulphuProductionApproval = ({ quantity, day }) => {
  const [editMode, setEditMode] = useState(false);
  const [productionQuantity, setProductionQuantity] = useState(quantity);

  useEffect(() => {
    setProductionQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (event) => {
    setProductionQuantity(parseInt(event.target.value, 10));
  };

  const handleEdit = async () => {
    try {
      await updateSolidSulphurProduct({ day, quantity: productionQuantity });
    } catch (error) {
      console.log('there is an error', error);
    }
    setEditMode(false);
  };

  return (
    <div className='solidSulphuProductionApproval'>
      <div className='solidSulphuProduction_wrapper'>
        <div className='solidSulphuProduction_quantity'>
          <span>الكمية</span>
          <span>{productionQuantity}</span>
          <span
            className='solidSulphuProduction_edit'
            onClick={() => setEditMode(!editMode)}
          >
            ✏️
          </span>
        </div>
      </div>
      {editMode && (
        <div className='edit_input'>
          <div className='quantity_input'>
            <label htmlFor='quantity'>الكمية</label>
            <NumberInput
              id='quantity'
              name='quantity'
              value={productionQuantity}
              onChange={handleQuantityChange}
            />
          </div>

          <Button onClick={handleEdit}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default SolidSulphuProductionApproval;
