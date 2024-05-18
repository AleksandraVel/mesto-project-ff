// Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-13/users/me", {
    headers: {
      authorization: "85a0fd17-5682-458d-9fc8-8af543f36b97",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

// Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-13/cards", {
    headers: {
      authorization: "85a0fd17-5682-458d-9fc8-8af543f36b97",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      return result;
    });
};

// Редактирование профиля
export const saveProfileData = (name, about) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-13/users/me", {
    method: "PATCH",
    headers: {
      authorization: "85a0fd17-5682-458d-9fc8-8af543f36b97",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      about,
      avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
};

// Добавление новой карточки
export const saveNewCard = (name, link) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-13/cards", {
    method: "POST",
    headers: {
      authorization: "85a0fd17-5682-458d-9fc8-8af543f36b97",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция удаления карточки
export function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-13/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "85a0fd17-5682-458d-9fc8-8af543f36b97",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Функция для добавления лайка
export function likeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-13/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "85a0fd17-5682-458d-9fc8-8af543f36b97",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Функция для удаления лайка
export function delitelikeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-13/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "85a0fd17-5682-458d-9fc8-8af543f36b97",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

// Функция для добавления аватара
export const addNewAvatar = (avatarUrl) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-13/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "85a0fd17-5682-458d-9fc8-8af543f36b97",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};