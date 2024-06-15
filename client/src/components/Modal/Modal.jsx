import Backdrop from './Backdrop/Backdrop';
import ModalOverlay from './ModalOverlay/ModalOverlay';

import './Modal.scss';

const Modal = (props) => {
  return (
    <>
      {true && <Backdrop onClick={() => console.log('Close')} />}
      <ModalOverlay
        renderedContent='abcsdslkmdmwelqkmdqw;lemdekl;q'
        save={() => console.log('Save')}
        close={() => console.log('Close')}
      />
    </>
  );
};

export default Modal;
