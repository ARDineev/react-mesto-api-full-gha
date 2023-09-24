import React from 'react';
import UtilsContext from '../contexts/UtilsContext';

function PopupWithForm(props) {
  
  const { closeAllPopups } = React.useContext(UtilsContext);
  
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'} popup_type_${props.name}`}>
      <div className={`popup__container popup__container_type_${props.container}`}>
        <h2 className="popup__caption">{props.title}</h2>
        <form className="popup__form" name={`${props.name}`} onSubmit={props.onSubmit}>
          {props.children}
          <button className={`popup__submit-btn popup__submit-btn_type_${props.name}`} type="submit">{props.btnCaption}</button>
        </form>
        <button className={`popup__close-btn popup__close-btn_type_${props.name}`} type="button" onClick={closeAllPopups}/>
      </div>
    </div>
  );
}

export default PopupWithForm;