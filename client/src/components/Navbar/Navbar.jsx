import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
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
          <li>
            <Link to='/'>الرئيسية</Link>
          </li>
          <li>
            <Link to='/u52'>الوحدة 52</Link>
          </li>
          <li>
            <Link to='/u53'>الوحدة 53</Link>
          </li>
          <li>
            <Link to='/u54'>الوحدة 54</Link>
          </li>
          <li>
            <Link to='/u90'>الوحدة 90</Link>
          </li>
          <li>
            <Link to='/reports'>التقارير</Link>
          </li>
          <li>
            <Link to='/users'>المستخدمين</Link>
          </li>
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
