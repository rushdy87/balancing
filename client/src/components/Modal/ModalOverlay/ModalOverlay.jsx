import { createPortal } from 'react-dom';

import './ModalOverlay.scss';
import Button from '../../Button/Button';

const ModalOverlay = ({ renderedContent, save, close }) => {
  const content = (
    <div className={'ModalOverlay-container'}>
      <div className='ModalOverlay-header'></div>
      <div className='ModalOverlay-body'>{renderedContent}</div>
      <div className='ModalOverlay-footer'>
        <Button onClick={close}>رجوع</Button>
        <Button onClick={save}>حفظ</Button>
      </div>
    </div>
  );

  return createPortal(content, document.getElementById('modal-hook'));
};

export default ModalOverlay;
