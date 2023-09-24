import React from 'react';
import UtilsContext from '../contexts/UtilsContext';

function InfoTooltip(props) {

  const { closeAllPopups } = React.useContext(UtilsContext);

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_info">
        <div className={`popup__logo popup__logo_type_${props.isSuccess ? 'success' : 'failure'}`}></div>
        <p className="popup__info-caption">{props.caption}</p>
        <button className="popup__close-btn popup__close-btn_type_info" type="button" onClick={closeAllPopups}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;