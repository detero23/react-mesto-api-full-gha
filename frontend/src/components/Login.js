import React from "react";

export default function Login({ onLogin, buttonText }) {
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
    onLogin(login, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__input auth__input_type_signin-login"
          placeholder="Email"
          id="inputSigninLogin"
          name="inputSigninLogin"
          minLength="2"
          maxLength="40"
          value={login}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          className="auth__input auth__input_type_signin-password"
          placeholder="Пароль"
          id="inputSigninPassword"
          name="inputSigninPassword"
          minLength="2"
          maxLength="200"
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
      <p className="auth__subtext"></p>
    </section>
  );
}
