import Backdrop from './Backdrop/Backdrop';
import ModalOverlay from './ModalOverlay/ModalOverlay';

import './Modal.scss';

const Modal = ({ renderedContent, save, close }) => {
  return (
    <>
      {true && <Backdrop onClick={close} />}
      <ModalOverlay
        renderedContent={renderedContent}
        save={save}
        close={close}
      />
    </>
  );
};

export default Modal;
