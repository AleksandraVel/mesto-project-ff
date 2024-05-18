import { deleteCard, likeCard, delitelikeCard } from "../scripts/api";
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(information, userId, removeCard, toggleLike, enlargeImage) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const like_card = card.querySelector(".like-card");

  like_card.textContent = Array.isArray(information.likes) ? information.likes.length : 0;

  card.querySelector(".card__title").textContent = information.name;
  cardImage.src = information.link;
  cardImage.alt = `Изображение ${information.name}`;

  cardDeleteButton.addEventListener("click", function () {
    if (information && information._id) {
      removeCard(card, information._id);
    }
  });

  cardLikeButton.addEventListener("click", function () {
    toggleLike(information._id, cardLikeButton.classList.contains("card__like-button_active"), like_card);
  });

  cardImage.addEventListener("click", function () {
    if (information) {
      enlargeImage(information);
    }
  });

  if (information && information._id && information.owner && information.owner._id === userId) {
    cardDeleteButton.addEventListener("click", function () {
      if (information && information._id) {
        removeCard(card, information._id);
      }
    });
  } else {
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

// Функция обработки событий лайка
export function toggleLike(cardId, isLiked, likeCounter) {
  const likeButton = document.querySelector(`.card__like-button[data-card-id="${cardId}"]`);

  if (isLiked) {
    delitelikeCard(cardId)
      .then(() => {
        likeCounter.textContent = parseInt(likeCounter.textContent, 10) - 1;
        if (likeButton) {
          likeButton.classList.remove("card__like-button_is-active");
          likeButton.classList.add("card__like-button_is-inactive");
        }
      })
      .catch((err) => console.error(err));
  } else {
    likeCard(cardId)
      .then(() => {
        likeCounter.textContent = parseInt(likeCounter.textContent, 10) + 1;
        if (likeButton) {
          likeButton.classList.remove("card__like-button_is-inactive");
          likeButton.classList.add("card__like-button_is-active");
        }
      })
      .catch((err) => console.error(err));
  }
}
