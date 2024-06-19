import NumberInput from '../NumberInput/NumberInput';
import './Transport.scss';

const Transport = ({ setTransport }) => {
  const handleChange = (event) => {
    setTransport((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className='Transport_container'>
      <div className='Transport_inputFiled'>
        <label htmlFor='quantity'>
          الكمية <span>(طن)</span>
        </label>
        <NumberInput
          type='number'
          name='quantity'
          id='quantity'
          onChange={handleChange}
        />
      </div>
      <div className='Transport_inputFiled'>
        <label htmlFor='tankers'>عدد الصهاريج</label>
        <NumberInput
          type='number'
          name='tankers'
          id='tankers'
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Transport;
