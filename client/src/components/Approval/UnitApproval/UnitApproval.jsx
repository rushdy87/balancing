import Datepicker from '../../Datepicker/Datepicker';
import Unit52Approval from '../Unit52Approval/Unit52Approval';
import Unit53Approval from '../Unit53Approval/Unit53Approval';
import Unit90Approval from '../Unit90Approval/Unit90Approval';

const UnitApproval = ({ unit, day, changeDate }) => {
  const renderUnitComponent = (unit) => {
    switch (unit) {
      case 'u52':
        return <Unit52Approval day={day} />;
      case 'u53':
        return <Unit53Approval day={day} />;
      case 'u90':
        return <Unit90Approval day={day} />;
      default:
        return <h1>There is an error occurs</h1>;
    }
  };

  return (
    <div className='Admin_container'>
      <Datepicker date={day} changeDate={changeDate} />
      <div className='hr' />
      {renderUnitComponent(unit)}
    </div>
  );
};

export default UnitApproval;
