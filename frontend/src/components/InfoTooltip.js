import {useEffect} from 'react';

const InfoTooltip = ({onClose, isOpen, src, alt, title}) => {
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
    if (e.target.classList.contains(`popup_tooltip`)) {
      onClose()
    }
  }

  return (
    <section
      className={`popup popup_tooltip ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleCloseByOverlay}>

      <div className="popup__container popup__container_tooltip">
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
          aria-label="Закрыть"/>
        <img className='popup__img-status' src={src} alt={alt}/>
        <p className="popup__title popup__title_center">
          {title}
        </p>
      </div>
    </section>
  )
}

export default InfoTooltip;
