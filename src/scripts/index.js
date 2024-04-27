import "../pages/index.css";
import { createCard, removeCard, toggleLike, enlargeImage } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { initialCards } from "./cards.js";

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupCloseEdit = document.querySelector(".popup_type_edit .popup__close");
const popupCloseNewCard = document.querySelector(".popup_type_new-card .popup__close");
const formElement = document.querySelector(".popup_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const newCardForm = document.querySelector(".popup_type_new-card form");
const cardImage = document.querySelector(".card__image");
const popupTypeImage = document.querySelector(".popup_type_image");

//вывести карточки на страницу
initialCards.forEach(function (information) {
  placesList.append(createCard(information, removeCard, toggleLike, enlargeImage, popupTypeImage));
});

//открытие модальных окон
editProfileButton.addEventListener("click", function () {
  openModal(popupTypeEdit);
});
profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});
cardImage.addEventListener("click", function () {
  enlargeImage(popupTypeImage);
});

//закрытие модальных окон
popupCloseEdit.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});
popupCloseNewCard.addEventListener("click", function () {
  closeModal(popupTypeNewCard);
});
cardImage.addEventListener("click", function () {
  closeModal(popupTypeImage);
});

//Редактирование имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  closeModal(popupTypeEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

//добавление новой карточки
newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const placeName = document.querySelector(".popup__input_type_card-name").value;
  const imageUrl = document.querySelector(".popup__input_type_url").value;

  const card = createCard({ name: placeName, link: imageUrl }, removeCard);

  placesList.prepend(card);
  closeModal(popupTypeNewCard);
  newCardForm.reset();
});