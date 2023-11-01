import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__heart-icon ${
    isLiked ? "element__heart-icon_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img
        src={card.link}
        alt={`Фото - ${card.name}`}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__white-space">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-holder">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="element__recycle"
          onClick={handleCardDelete}
        />
      )}
    </div>
  );
}
