import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup ({isOpen, onClose, isLoaded, onDeletePlace}) {

  function handleSubmit(e) {
    e.preventDefault();

    onDeletePlace();
  }

  return (
    <PopupWithForm
      name='delete'
      title='Вы уверены?'
      buttonText={isLoaded ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonEnabled={true}
      />
  )
}

export default DeletePlacePopup;
