import { useState } from 'react';
import './Reports.scss';
import { getReportByDate } from '../api/report';

const Reports = () => {
  const [report, setReport] = useState(null);
  const fetchReport = async () => {
    const data = await getReportByDate('1-6-2024');
    setReport(data);
  };
  return (
    <div>
      <button onClick={fetchReport}>Fetch Data</button>
      {report && <div>{report.notes[0].note}</div>}
    </div>
  );
};

export default Reports;
