import { Component } from "react";
import { createPortal } from "react-dom"
import css from 'components/Modal/Modal.module.css';

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeModal)
  }

  closeModal = ({target, currentTarget, code}) => {
    if (target === currentTarget || code === "Escape") {
      this.props.onClose();
    }
  }

  render() {
    const { closeModal } = this;
    const { picturies } = this.props;
      return createPortal(
          
            <div className={css.overlay} onClick={closeModal}>
              <div  className={css.modal}> 
                 
            <img src={picturies.largeImageURL} key={picturies.id}  alt='picturies.largeImageURL' />
              </div>
          </div>,
          modalRoot, 
        
      );
  }
}



