import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import UtilsContext from '../contexts/UtilsContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import ProtectedRouteElement from './ProtectedRoute';
import { usePopupClose } from '../hooks/usePopupClose';

function App() {
  const [isRegSuccessPopupOpen, setIsRegSuccessPopupOpen] = React.useState(false);
  const [isFailurePopupOpen, setIsFailurePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardForDel, setCardForDel] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const popupIsOpen = isRegSuccessPopupOpen ||
    isFailurePopupOpen ||
    isEditProfilePopupOpen ||
    isEditAvatarPopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmPopupOpen ||
    selectedCard.link;

  usePopupClose(popupIsOpen, closeAllPopups);

  React.useEffect(() => {
    loggedIn && api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log('Ошибка при загрузке карточек', err);
      })
  }, [loggedIn])

  React.useEffect(() => {
    loggedIn && api.getUserInformation()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log('Ошибка при получении данных о пользователе', err);
      })
  }, [loggedIn])

  React.useEffect(() => {
    logInByToken();
  }, [])

  function logInByToken() {
    const token = localStorage.getItem('token');
    
    if (token) {
      auth.getUserInfo(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
            navigate("/", { replace: true })
          }
        })
        .catch(err => console.log(err))
    }
  }


  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  function handleRegSuccess() {
    setIsRegSuccessPopupOpen(true);
  }

  function handleFailure() {
    setIsFailurePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleTrashClick(card) {
    setCardForDel(card);
    setIsConfirmPopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsRegSuccessPopupOpen(false);
    setIsFailurePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(currentCard) {
    const isLiked = currentCard.likes.some(user => user === currentUser._id);
    const changeLikeCardStatus = isLiked ? api.dislikeCard : api.likeCard;

    changeLikeCardStatus.bind(api)(currentCard._id)
      .then((newCard) => {
        setCards((oldCardList) => {
          return oldCardList.map(card => card._id === currentCard._id ? newCard : card)
        });
      })
      .catch((err) => {
        console.log('Ошибка при попытке лайка/дизлайка', err);
      })
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteCard(cardForDel._id)
      .then(() => {
        setCards((oldCardList) => {
          return oldCardList.filter(card => card._id !== cardForDel._id);
        });
      })
      .then(() => {
        setCardForDel({});
        closeAllPopups()
      })
      .catch((err) => {
        console.log('Ошибка при удалении карточки', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api.setUserInformation({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Не удалось обновить данные пользователя', err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api.updateAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка обновления аватарки', err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api.createNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка добавления новой карточки', err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <UtilsContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header userEmail={userEmail} handleLogOut={handleLogOut} />
          <Routes>
            <Route path="/" element={<ProtectedRouteElement element={Main} isAllowed={loggedIn} redirectPath="/sign-in"
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              handleClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              onTrashClick={handleTrashClick}
            />}
            />
            <Route path="/sign-up" element={<ProtectedRouteElement element={Register} isAllowed={!loggedIn} redirectPath="/"
              onRegSuccess={handleRegSuccess}
              onRegFailure={handleFailure}
            />}
            />
            <Route path="/sign-in" element={<ProtectedRouteElement element={Login} isAllowed={!loggedIn} redirectPath="/"
              handleLogin={handleLogin}
              setUserEmail={setUserEmail}
              onLogInFailure={handleFailure}
            />}
            />
          </Routes>
          <Footer />
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} />

        <ConfirmPopup handleCardDelete={handleCardDelete} isOpen={isConfirmPopupOpen} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} isOpen={'_id' in selectedCard} />
        <InfoTooltip isOpen={isRegSuccessPopupOpen} caption="Вы успешно зарегистрировались!" isSuccess={true} />
        <InfoTooltip isOpen={isFailurePopupOpen} caption="Что-то пошло не так! Попробуйте ещё раз." isSuccess={false} />

      </CurrentUserContext.Provider>
    </UtilsContext.Provider>
  );
}

export default App;