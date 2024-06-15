import { createPortal } from 'react-dom';

import './ModalOverlay.scss';

const ModalOverlay = ({ renderedContent, save, close }) => {
  const content = (
    <div className={'ModalOverlay-container'}>
      <div className='ModalOverlay-header'></div>
      <div className='ModalOverlay-body'>{renderedContent}</div>
      <div className='ModalOverlay-footer'>
        <button onClick={close}>رجوع</button>
        <button onClick={save}>حفظ</button>
      </div>
    </div>
  );

  return createPortal(content, document.getElementById('modal-hook'));
};

export default ModalOverlay;
