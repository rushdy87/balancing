import NumberInput from '../NumberInput/NumberInput';
import './CrudeOil.scss';

const CrudeOil = ({ setCrudeOil }) => {
  const handleChange = (event) => {
    setCrudeOil((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className='CrudeOil_container'>
      <div className='CrudeOil_inputFiled'>
        <label htmlFor='reservoir_m3'>
          النفط الخام القابل{' '}
          <span>
            (م<sup>3</sup>)
          </span>
        </label>
        <NumberInput
          type='number'
          name='reservoir_m3'
          id='reservoir_m3'
          onChange={handleChange}
        />
      </div>
      <div className='CrudeOil_inputFiled'>
        <label htmlFor='reservoir_bbl'>
          النفط الخام القابل <span>(برميل)</span>
        </label>
        <NumberInput
          type='number'
          name='reservoir_bbl'
          id='reservoir_bbl'
          onChange={handleChange}
        />
      </div>
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
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CrudeOil;
