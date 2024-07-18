import { useState } from 'react';
import { Datepicker } from '../../components';
import './Unit52.scss';

const Unit52 = () => {
  const [day, setDay] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  const changeDate = (newDate) => {
    setDay(
      `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    );
  };

  return (
    <div className='u52-container'>
      <div className='u52_header'>
        <h1>Unit 52</h1>
        <Datepicker date={day} changeDate={changeDate} />
      </div>
      <div className='hr' />
    </div>
  );
};

export default Unit52;
