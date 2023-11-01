import React from "react";

import Card from "./Card";
import editIcon from "../images/edit-icon.svg";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  loggedIn,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__edit-icon-holder">
          <img
            src={currentUser.avatar}
            alt="Фото профиля"
            className="profile__avatar"
            onClick={onEditAvatar}
          />
          <img
            src={editIcon}
            alt="Иконка редактирования"
            className="profile__edit-icon"
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-holder">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__ocupation">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements" aria-label="Карточки">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
