const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(information,userId, removeCard, toggleLike, enlargeImage) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const like_card = card.querySelector('.like-card');

  like_card.textContent = Array.isArray(information.likes) ? information.likes.length : 0;

  card.querySelector(".card__title").textContent = information.name;
  cardImage.src = information.link;
  cardImage.alt = `Изображение ${information.name}`;

  cardDeleteButton.addEventListener("click", function () {
    removeCard(card);
  });

  cardLikeButton.addEventListener("click", function () {
    toggleLike(cardLikeButton, like_card, information);
  });

  cardImage.addEventListener("click", function () {
    enlargeImage(information);
  });

  if (information._id && information.owner._id === userId) {
    cardDeleteButton.addEventListener("click", function () {
      removeCard(card);
    });
  } else {
    cardDeleteButton.remove();
  } 
  
  return card;
}


// Функция удаления карточки
export function removeCard(card) {
  card.remove();
}

// Функция обработки событий лайка
export function toggleLike(buttonElement, likeCounter) {
  buttonElement.classList.toggle("card__like-button_is-active");
  likeCounter.textContent = parseInt(likeCounter.textContent, 10) + (buttonElement.classList.contains("card__like-button_is-active") ? 1 : -1);
}
