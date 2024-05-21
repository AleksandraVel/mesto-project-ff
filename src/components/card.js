import { deleteCard, likeCard, delitelikeCard } from "../scripts/api";
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(information, userId, removeCard, toggleLike, enlargeImage) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const likeCounter = card.querySelector(".like-card");

  likeCounter.textContent = Array.isArray(information.likes) ? information.likes.length : 0;

  card.querySelector(".card__title").textContent = information.name;
  cardImage.src = information.link;
  cardImage.alt = `Изображение ${information.name}`;

  cardDeleteButton.addEventListener("click", function () {
    if (information && information._id) {
      removeCard(card, information._id);
    }
  });

  const isUserLiked = information.likes.some((like) => like._id === userId);
  if (isUserLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", function () {
    const isLiked = cardLikeButton.classList.contains("card__like-button_is-active");
    toggleLike(information._id, isLiked, likeCounter)
      .then((newIsLiked) => {
        cardLikeButton.classList.toggle("card__like-button_is-active", newIsLiked);
      })
      .catch((err) => {
        console.error("Ошибка при изменении состояния лайка:", err);
      });
  });

  cardImage.addEventListener("click", function () {
    if (information) {
      enlargeImage(information);
    }
  });

  if (information && information._id && information.owner && information.owner._id !== userId) {
    cardDeleteButton.remove();
  }

  return card;
}

// Функция удаления карточки
export function removeCard(card, cardId) {
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки с сервера:", err);
    });
}

// Функция для изменения состояния лайка
export function toggleLike(cardId, isLiked, likeCounter) {
  const isUserLiked = isLiked;

  if (isUserLiked) {
    return delitelikeCard(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        return false;
      })
      .catch((err) => {
        console.error("Ошибка при удалении лайка:", err);
        return isUserLiked;
      });
  } else {
    return likeCard(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        return true;
      })
      .catch((err) => {
        console.error("Ошибка при добавлении лайка:", err);
        return isUserLiked;
      });
  }
}