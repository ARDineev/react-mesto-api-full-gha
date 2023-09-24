import React from 'react';
import PopupWithForm from './PopupWithForm';
import UtilsContext from '../contexts/UtilsContext';

function ConfirmPopup(props) {

  const { isLoading } = React.useContext(UtilsContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleCardDelete()
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      container="confirm"
      btnCaption={isLoading? 'Удаление...' : 'Да'}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}/>
  )
}

export default ConfirmPopup;