import React from "react";

import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onUpdateUser, buttonText }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="Edit"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input
        type="text"
        className="popup__input popup__input_type_info-name"
        placeholder="Имя"
        id="inputEditName"
        name="inputEditName"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error popup__input-error_inputEditName"></span>
      <input
        type="text"
        className="popup__input popup__input_type_info-job"
        placeholder="О себе"
        id="inputEditJob"
        name="inputEditJob"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__input-error popup__input-error_inputEditJob"></span>
    </PopupWithForm>
  );
}
