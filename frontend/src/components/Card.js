import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import notFoundImg from '../images/not-found.jpg';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((user) => {
    return user === currentUser._id
  });
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onTrashClick(props.card);
  }

  return (
    <li className="elements__item">
      <article className="element">
        <img
          className="element__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = notFoundImg;
          }}
        />
        <div className="element__caption">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <p className="element__like-count">{props.card.likes.length}</p>
          </div>
        </div>
        {isOwn && <button className="element__delete" type="button" onClick={handleDeleteClick}></button>}
      </article>
    </li>
  )
}

export default Card;