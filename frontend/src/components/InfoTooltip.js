import greenmark from "../images/green-mark.svg";
import redmark from "../images/red-mark.svg";

import { usePopupClose } from "../hooks/usePopupClose";

export default function InfoTooltip({ isOpen, onClose, isAuthError }) {
  usePopupClose(isOpen, onClose);

  return (
    <section
      className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}
      id="popupInfoTooltip"
      aria-label="ИнфоТултип"
    >
      <figure className="popup__checkmark-container">
        <img
          className="popup__checkmark"
          src={isAuthError ? greenmark : redmark}
          alt={`Отметка`}
        />
        <figcaption className="popup__checkmark-caption">
          {isAuthError
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </figcaption>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
      </figure>
    </section>
  );
}
