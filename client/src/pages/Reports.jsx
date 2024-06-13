import { useState } from 'react';

import { Datepicker, ReportView } from '../components';

const Reports = () => {
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
    <div>
      <Datepicker date={day} changeDate={changeDate} />
      <ReportView day={day} />
      <button>Create a PDF</button>
    </div>
  );
};

export default Reports;

/**
 * Daily:
 * DatePiker
    - View
 * Create PDF
 */
