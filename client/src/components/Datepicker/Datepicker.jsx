import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import './Datepicker.scss';

const Datepicker = ({ date, changeDate }) => {
  return (
    <div className='Datepicker-container'>
      <label>التاريخ</label>
      <Flatpickr
        data-enable-time
        value={date}
        onChange={(selectedDates) => {
          changeDate(selectedDates[0]);
        }}
        options={{
          dateFormat: 'd-m-Y',
        }}
      />
    </div>
  );
};

export default Datepicker;
