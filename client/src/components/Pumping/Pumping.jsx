import NumberInput from '../NumberInput/NumberInput';
import './Pumping.scss';

const ArSubjects = {
  pgPumping: 'البنزين السوبر',
  rgPumping: 'البنزين المحسن',
  dieselPumping: 'النفط الأبيض',
  kerosenePumping: 'زيت الغاز',
};

const Pumping = ({ pumpingQuantities, setPumpingQuantities }) => {
  const handleChange = (item, to, value) => {
    setPumpingQuantities((prev) => ({
      ...prev,
      [item]: { ...prev[item], [to]: value },
    }));
  };

  return (
    <div className='Pumping-container'>
      {Object.keys(pumpingQuantities).map((item) => {
        return (
          <div className='Pumping-row' key={`${item}_pumping`}>
            <span className='Pumping-item'>{ArSubjects[item]}</span>
            <div className='Pumping_inputFiled'>
              <label htmlFor='toKarbala'>كربلاء</label>
              <NumberInput
                type='number'
                name='toKarbala'
                id='toKarbala'
                onChange={(e) =>
                  handleChange(item, 'toKarbala', e.target.value)
                }
              />
            </div>
            <div className='Pumping_inputFiled'>
              <label htmlFor='toNajaf'>النجف</label>
              <NumberInput
                type='number'
                name='toNajaf'
                id='toNajaf'
                onChange={(e) => handleChange(item, 'toNajaf', e.target.value)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pumping;
