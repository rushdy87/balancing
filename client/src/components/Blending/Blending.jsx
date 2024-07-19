import NumberInput from '../NumberInput/NumberInput';
import './Blending.scss';

const products = [
  { id: 1, column: 'lpg', name: 'الغاز السائل' },
  { id: 2, column: 'pg', name: 'البنزين السوبر' },
  { id: 3, column: 'rg', name: 'البنزين المحسن' },
  { id: 4, column: 'diesel', name: 'زيت الغاز' },
  { id: 5, column: 'hfo', name: 'زيت الوقود الثقيل' },
];

const Blending = ({ setBlendingQuantities }) => {
  const handleChange = (event) => {
    setBlendingQuantities((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className='Blending_container'>
      {products.map((prod) => {
        return (
          <div className='Blending_inputFiled' key={`${prod.id}${prod.column}`}>
            <label htmlFor={prod.column}>
              {prod.name} (m<sup>3</sup>)
            </label>
            <NumberInput
              type='number'
              name={prod.column}
              id={prod.column}
              onChange={handleChange}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Blending;
