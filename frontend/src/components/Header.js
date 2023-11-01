import logo from "../images/logo-white.svg";
import { Route, Link, Routes } from "react-router-dom";

export default function Header({ login, onLogout }) {
  // const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="header__links">
              <p className="header__email">{login}</p>
              <button
                type="button"
                className="header__logout"
                onClick={onLogout}
              >
                Выйти
              </button>
            </div>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        ></Route>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
}
