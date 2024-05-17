import "../pages/index.css";
import { createCard, removeCard, toggleLike } from "../components/card.js";
import { openModal, closeModal } from "../components/modal.js";
import { initialCards } from "./cards.js";
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
const profileImage = document.querySelector('.profile__image');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const newCardForm = document.querySelector(".popup_type_new-card form");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Вывести карточки на страницу
initialCards.forEach(function (information) {
  getUserInfo().then(() => {
    cardsContainer.append(createCard(information, removeCard, toggleLike, enlargeImage));
  });
});

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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupTypeEdit);
    })
    .catch(err => console.error(err));
}

editProfileForm.addEventListener("submit", handleSaveProfileFormSubmit);

// Добавление новой карточки
newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const placeNameValue = placeName.value;
  const imageUrlValue = imageUrl.value;

  saveNewCard(placeNameValue, imageUrlValue)
    .then(newCard => {
      getUserInfo().then(userData => {
        const card = createCard(newCard, userData._id, removeCard, toggleLike, enlargeImage);
        cardsContainer.prepend(card);
        closeModal(popupTypeNewCard);
        newCardForm.reset();
      });
    })
    .catch(err => {
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

// Включение валидации
enableValidation(validationConfig);

// Очистка ошибок валидации и отключение кнопки при открытии формы редактирования профиля и при очистке формы добавления карточки
editProfileButton.addEventListener("click", function () {
  clearValidation(editProfileForm, validationConfig);
});

profileAddButton.addEventListener("click", function () {
  clearValidation(newCardForm, validationConfig);
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;

    cardsData.forEach(information => {
      getUserInfo().then(userData => {
        cardsContainer.append(createCard(information, userData._id, removeCard, toggleLike, enlargeImage));
      });
    });
  })
  .catch(err => console.error(err));

getInitialCards()
  .then((result) => {
    // обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
