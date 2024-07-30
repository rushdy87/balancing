import { useContext } from 'react';
import { AuthContext } from '../../context/authCntext';
import './Admin.scss';
import { Approval } from '../../components';

const Admin = () => {
  const { role, unit } = useContext(AuthContext);

  if (role === 0) {
    return <h1>Super User</h1>;
  }

  return (
    <div className='Admin_container'>
      <Approval unit={unit} />
    </div>
  );
};

export default Admin;
