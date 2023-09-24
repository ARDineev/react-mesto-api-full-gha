class Api {
  //класс для обмена информацией с бэкэндом.
  //Конструктор принимает объект со следующими данными:
  //основной url, объект с заголовками (включая данные в формате json)
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._options = options;
  }

  _request(url, options = this._options) {
    //приватный метод запроса с базовой логикой
    const { method, data, headers } = options;
    const fetchOptions = { headers: headers };
    fetchOptions.headers.authorization = 'Bearer ' + localStorage.getItem('token');

    if (method) {
      fetchOptions.method = method;
    }

    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }
  
    return fetch(`${this._baseUrl}${url}`, fetchOptions)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => Promise.reject('Запрос к серверу не выполнен', err))
  }

  getInitialCards() {
    return this._request('/cards', { method: 'GET', headers: this._headers});
  }

  getUserInformation() {
    return this._request('/users/me', { method: 'GET', headers: this._headers});
  }

  setUserInformation(data) {
    return this._request('/users/me', { method: 'PATCH', data, headers: this._headers});
  }

  createNewCard(data) {
    return this._request('/cards', { method: 'POST', data, headers: this._headers});
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: 'PUT', headers: this._headers});
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: 'DELETE', headers: this._headers});
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, { method: 'DELETE', headers: this._headers});
  }

  updateAvatar(data) {
    return this._request('/users/me/avatar', { method: 'PATCH', data, headers: this._headers});
  } 
}

export const api = new Api({
  //объект для взаимодействия с сервером
  //baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  baseUrl: 'http://localhost:3001',
  //export const BASE_URL = 'http://localhost:3001';
  headers: {
 //   authorization: 'fabf3491-9d70-415a-b8dd-c9dde5f7947e',
    'Content-Type': 'application/json'
  }
})
