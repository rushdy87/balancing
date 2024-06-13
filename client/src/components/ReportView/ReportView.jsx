import { useEffect, useState, useRef } from 'react';
import './ReportView.scss';
import { getReportDataByDay } from '../../utils/api';

const ReportView = ({ day, contentToPrint }) => {
  const [reportData, setReportData] = useState([]);
  const isFirstRender = useRef(true); // Ref to track the initial render

  useEffect(() => {
    if (isFirstRender.current) {
      // Skip the effect on the initial render
      isFirstRender.current = false;
      return;
    }

    // Fetch data when the day prop changes
    const fetchData = async () => {
      const tanksReport = await getReportDataByDay(day);
      setReportData([...tanksReport]);
    };

    fetchData();
  }, [day]); // Dependency array only includes `day`

  const renderData = reportData.map(({ product, pumpable, working_volume }) => (
    <div className='reportData_item' key={product}>
      <h3 className='reportData_item_name'>{product}</h3>
      <div className='reportData_item_values'>
        <div className='reportData_item_column'>
          <span className='volume_name'>
            التشغيلي (م<sup>3</sup>)
          </span>
          <span className='volume_value'>{working_volume}</span>
        </div>
        <div className='reportData_item_column'>
          <span className='volume_name'>
            القابل (م<sup>3</sup>)
          </span>
          <span className='volume_value'>{pumpable}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='ReportView_container' ref={contentToPrint}>
      <div className='ReportView_tanks_balance'>{renderData}</div>
    </div>
  );
};

export default ReportView;
