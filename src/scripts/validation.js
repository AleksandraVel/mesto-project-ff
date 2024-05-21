// Объект настройки валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Регулярные выражения для проверки полей
const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,40}$/;
const descriptionPattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,200}$/;
const aboutPattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,200}$/;
const titlePattern = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,30}$/;
const urlPattern = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[^\s]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})$/;

// Функция для проверки URL изображения
function isValidImageUrl(url) {
  return /\.(jpg|jpeg|png|gif)$/.test(url);
}

// Функции для отображения и скрытия сообщений об ошибках ввода
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  }
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  }
}

// Функция проверки валидности поля
function isValid(formElement, inputElement) {
  let errorMessage = "";
  if (inputElement.value.trim() === "") {
    errorMessage = inputElement.name === "link" ? "Введите адрес сайта" : "Вы пропустили это поле";
  } else if (inputElement.name === "name" && !namePattern.test(inputElement.value)) {
    errorMessage = "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.";
  } else if (inputElement.name === "description" && !descriptionPattern.test(inputElement.value)) {
    errorMessage = "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.";
  } else if (inputElement.name === "about" && !aboutPattern.test(inputElement.value)) {
    errorMessage = "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.";
  } else if (inputElement.name === "title" && !titlePattern.test(inputElement.value)) {
    errorMessage = "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.";
  } else if (inputElement.name === "link" && !urlPattern.test(inputElement.value)) {
    errorMessage = "Введите адрес сайта";
  } else if (inputElement.name === "link" && !isValidImageUrl(inputElement.value)) {
    errorMessage = "Пожалуйста, введите URL изображения с правильным расширением файла (jpg, jpeg, png, gif).";
  }

  if (!inputElement.validity.valid || errorMessage) {
    showInputError(formElement, inputElement, errorMessage || inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Функция переключения состояния кнопки отправки
function toggleButtonState(inputList, buttonElement) {
  const hasInvalidInput = inputList.some((inputElement) => {
    isValid(inputElement.form, inputElement);
    return !inputElement.validity.valid || (inputElement.name === "link" && !isValidImageUrl(inputElement.value));
  });

  if (hasInvalidInput) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Функция установки слушателей событий
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  toggleButtonState(inputList, buttonElement);
}

// Функция очистки валидации
export function clearValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);
}

// Функция включения валидации
export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}