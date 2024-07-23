import { useState, useContext } from 'react';
import { Button, Input } from '../../components';
import './Login.scss';
import { login } from '../../api/auth';
import { AuthContext } from '../../context';

const Login = () => {
  const { login: loginHook } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginRes = await login(userData);
    if (loginRes.error !== '') {
      setError(loginRes.error);
    } else {
      loginHook(loginRes.userId, loginRes.token, loginRes.role);
      setUserData({
        username: '',
        password: '',
      });
    }
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
              onChange={handleChange}
            />
            <Input
              label='كلمة المرور'
              type='password'
              id='password'
              name='password'
              value={userData.password}
              onChange={handleChange}
            />
            <span>{error && error}</span>
            <Button type='submit'>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
