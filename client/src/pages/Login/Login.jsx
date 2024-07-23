import { useState } from 'react';
import { Button, Input } from '../../components';
import './Login.scss';
import { login } from '../../api/auth';

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);
    const loginRes = await login(userData);
    console.log(loginRes);
    setUserData({
      username: '',
      password: '',
    });
  };
  return (
    <div className='Login_container'>
      <div className='Login_form_wrapper'>
        <h3>الدخول إلى النظام</h3>
        <form onSubmit={handleSubmit}>
          <div className='Login_form'>
            <Input
              label='اسم المستخدم'
              type='text'
              id='username'
              name='username'
              value={userData.username}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <Input
              label='كلمة المرور'
              type='password'
              id='password'
              name='password'
              value={userData.password}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Button type='submit'>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
