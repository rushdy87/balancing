import NumberInput from '../NumberInput/NumberInput';

import './NaturalGas.scss';

const NaturalGas = ({ naturalGas, setNaturalGas }) => {
  const handleChange = (event) => {
    setNaturalGas((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className='NaturalGas_container'>
      <div className='NaturalGas_inputFiled'>
        <label htmlFor='receiving_m3'>
          الغاز المستلم الطبيعي{' '}
          <span>
            (م<sup>3</sup>)
          </span>
        </label>
        <NumberInput
          type='number'
          name='receiving_m3'
          id='receiving_m3'
          value={naturalGas.receiving_m3}
          onChange={handleChange}
        />
      </div>
      <div className='NaturalGas_inputFiled'>
        <label htmlFor='receiving_mn3'>
          الغاز المستلم الطبيعي <span>(mn3)</span>
        </label>
        <NumberInput
          type='number'
          name='receiving_mn3'
          id='receiving_mn3'
          value={naturalGas.receiving_mn3}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default NaturalGas;
