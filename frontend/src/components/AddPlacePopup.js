import React from 'react';
import PopupWithForm from './PopupWithForm';
import UtilsContext from '../contexts/UtilsContext';

function AddPlacePopup(props) {
  const placeRef = React.useRef();
  const linkRef = React.useRef();
  const { isLoading } = React.useContext(UtilsContext);

  function handleSubmit(evt) {
    evt.preventDefault();
  
    props.onAddPlace({
      name: placeRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      container="form"
      btnCaption={isLoading? 'Сохранение...' : 'Создать'}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}>
        <input
          className="popup__input popup__input_field_place"
          type="text"
          name="place"
          placeholder="Название"
          id="place-input"
          required minLength="2"
          maxLength="30"
          ref={placeRef}
        />
        <span className="popup__error place-input-error"></span>
        <input
          className="popup__input popup__input_field_img-url"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          id="img-url-input"
          required
          ref={linkRef}
        />
        <span className="popup__error img-url-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;