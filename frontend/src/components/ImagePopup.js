import React from 'react';
import UtilsContext from '../contexts/UtilsContext';

function ImagePopup(props) {

  const { closeAllPopups } = React.useContext(UtilsContext);

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'} popup_type_picture`}>
      <div className="popup__container popup__container_type_picture">
        <img className="popup__image" alt={props.card.name} src={props.card.link}/>
        <p className="popup__image-caption">{props.card.name}</p>
        <button className="popup__close-btn popup__close-btn_type_picture" type="button" onClick={closeAllPopups}></button>
      </div>
    </div>
  )
}

export default ImagePopup;