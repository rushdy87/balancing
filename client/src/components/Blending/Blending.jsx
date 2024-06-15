import './Blending.scss';

const Blending = ({ products, setBlendingQuantities, setIsFormValid }) => {
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
            <input
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
