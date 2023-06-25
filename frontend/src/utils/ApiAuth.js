import {baseUrl} from './utils';

class ApiAuth {
  constructor(baseUrl) {
    this._url = baseUrl;
  }

  _request(path, method = 'GET', headers, body = null) {
    return fetch(this._url + path, {method, headers, body})
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  register(body) {
    return this._request('/signup', 'POST', {"Content-Type": "application/json"}, JSON.stringify(body))
  }

  authorize(body) {
    return this._request('/signin', 'POST', {"Content-Type": "application/json"}, JSON.stringify(body))
  }

  checkJWT(jwt) {
    return this._request('/users/me', 'GET', {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    })
  }
}

const apiAuth = new ApiAuth(baseUrl);

export default apiAuth;
