import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

export default function PopupWithForm({
  name,
  title,
  isOpen,
  onSubmit,
  buttonText,
  children,
}) {
  const app = useContext(AppContext);
  usePopupClose(isOpen, app.closeAllPopups);

  return (
    <section
      className={`popup popup_type_${name.toLowerCase()} ${
        isOpen ? "popup_opened" : ""
      }`}
      id={`popup${name}}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`popup${name}Form`}
          onSubmit={onSubmit}
        >
          {children}
          <input
            type="submit"
            className="popup__save-button"
            value={buttonText}
            name="saveButton"
          />
        </form>
        <button
          type="button"
          className="popup__close-button"
          onClick={app.closeAllPopups}
        />
      </div>
    </section>
  );
}
