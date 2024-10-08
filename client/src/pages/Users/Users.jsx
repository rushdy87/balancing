import { useEffect, useState } from 'react';
import { deleteUser, fetchUsers } from '../../api/admin';
import { Button, Modal } from '../../components';
import './Users.scss';
import AddUser from '../../components/AddUser/AddUser';

const rolos = { 0: 'ROOT', 1: 'MANAGER' };

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const getUsers = async () => {
    try {
      const res = await fetchUsers();
      return res;
    } catch (error) {
      console.log(`There was an error. ${error}`);
    }
  };
  useEffect(() => {
    (async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    })();
  }, []);

  const deletHandler = async (id) => {
    try {
      await deleteUser(id);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.log(`There was an error. ${error}`);
    }
  };

  const handleClose = async () => {
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
    setShowPreview(false);
  };

  const renderUsers =
    users.length > 0
      ? users.map((user, i) => {
          return (
            <div
              className={`show_user_row ${(i + 1) % 2 === 0 ? 'even_row' : ''}`}
              key={user.id}
            >
              <span className='user_column column1'>{user.name}</span>
              <span className='user_column column2'>{user.username}</span>
              <span className='user_column column3'>{rolos[user.role]}</span>
              <span className='user_column column4'>{user.unit || '-'}</span>
              <span className='user_column column5'>{user.group || '-'}</span>
              <span
                className='user_column column6'
                onClick={() => deletHandler(user.id)}
              >
                🅧
              </span>
              <span className='user_column column7'>✏️</span>
            </div>
          );
        })
      : '';

  return (
    <div className='Users_container'>
      <div className='Users_add_user'>
        <Button
          type='button'
          className='primary'
          onClick={() => setShowPreview(true)}
        >
          اضافة مستخدم جديد
        </Button>
      </div>
      <div className='Users_show_users'>
        {users.length > 0 && (
          <div className='show_user_rapper'>
            <div className='show_user_header'>
              <span className='user_header column1'>الاسم</span>
              <span className='user_header column2'>رمز المستخدم</span>
              <span className='user_header column3'>الصلاحية</span>
              <span className='user_header column4'>الوحدة</span>
              <span className='user_header column5'>الوجبة</span>
              <span className='user_header column6'>حذف</span>
              <span className='user_header column7'>تعديل</span>
            </div>
            {renderUsers}
          </div>
        )}
      </div>

      {/* Modal */}
      {showPreview && (
        <Modal renderedContent={<AddUser />} close={handleClose} />
      )}
    </div>
  );
};

export default Users;
