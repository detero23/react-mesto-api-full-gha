import React from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister, buttonText }) {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLoginChange(e) {
    setLogin(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(login, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__input auth__input_type_signup-login"
          placeholder="Email"
          id="inputSignupLogin"
          name="inputSignupLogin"
          minLength="2"
          maxLength="40"
          value={login}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          className="auth__input auth__input_type_signup-password"
          placeholder="Пароль"
          id="inputSigninPassword"
          name="inputSigninPassword"
          minLength="2"
          maxLength="40"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input
          type="submit"
          className="auth__save-button"
          value={buttonText}
          name="saveButton"
        />
      </form>
      <p className="auth__subtext">
        Уже зарегестрированы?{" "}
        <Link className="auth__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}
