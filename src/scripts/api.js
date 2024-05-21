const COHORT_ID = "wff-cohort-13";
const TOKEN = "85a0fd17-5682-458d-9fc8-8af543f36b97";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const anyRequest = (url, options) => {
  return fetch(url, options).then((res) => checkResponse(res));
};

// Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return anyRequest(`https://nomoreparties.co/v1/${COHORT_ID}/users/me`, {
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
  });
};

// Загрузка карточек с сервера
export const getInitialCards = () => {
  return anyRequest(`https://nomoreparties.co/v1/${COHORT_ID}/cards`, {
    headers: {
      authorization: TOKEN,
    },
  });
};

// Редактирование профиля
export const saveProfileData = (name, about) => {
  return anyRequest(`https://nomoreparties.co/v1/${COHORT_ID}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      about,
    }),
  });
};

// Добавление новой карточки
export const saveNewCard = (name, link) => {
  return anyRequest(`https://nomoreparties.co/v1/${COHORT_ID}/cards`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
    }),
  });
};

// Функция удаления карточки
export function deleteCard(cardId) {
  return anyRequest(`https://nomoreparties.co/v1/${COHORT_ID}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
  });
}

// Функция для добавления лайка
export function likeCard(cardId) {
  return anyRequest(`https://nomoreparties.co/v1/${COHORT_ID}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
  });
}

// Функция для удаления лайка
export function delitelikeCard(cardId) {
  return anyRequest(`https://nomoreparties.co/v1/${COHORT_ID}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
  });
}

// Функция для добавления аватара
export const addNewAvatar = (avatarUrl) => {
  return anyRequest(`https://nomoreparties.co/v1/${COHORT_ID}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  });
};