const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(information, removeCard, toggleLike, enlargeImage) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");

  card.querySelector(".card__title").textContent = information.name;
  cardImage.src = information.link;
  cardImage.alt = `Изображение ${information.name}`;

  cardDeleteButton.addEventListener("click", function () {
    removeCard(card);
  });

  cardLikeButton.addEventListener("click", function () {
    toggleLike(cardLikeButton);
  });

  cardImage.addEventListener("click", function () {
    enlargeImage(information);
  });

  return card;
}

// Функция удаления карточки
export function removeCard(card) {
  card.remove();
}

// Функция обработки событий лайка
export function toggleLike(buttonElement) {
  buttonElement.classList.toggle("card__like-button_is-active");
}