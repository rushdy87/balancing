import { createPortal } from 'react-dom';

import './Backdrop.scss';

const Backdrop = ({ onClick }) => {
  return createPortal(
    <div className='backdrop' onClick={onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
