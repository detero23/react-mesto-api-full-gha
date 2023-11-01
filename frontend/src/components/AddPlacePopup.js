import React from "react";

import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onAddPlace, buttonText }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="Add"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input
        type="text"
        className="popup__input popup__input_type_img-name"
        placeholder="Название"
        id="inputAddName"
        name="inputAddName"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error popup__input-error_inputAddName"></span>
      <input
        type="url"
        className="popup__input popup__input_type_img-ref"
        placeholder="Ссылка на картинку"
        id="inputAddRef"
        name="inputAddRef"
        value={link}
        onChange={handleLinkChange}
        required
      />
      <span className="popup__input-error popup__input-error_inputAddRef"></span>
    </PopupWithForm>
  );
}
