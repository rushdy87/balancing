import NumberInput from '../NumberInput/NumberInput';
import './Transport.scss';

const ArSubjects = {
  solidSulphur: 'الكبريت الصلب',
  PavingAsphalt: 'اسفلت الرصف',
  lpg: 'الغاز السائل',
  pg: 'بنزين سوبر',
  rg: 'بنزين محسن',
  atk: 'وقود الطائرات',
  1: 'المعامل الحكومية',
  2: 'المعامل الأهلية',
  3: 'التصدير',
};

const Transport = ({ item, transport, setTransport }) => {
  const handleChange = (event) => {
    setTransport((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className='Transport_container'>
      <h4 className='Transport_item'>{ArSubjects[item]}</h4>
      <div className='Transport_inputFiled'>
        <label htmlFor='quantity'>
          الكمية{' '}
          {item === 'solidSulphur' ||
          item === 'PavingAsphalt' ||
          item === 'lpg' ? (
            <span>(طن)</span>
          ) : item === '1' || item === '2' || item === '3' ? (
            <span>(لتر)</span>
          ) : (
            <span>
              (م<sup>3</sup>)
            </span>
          )}
        </label>
        <NumberInput
          type='number'
          name='quantity'
          id='quantity'
          value={transport.quantity}
          onChange={handleChange}
        />
      </div>
      <div className='Transport_inputFiled'>
        <label htmlFor='tankers'>عدد الصهاريج</label>
        <NumberInput
          type='number'
          name='tankers'
          id='tankers'
          value={transport.tankers}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Transport;
