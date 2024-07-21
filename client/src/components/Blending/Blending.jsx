import NumberInput from '../NumberInput/NumberInput';
import './Blending.scss';

const products = {
  lpg: 'الغاز السائل',
  pg: 'البنزين السوبر',
  rg: 'البنزين المحسن',
  diesel: 'زيت الغاز',
  hfo: 'زيت الوقود الثقيل',
};

const Blending = ({ blendingQuantities, setBlendingQuantities }) => {
  const handleChange = (event) => {
    setBlendingQuantities((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className='Blending_container'>
      {Object.keys(blendingQuantities).map((prod) => {
        return (
          <div className='Blending_inputFiled' key={prod}>
            <label htmlFor={prod}>
              {products[prod]} (m<sup>3</sup>)
            </label>
            <NumberInput
              type='number'
              name={prod}
              id={prod}
              value={blendingQuantities[prod]}
              onChange={handleChange}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Blending;
