import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate} from "react-router-dom";

import ProtectedRouteElement from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import api from '../utils/Api';
import apiAuth from '../utils/ApiAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ok from '../images/ok.svg';
import error from '../images/error.svg';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoadedRegister, setIsLoadedRegister] = useState(false);
  const [isLoadedLogin, setIsLoadedLogin] = useState(false);
  const [isLoadedUpdateUser, setIsLoadedUpdateUser] = useState(false);
  const [isLoadedUpdateAvatar, setIsLoadedUpdateAvatar] = useState(false);
  const [isLoadedAddPlace, setIsLoadedAddPlace] = useState(false);
  const [isLoadedDeletePlace, setIsLoadedDeletePlace] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = useState(true);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
          setCurrentUser(data);
          setCards(cards);
      })
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth.checkJWT(jwt)
        .then(res => {
          if (res){
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate("/", {replace: true})
          }
        })
        .catch(err => {
          setIsSuccessTooltipStatus(false);
          console.log(err);
        })
    };
  }, []);

  function handleOpenTooltip() {
    setIsTooltipPopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick (card) {
    setIsDeletePlacePopupOpen(true);
    setCardToDelete(card);
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(data) {
    setIsLoadedUpdateUser(true);
    api.setUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() => setIsLoadedUpdateUser(false))
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(data) {
    setIsLoadedUpdateAvatar(true);
    api.updateUserAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() => setIsLoadedUpdateAvatar(false))
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoadedAddPlace(true);
    api.addCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .finally(() => setIsLoadedAddPlace(false))
      .catch(err => console.log(err));
    }

  function handleDeletePlaceSubmit() {
    setIsLoadedDeletePlace(true);
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .finally(() => setIsLoadedDeletePlace(false))
      .catch(err => console.log(err));
  }

  function handleRegisterSubmit(data) {
    setIsLoadedRegister(true);
    apiAuth.register(data)
      .then((res) => {
        setIsSuccessTooltipStatus(true);
        navigate('/sign-in', {replace: true});
      })
      .finally(() => {
        handleOpenTooltip();
        setIsLoadedRegister(false);
      })
      .catch(err => {
        setIsSuccessTooltipStatus(false);
        console.log(err);
      })
  }

  function handleLoginSubmit(data) {
    setIsLoadedLogin(true);
    apiAuth.authorize(data)
      .then((res) => {
        if (res.token){
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .finally(() => setIsLoadedLogin(false))
      .catch(err => {
        setIsSuccessTooltipStatus(false);
        handleOpenTooltip()
        console.log(err);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in', {replace: true});
    setEmail('');
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header loggedIn={loggedIn} onSignOut={handleSignOut} email={email}/>
        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
              loggedIn = {loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeletePlaceClick}
              cards={cards}
              element={Main}
            />}
            />
            <Route path="/sign-up" element={<Register onRegister={handleRegisterSubmit} isLoaded={isLoadedRegister}/>}/>
            <Route path="/sign-in" element={<Login onLogin={handleLoginSubmit} isLoaded={isLoadedLogin}/>}/>
            <Route path="/*" element={<Navigate to="/" replace/>}/>

        </Routes>
        {loggedIn ? <Footer/> : null}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoaded={isLoadedUpdateUser}
          onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoaded={isLoadedAddPlace}
          onAddPlace={handleAddPlaceSubmit}/>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoaded={isLoadedUpdateAvatar}
          onUpdateAvatar={handleUpdateAvatar}/>

        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          isLoaded={isLoadedDeletePlace}
          onDeletePlace={handleDeletePlaceSubmit}/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          isSuccessTooltipStatus={isSuccessTooltipStatus}
          onClose={closeAllPopups}
          src={isSuccessTooltipStatus ? ok : error}
          alt={`${isSuccessTooltipStatus ? 'Успешно' : 'Ошибка'}`}
          title={isSuccessTooltipStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
