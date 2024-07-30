import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginRes = await login(userData);
      const { error, userId, token, role, unit } = loginRes;

      if (error) {
        setError(error);
      } else {
        loginHook(userId, token, role, unit);

        navigate('/');

        setUserData({ username: '', password: '' });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
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
