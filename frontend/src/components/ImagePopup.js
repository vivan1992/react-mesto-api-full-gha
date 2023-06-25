import { useEffect } from "react";

function ImagePopup ({card, onClose}) {

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    if (card._id) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [card._id]);

  const handleCloseByOverlay = (e) => {
    if (e.target.classList.contains('popup_img')) {
      onClose();
    }
  }

  return (
    <section
      className={`popup popup_img ${card._id ? 'popup_opened' : ''}`}
      onClick={handleCloseByOverlay}>
      <div className="popup__wrapper">
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
          aria-label="Закрыть"></button>
        <img src={card.link} alt={card.name} className="popup__img"/>
        <p className="popup__descr">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;

