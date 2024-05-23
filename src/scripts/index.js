import "../pages/index.css";
import { createCard, removeCard, toggleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { getInitialCards, getUserInfo, saveProfileData, saveNewCard, addNewAvatar } from "./api.js";

const cardsContainer = document.querySelector(".places__list");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const buttonClosePopupEdit = document.querySelector(".popup_type_edit .popup__close");
const buttonClosePopupNewCard = document.querySelector(".popup_type_new-card .popup__close");
const formEditProfile = document.querySelector(".popup_type_edit form");
const profileNameTitle = document.querySelector(".profile__title");
const profileJobDescription = document.querySelector(".profile__description");
const profileAvatarImage = document.querySelector(".profile__image");
const formAvatar = document.querySelector(".popup_avatar form");
const popupAvatarEdit = document.querySelector(".popup_avatar");
const inputAvatarUrl = formAvatar.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const formNewCard = document.querySelector(".popup_type_new-card form");
const popupImagePreview = document.querySelector(".popup_type_image");
const imagePreview = popupImagePreview.querySelector(".popup__image");
const imageCaption = popupImagePreview.querySelector(".popup__caption");

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId = null;

// Открытие модальных окон
buttonOpenPopupProfile.addEventListener("click", function () {
  const currentName = profileNameTitle.textContent;
  const currentJob = profileJobDescription.textContent;

  nameInput.value = currentName;
  jobInput.value = currentJob;

  openModal(popupTypeEdit);
});

buttonOpenPopupNewCard.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

// Закрытие модальных окон
buttonClosePopupEdit.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});

buttonClosePopupNewCard.addEventListener("click", function () {
  closeModal(popupTypeNewCard);
});

// Редактирование имени и информации о себе
function handleSaveProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newAbout = jobInput.value;

  saveProfileData(newName, newAbout)
    .then((userId) => {
      profileNameTitle.textContent = userId.name;
      profileJobDescription.textContent = userId.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => console.error(err));
}

formEditProfile.addEventListener("submit", handleSaveProfileFormSubmit);

// Добавление новой карточки
formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const placeNameValue = formNewCard.querySelector('[name="place-name"]').value;
  const imageUrlValue = formNewCard.querySelector('[name="link"]').value;

  saveNewCard(placeNameValue, imageUrlValue)
    .then((newCard) => {
      const card = createCard(newCard, userId._id, removeCard, toggleLike, enlargeImage);
      cardsContainer.prepend(card);
      closeModal(popupTypeNewCard);
      formNewCard.reset();
    })
    .catch((err) => {
      console.error(err);
    });
});

// Открытие попапа с картинкой
export function enlargeImage(information) {
  imagePreview.src = information.link;
  imagePreview.alt = `Увеличенное изображение ${information.name}`;
  imageCaption.textContent = information.name;

  openModal(popupImagePreview);
}

// Добавление обработчика события на аватар
profileAvatarImage.addEventListener("click", function () {
  openModal(popupAvatarEdit);
});

// Обработчик события для формы изменения аватара
function handleSaveformAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = inputAvatarUrl.value;

  addNewAvatar(avatarUrl)
    .then((updatedAvatarInfo) => {
      profileAvatarImage.style.backgroundImage = `url("${updatedAvatarInfo.avatar}")`;
      closeModal(popupAvatarEdit);
      inputAvatarUrl.value = "";
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    });
}

formAvatar.addEventListener("submit", handleSaveformAvatarSubmit);

// Включение валидации
enableValidation(configValidation);

// Очистка ошибок валидации
buttonOpenPopupProfile.addEventListener("click", function () {
  clearValidation(formEditProfile, configValidation);
});

buttonOpenPopupNewCard.addEventListener("click", function () {
  clearValidation(formNewCard, configValidation);
});

// Promise
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userIdResult, cardsData]) => {
    userId = userIdResult;
    profileNameTitle.textContent = userId.name;
    profileJobDescription.textContent = userId.about;
    profileAvatarImage.style.backgroundImage = `url(${userId.avatar})`;

    cardsData.forEach((information) => {
      cardsContainer.append(createCard(information, userId._id, removeCard, toggleLike, enlargeImage));
    });
  })
  .catch((err) => console.error(err));