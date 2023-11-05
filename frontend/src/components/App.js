// detero23@bk.ru
// 123

import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import { api } from "../utils/Api";
import { authApi } from "../utils/AuthApi";
import { AppContext } from "../contexts/AppContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    _id: "not loaded",
    name: "Имя не загружено",
    about: "Описание не загружено",
    avatar: "#",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [login, setLogin] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    link: "#",
    name: "нет выбранной карты",
  });
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] =
    React.useState(false);
  const [isAuthError, setAuthError] = React.useState(false);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeInfoTooltip() {
    closeAllPopups();
    if (isAuthError && location.pathname === "/sign-up") {
      navigate("/sign-in", { replace: true });
    }
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({ link: "#", name: "нет выбранной карты" });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => {
        console.error(`Change like status - error ${err.status}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((el) => el._id !== card._id));
      })
      .catch((err) => {
        console.error(`Delete card - error ${err.status}`);
      });
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(name, about) {
    function makeRequest() {
      return api.patchUserInfo(name, about).then((userInfo) => {
        setCurrentUser(userInfo.data);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(avatar) {
    function makeRequest() {
      return api.patchUserAvatar(avatar).then((userInfo) => {
        setCurrentUser(userInfo.data);
      });
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit(name, link) {
    function makeRequest() {
      return api.postCard(name, link).then((newCard) => {
        setCards([newCard.data, ...cards]);
      });
    }
    handleSubmit(makeRequest);
  }

  function onRegister(email, password) {
    setIsLoading(true);
    authApi
      .signup({ email, password })
      .then(() => {
        setAuthError(true);
      })
      .catch((err) => {
        setAuthError(false);
        console.error(`Register - error ${err.status}`);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
        setIsLoading(false);
      });
  }

  function onLogin(email, password) {
    setIsLoading(true);
    authApi
      .signin({ email, password })
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLogin(email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setAuthError(false);
        setInfoTooltipPopupOpen(true);
        console.error(`Login - error ${err.status}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onLogout() {
    setLoggedIn(false);
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData.data);
        setCards(initialCards.data);
      })
      .catch((err) => {
        console.error(`Get cards and user info - error ${err.status}`);
      });
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    authApi
      .checkToken(token)
      .then((res) => {
        setLogin(res.data.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(`Check token - error ${err.status}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header login={login} onLogout={onLogout} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  component={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  onRegister={onRegister}
                  buttonText={
                    isLoading ? "Регистрация..." : "Зарегистрироваться"
                  }
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onLogin={onLogin}
                  buttonText={isLoading ? "Вход..." : "Войти"}
                />
              }
            />
          </Routes>
          {loggedIn ? (
            <>
              <Footer />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={handleUpdateAvatar}
                buttonText={isLoading ? "Обновление..." : "Обновить"}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onUpdateUser={handleUpdateUser}
                buttonText={isLoading ? "Сохранение..." : "Сохранить"}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onAddPlace={handleAddPlaceSubmit}
                buttonText={isLoading ? "Создание..." : "Создать"}
              />
              <ImagePopup card={selectedCard} />
            </>
          ) : (
            <InfoTooltip
              isOpen={isInfoTooltipPopupOpen}
              onClose={closeInfoTooltip}
              isAuthError={isAuthError}
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}
