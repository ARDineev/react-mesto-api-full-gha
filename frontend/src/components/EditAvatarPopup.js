import React from 'react';
import PopupWithForm from './PopupWithForm';
import UtilsContext from '../contexts/UtilsContext';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();
  const { isLoading } = React.useContext(UtilsContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      container="update-avatar"
      btnCaption={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}>

      <input
        className="popup__input popup__input_field_avatar-url"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватарку"
        id="avatar-url-input"
        required
        ref={avatarRef}
      />
      <span className="popup__error avatar-url-input-error"></span>

    </PopupWithForm>
  )
}

export default EditAvatarPopup;