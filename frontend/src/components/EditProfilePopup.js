import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import { useValidator } from "../hooks/useValidator";


function EditProfilePopup({isOpen, onClose, isLoaded, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const validName = useValidator(true);
  const validAbout = useValidator(true);

  const isButtonEnabled = validName.validity && validAbout.validity;

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    validName.resetValidation();
    validAbout.resetValidation();
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    validName.updateValidity(e);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    validAbout.updateValidity(e);
  }

  function handleClose() {
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText={isLoaded ? 'Сохраненние...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isButtonEnabled={isButtonEnabled}
    >

      <label className="form__field">
        <input
          value={name ?? ''}
          onChange={handleChangeName}
          id="name-input"
          name="name"
          type="text"
          className="form__input form__input_name_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"/>
        <span className="form__input-error name-input-error" >
          {validName.textError}
        </span>
      </label>
      <label className="form__field">
        <input
          value={description ?? ''}
          onChange={handleChangeDescription}
          id="career-input"
          name="about"
          type="text"
          className="form__input form__input_name_career"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"/>
        <span className="form__input-error career-input-error" >
          {validAbout.textError}
        </span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
