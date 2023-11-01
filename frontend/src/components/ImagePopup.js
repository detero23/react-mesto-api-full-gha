import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

export default function ImagePopup({ card }) {
  const app = useContext(AppContext);
  usePopupClose(card?.link, app.closeAllPopups);

  return (
    <section
      className={`popup popup_type_image ${
        card.link !== "#" ? "popup_opened" : ""
      }`}
      id="popupImage"
      aria-label="Фулскрин"
    >
      <figure className="popup__full-image-container">
        <img
          className="popup__full-image"
          src={card.link}
          alt={`Фото - ${card.name}`}
        />
        <figcaption className="popup__full-image-caption">
          {card.name}
        </figcaption>
        <button
          type="button"
          className="popup__close-button"
          onClick={app.closeAllPopups}
        />
      </figure>
    </section>
  );
}
