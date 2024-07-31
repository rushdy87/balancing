import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authCntext';
import './Admin.scss';
import { Approval, Datepicker } from '../../components';

const Admin = () => {
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

  const { role, unit } = useContext(AuthContext);

  if (role === '0') {
    return <h1>Super User</h1>;
  }

  return (
    <div className='Admin_container'>
      <Datepicker date={day} changeDate={changeDate} />
      <div className='hr' />
      <Approval unit={unit} day={day} />
    </div>
  );
};

export default Admin;
