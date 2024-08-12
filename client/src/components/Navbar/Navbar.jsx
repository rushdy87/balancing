import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';
import { useAuth } from '../../hooks';

const Navbar = () => {
  const { role, unit, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({ width: undefined, height: undefined });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => setMenuOpen((prev) => !prev);

  return (
    <div className='navbar-container'>
      <nav
        className={`navbar ${menuOpen ? 'isMenu' : ''}`}
        onClick={(e) => (menuOpen ? setMenuOpen(false) : null)}
      >
        <ul>
          {role && (
            <li>
              <span className='signout' onClick={logout}>
                الخروج
              </span>
              <Link to='/'>الرئيسية</Link>
            </li>
          )}
          {(role === '0' || unit === 'u52') && (
            <li>
              <Link to='/u52'>الوحدة 52</Link>
            </li>
          )}
          {(role === '0' || unit === 'u53') && (
            <li>
              <Link to='/u53'>الوحدة 53</Link>
            </li>
          )}
          {(role === '0' || unit === 'u54') && (
            <li>
              <Link to='/u54'>الوحدة 54</Link>
            </li>
          )}
          {(role === '0' || unit === 'u90') && (
            <li>
              <Link to='/u90'>الوحدة 90</Link>
            </li>
          )}
          {(role === '0' || role === '1') && (
            <li>
              <Link to='/admin'>التدقيق</Link>
            </li>
          )}
          {role === '0' && (
            <>
              <li>
                <Link to='/reports'>التقارير</Link>
              </li>
              {/* <li>
                <Link to='/tanks-info'>بيانات الخزانات</Link>
              </li> */}
              <li>
                <Link to='/users'>المستخدمين</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className='navbar_content-toggle'>
        {!menuOpen ? (
          <span onClick={menuToggleHandler}>O</span>
        ) : (
          <span onClick={menuToggleHandler}>X</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
