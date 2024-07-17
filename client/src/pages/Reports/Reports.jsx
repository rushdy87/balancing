import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import { Button, Datepicker, ReportView } from '../../components';
import './Reports.scss';

const Reports = () => {
  const [day, setDay] = useState('');

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `الموقف اليومي${day}`,
    onBeforePrint: () => console.log('onBeforePrint'),
    onAfterPrint: () => console.log('onAfterPrint'),
    removeAfterPrint: true,
  });

  const changeDate = (newDate) => {
    setDay(
      `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    );
  };

  return (
    <div className='Reports_container'>
      <Datepicker date={day} changeDate={changeDate} />

      <ReportView day={day} contentToPrint={contentToPrint} />

      <Button
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}
      >
        طباعة
      </Button>
    </div>
  );
};

export default Reports;
