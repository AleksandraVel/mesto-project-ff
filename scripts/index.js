// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(information, removeCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = card.querySelector(".card__delete-button");

  card.querySelector(".card__title").textContent = information.name;
  card.querySelector(".card__image").src = information.link;
  card.querySelector(".card__image").alt = `Изображение ${information.name}`;

  cardDeleteButton.addEventListener("click", function () {
    removeCard(card);
  });
  return card;
}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (information) {
  placesList.append(createCard(information, removeCard));
});