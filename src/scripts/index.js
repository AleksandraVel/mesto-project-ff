import "../pages/index.css";
import { createCard, removeCard, toggleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
//import { initialCards } from "./cards.js";
import { enableValidation, clearValidation } from "./validation.js";
import { getInitialCards, getUserInfo, saveProfileData, saveNewCard, addNewAvatar } from "./api.js";

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
const profileImage = document.querySelector(".profile__image");
const avatarForm = document.querySelector(".popup_avatar form");
const popupAvatar = document.querySelector(".popup_avatar");
const avatarUrlInput = avatarForm.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const newCardForm = document.querySelector(".popup_type_new-card form");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Вывести карточки на страницу
//initialCards.forEach(function (information) {
//  getUserInfo().then(() => {
//    cardsContainer.append(createCard(information, removeCard, toggleLike, enlargeImage));
//  });
//});

// Открытие модальных окон
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

// Закрытие модальных окон
popupCloseEdit.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});

popupCloseNewCard.addEventListener("click", function () {
  closeModal(popupTypeNewCard);
});

// Редактирование имени и информации о себе
function handleSaveProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newAbout = jobInput.value;

  saveProfileData(newName, newAbout)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((userId) => {
      profileTitle.textContent = userId.name;
      profileDescription.textContent = userId.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => console.error(err));
}

editProfileForm.addEventListener("submit", handleSaveProfileFormSubmit);

// Добавление новой карточки
newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const placeNameValue = newCardForm.querySelector('[name="place-name"]').value;
  const imageUrlValue = newCardForm.querySelector('[name="link"]').value;

  saveNewCard(placeNameValue, imageUrlValue)
    .then((newCard) => {
      getUserInfo().then((userId) => {
        const card = createCard(newCard, userId._id, removeCard, toggleLike, enlargeImage);
        cardsContainer.prepend(card);
        closeModal(popupTypeNewCard);
        newCardForm.reset();
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

// Открытие попапа с картинкой
export function enlargeImage(information) {
  popupImage.src = information.link;
  popupImage.alt = `Увеличенное изображение ${information.name}`;
  popupCaption.textContent = information.name;

  openModal(popupTypeImage);
}

// Добавление обработчика события на аватар
profileImage.addEventListener("click", function () {
  openModal(popupAvatar);
});

// Обработчик события для формы изменения аватара
function handleSaveAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = avatarUrlInput.value;

  addNewAvatar(avatarUrl)
    .then(() => {
      profileImage.src = avatarUrl;
      closeModal(popupAvatar);
      avatarUrlInput.value = "";
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    });
}

avatarForm.addEventListener("submit", handleSaveAvatarFormSubmit);

// Включение валидации
enableValidation(validationConfig);

// Очистка ошибок валидации
editProfileButton.addEventListener("click", function () {
  clearValidation(editProfileForm, validationConfig);
});

profileAddButton.addEventListener("click", function () {
  clearValidation(newCardForm, validationConfig);
});

// Promise
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userId, cardsData]) => {
    profileTitle.textContent = userId.name;
    profileDescription.textContent = userId.about;
    profileImage.style.backgroundImage = `url(${userId.avatar})`;

    cardsData.forEach((information) => {
      getUserInfo().then((userId) => {
        cardsContainer.append(createCard(information, userId._id, removeCard, toggleLike, enlargeImage));
      });
    });
  })
  .catch((err) => console.error(err));