import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authCntext';
import './Admin.scss';
import {
  Unit52Approval,
  Datepicker,
  Unit90Approval,
  Unit53Approval,
} from '../../components';

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

  switch (unit) {
    case 'u52':
      return (
        <div className='Admin_container'>
          <Datepicker date={day} changeDate={changeDate} />
          <div className='hr' />
          <Unit52Approval day={day} />
        </div>
      );
    case 'u53':
      return (
        <div className='Admin_container'>
          <Datepicker date={day} changeDate={changeDate} />
          <div className='hr' />
          <Unit53Approval day={day} />
        </div>
      );
    case 'u90':
      return (
        <div className='Admin_container'>
          <Datepicker date={day} changeDate={changeDate} />
          <div className='hr' />
          <Unit90Approval day={day} />
        </div>
      );

    default:
      return <h1>There is an error ocors</h1>;
  }
};

export default Admin;
