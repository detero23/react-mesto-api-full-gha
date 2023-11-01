import { creds } from "./Creds";

class AuthApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  checkToken(token) {
    return this._get("/users/me", token);
  }

  signup({ email, password }) {
    return this._post("/signup", { email: email, password: password });
  }

  signin({ email, password }) {
    return this._post("/signin", { email: email, password: password });
  }

  _get(queryParams, token) {
    return fetch(this._baseUrl + queryParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  _post(queryParams, body) {
    return fetch(this._baseUrl + queryParams, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}

export const authApi = new AuthApi(creds["apiAuth"]);
