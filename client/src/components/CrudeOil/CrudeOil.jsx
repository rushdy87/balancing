import NumberInput from '../NumberInput/NumberInput';
import './CrudeOil.scss';

const CrudeOil = ({ crudeOil, setCrudeOil }) => {
  const handleChange = (event) => {
    setCrudeOil((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className='CrudeOil_container'>
      <div className='CrudeOil_inputFiled'>
        <label htmlFor='receiving'>
          النفط الخام المستلم{' '}
          <span>
            (م<sup>3</sup>)
          </span>
        </label>
        <NumberInput
          type='number'
          name='receiving'
          id='receiving'
          value={crudeOil.receiving}
          onChange={handleChange}
        />
      </div>
      <div className='CrudeOil_inputFiled'>
        <label htmlFor='sending'>
          النفط الخام المرسل{' '}
          <span>
            (م<sup>3</sup>)
          </span>
        </label>
        <NumberInput
          type='number'
          name='sending'
          id='sending'
          value={crudeOil.sending}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CrudeOil;
