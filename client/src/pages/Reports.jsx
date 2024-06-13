import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { Datepicker, ReportView } from '../components';

const Reports = () => {
  const [day, setDay] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  });

  const changeDate = (newDate) => {
    setDay(
      `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    );
  };

  return (
    <div>
      <Datepicker date={day} changeDate={changeDate} />

      <ReportView day={day} contentToPrint={contentToPrint} />

      <button
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}
      >
        Create PDF
      </button>
    </div>
  );
};

export default Reports;
