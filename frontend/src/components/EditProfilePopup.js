import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import UtilsContext from '../contexts/UtilsContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const { isLoading } = React.useContext(UtilsContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      container="form"
      btnCaption={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_field_name"
        type="text"
        name="name"
        id="name-input"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error name-input-error"></span>
      <input
        className="popup__input popup__input_field_description"
        type="text"
        name="description"
        id="description-input"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error description-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;