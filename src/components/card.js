import { openModal } from "./modal.js";

// Функция создания карточки
export function createCard(information, removeCard, toggleLike, enlargeImage, popupImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");

  card.querySelector(".card__title").textContent = information.name;
  card.querySelector(".card__image").src = information.link;
  card.querySelector(".card__image").alt = `Изображение ${information.name}`;

  cardDeleteButton.addEventListener("click", function () {
    removeCard(card);
  });

  cardLikeButton.addEventListener("click", function () {
    toggleLike(cardLikeButton);
  });

  cardImage.addEventListener("click", function () {
    enlargeImage(information.link, information.name, popupImage);
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

// Открытие попапа с картинкой
export function enlargeImage(image, altText, popupImage) {
  const popupImageElement = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");

  popupImageElement.src = image;
  popupImageElement.alt = altText;
  popupCaption.textContent = altText;

  openModal(popupImage);
}