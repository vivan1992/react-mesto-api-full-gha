import { useEffect } from "react";

function PopupWithForm ({onClose, isOpen, name, title, children, isButtonEnabled, buttonText, onSubmit}) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen]);

  const handleCloseByOverlay = (e) => {
    if (e.target.classList.contains(`popup_${name}`)) {
      onClose()
    }
  }

  return (
    <section
      className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleCloseByOverlay}>

      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
          aria-label="Закрыть"></button>
        <h3 className="popup__title">{title}</h3>
        <form name={`${name}-form`} className={`form form_name_${name}`} noValidate onSubmit={onSubmit}>
          {children}
          <button type="submit" className="form__button" disabled={!isButtonEnabled} >{buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
