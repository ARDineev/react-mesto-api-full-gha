import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import notFoundImg from '../images/not-found.jpg';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка."
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = notFoundImg;
            }}
          />
          <button className="profile__avatar-update-button" type="button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <ul className="elements">

        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.handleClick}
            onCardLike={props.onCardLike}
            onTrashClick={props.onTrashClick}
          />
        ))}

      </ul>
    </main>
  )
}

export default Main;