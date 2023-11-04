import { baseUrl } from "./Creds";

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._token = localStorage.getItem('token');
  }

  getCards() {
    return this._get("/cards");
  }

  getUserInfo() {
    return this._get("/users/me");
  }

  patchUserInfo(name, about) {
    return this._patch("/users/me", { name: name, about: about });
  }

  patchUserAvatar(link) {
    return this._patch("/users/me/avatar", { avatar: link });
  }

  postCard(name, link) {
    return this._post("/cards", { name: name, link: link });
  }

  putCardLike(id) {
    return this._put(`/cards/${id}/likes`);
  }

  deleteCardLike(id) {
    return this._delete(`/cards/${id}/likes`);
  }

  deleteCard(id) {
    return this._delete(`/cards/${id}`);
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.deleteCardLike(id) : this.putCardLike(id);
  }

  _get(queryParams) {
    return fetch(this._baseUrl + queryParams, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._checkResponse);
  }

  _patch(queryParams, body) {
    return fetch(this._baseUrl + queryParams, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  _post(queryParams, body) {
    return fetch(this._baseUrl + queryParams, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  _put(queryParams) {
    return fetch(this._baseUrl + queryParams, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._checkResponse);
  }

  _delete(queryParams) {
    return fetch(this._baseUrl + queryParams, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}

export const api = new Api(baseUrl);
