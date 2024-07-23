import { useState } from 'react';
import { Button, Input } from '../../components';
import './Login.scss';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginData);
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
              value={loginData.username}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <Input
              label='كلمة المرور'
              type='password'
              id='password'
              name='password'
              value={loginData.password}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
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
