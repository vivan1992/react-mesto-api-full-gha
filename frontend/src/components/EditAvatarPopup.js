import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import { useValidator } from '../hooks/useValidator';

function EditAvatarPopup({isOpen, onClose, isLoaded, onUpdateAvatar}) {

  const avatarRef = useRef();

  const validAvatar = useValidator();

  useEffect(() => {
    avatarRef.current.value = '';
    validAvatar.resetValidation();
  }, [isOpen]);

  function handleChange(e) {
    validAvatar.updateValidity(e);
  }

  function handleClose() {
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText={isLoaded ? 'Сохраненние...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isButtonEnabled={validAvatar.validity}
      >

      <label className="form__field">
        <input
          ref={avatarRef}
          id="avatar-input"
          name="avatar"
          type="url"
          className="form__input form__input_name_avatar"
          placeholder="Ссылка на аватар"
          required
          onChange={handleChange}/>
        <span className="form__input-error avatar-input-error" >
          {validAvatar.textError}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
