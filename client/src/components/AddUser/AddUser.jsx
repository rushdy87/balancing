import { useState } from 'react';
import './AddUser.scss';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Button from '../Button/Button';
import { addUser } from '../../api/admin';

const removeEmptyStringValues = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== ''));

const initialUserState = {
  name: '',
  username: '',
  password: '',
  role: '',
  unit: '',
  group: '',
};

const AddUser = () => {
  const [user, setUser] = useState(initialUserState);
  const [warning, setWarning] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
    setWarning(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sendingUser = removeEmptyStringValues(user);

    if (
      sendingUser.username &&
      sendingUser.password &&
      sendingUser.name &&
      sendingUser.role
    ) {
      if (sendingUser.role !== '0' && !sendingUser.unit) {
        setWarning(true);
      } else {
        try {
          await addUser(sendingUser);
          setUser(initialUserState);
        } catch (error) {
          console.error(`There was an error: ${error}`);
        }
      }
    } else {
      setWarning(true);
    }
  };

  return (
    <div className='addUser_container'>
      <h2>اضافة مستخدم جديد</h2>
      <form className='addUser_form' onSubmit={handleSubmit}>
        <div className='name_and_username'>
          <div className='addUser_input'>
            <Input
              label='الاسم'
              type='text'
              id='name'
              name='name'
              value={user.name}
              onChange={handleChange}
            />
            {warning && !user.name && (
              <span className='warning_msg'>يرجى ادخال الاسم</span>
            )}
          </div>
          <div className='addUser_input'>
            <Input
              label='اسم المستخدم'
              type='text'
              id='username'
              name='username'
              value={user.username}
              onChange={handleChange}
            />
            {warning && !user.username && (
              <span className='warning_msg'>يرجى ادخال اسم المستخدم</span>
            )}
          </div>
        </div>
        <div className='password_and_role'>
          <div className='addUser_input'>
            <Input
              label='كلمة المرور'
              type='password'
              id='password'
              name='password'
              value={user.password}
              onChange={handleChange}
            />
            {warning && !user.password && (
              <span className='warning_msg'>يرجى ادخال كلمة المرور</span>
            )}
          </div>
          <div className='addUser_input'>
            <Select
              label='الصلاحية'
              id='role'
              name='role'
              options={[
                { value: '', label: 'اختر' },
                { value: '0', label: 'ROOT' },
                { value: '1', label: 'MANAGER' },
              ]}
              value={user.role}
              onChange={handleChange}
            />
            {warning && !user.role && (
              <span className='warning_msg'>يرجى اختيار الصلاحية</span>
            )}
          </div>
        </div>
        <div className='unit_and_group'>
          <div className='addUser_input'>
            <Select
              label='الوحدة'
              id='unit'
              name='unit'
              options={[
                { value: '', label: 'غير محدد' },
                { value: 'u52', label: 'الخزانات' },
                { value: 'u53', label: 'الأسفلت' },
                { value: 'u54', label: 'الكبريت' },
                { value: 'u90', label: 'المستودع' },
              ]}
              value={user.unit}
              onChange={handleChange}
            />
            {warning && !user.unit && user.role !== '0' && (
              <span className='warning_msg'>يرجى اختيار الوحدة</span>
            )}
          </div>
          <Select
            label='الوجبة'
            id='group'
            name='group'
            options={[
              { value: '', label: 'غير محدد' },
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
              { value: 'D', label: 'D' },
            ]}
            value={user.group}
            onChange={handleChange}
          />
        </div>
        <div className='addUser_btn'>
          <Button type='submit'>حفظ</Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
