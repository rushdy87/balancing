import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authCntext';
import './Admin.scss';
import { Button, Modal, UnitApproval } from '../../components';

const Admin = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [superUserUnit, setSuperUserUnit] = useState('');
  const [day, setDay] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );

  const { role, unit } = useContext(AuthContext);

  const changeDate = (newDate) => {
    setDay(
      `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    );
  };

  const renderUnit = (unit) => {
    setSuperUserUnit(unit);
    setShowPreview(true);
  };

  const renderSidebar = () => (
    <div className='Admin_container_sidebar'>
      <Button onClick={() => renderUnit('u52')}>Unit 52</Button>
      <Button onClick={() => renderUnit('u53')}>Unit 53</Button>
      <Button onClick={() => renderUnit('u54')}>Unit 54</Button>
      <Button onClick={() => renderUnit('u90')}>Unit 90</Button>
    </div>
  );

  if (role === '0') {
    return (
      <div className='Admin_container'>
        {renderSidebar()}
        {showPreview && (
          <Modal
            renderedContent={
              <UnitApproval
                unit={superUserUnit}
                day={day}
                changeDate={changeDate}
              />
            }
            close={() => setShowPreview(false)}
          />
        )}
      </div>
    );
  }

  return <UnitApproval unit={unit} day={day} changeDate={changeDate} />;
};

export default Admin;
