import React from "react";

import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onUpdateAvatar,
  buttonText,
}) {
  const inputAvatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(inputAvatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="Avatar"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input
        type="url"
        className="popup__input popup__input_type_img-ref"
        placeholder="Ссылка на картинку"
        id="inputAvatarRef"
        name="inputAvatarRef"
        ref={inputAvatarRef}
        required
      />
      <span className="popup__input-error popup__input-error_inputAvatarRef"></span>
    </PopupWithForm>
  );
}
