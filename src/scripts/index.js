import "../pages/index.css";
import { createCard, removeCard, toggleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { initialCards } from "./cards.js";

const cardsContainer = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupCloseEdit = document.querySelector(".popup_type_edit .popup__close");
const popupCloseNewCard = document.querySelector(".popup_type_new-card .popup__close");
const editProfileForm = document.querySelector(".popup_type_edit form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const newCardForm = document.querySelector(".popup_type_new-card form");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const placeName = document.querySelector(".popup__input_type_card-name");
const imageUrl = document.querySelector(".popup__input_type_url");

//вывести карточки на страницу
initialCards.forEach(function (information) {
  cardsContainer.append(createCard(information, removeCard, toggleLike, enlargeImage, popupTypeImage));
});

//открытие модальных окон
editProfileButton.addEventListener("click", function () {
  const currentName = profileTitle.textContent;
  const currentJob = profileDescription.textContent;

  nameInput.value = currentName;
  jobInput.value = currentJob;

  openModal(popupTypeEdit);
});
profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

//закрытие модальных окон
popupCloseEdit.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});
popupCloseNewCard.addEventListener("click", function () {
  closeModal(popupTypeNewCard);
});

//Редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  closeModal(popupTypeEdit);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//добавление новой карточки
newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const placeNameValue = placeName.value;
  const imageUrlValue = imageUrl.value;
  
  const card = createCard({ name: placeNameValue, link: imageUrlValue }, removeCard, toggleLike, enlargeImage);
  cardsContainer.prepend(card);

  closeModal(popupTypeNewCard);
  newCardForm.reset();
});

// Открытие попапа с картинкой
function enlargeImage(information) {

  popupImage.src = information.link;
  popupImage.alt = `Увеличенное изображение ${information.name}`;
  popupCaption.textContent = information.name;

  openModal(popupTypeImage);
}