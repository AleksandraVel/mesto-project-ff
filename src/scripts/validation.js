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
function showInputError(formElement, inputElement, errorMessage, validationClasses) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__error_visible");
  }
}

function hideInputError(formElement, inputElement, validationClasses) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__error_visible");
    errorElement.textContent = "";
  }
}

// Функция проверки валидности поля
function isValid(formElement, inputElement, validationClasses) {
  let errorMessage = "";
  if (inputElement.value.trim() === "") {
    errorMessage = inputElement.name === "link" ? "Введите адрес сайта" : "Вы пропустили это поле";
  } else if (inputElement.name === "name" && !namePattern.test(inputElement.value)) {
    errorMessage = "Минимальное количество символов: 2. Длина текста сейчас: 1 символ.";
  } else if (inputElement.name === "description" && !namePattern.test(inputElement.value)) {
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
    showInputError(formElement, inputElement, errorMessage || inputElement.validationMessage, validationClasses);
  } else {
    hideInputError(formElement, inputElement, validationClasses);
  }
}

// Функция переключения состояния кнопки отправки
function toggleButtonState(inputList, buttonElement, validationClasses) {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
    buttonElement.classList.add(validationClasses.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationClasses.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Функция установки слушателей событий
function setEventListeners(formElement, validationClasses) {
  const inputList = Array.from(formElement.querySelectorAll(validationClasses.inputSelector));
  const buttonElement = formElement.querySelector(validationClasses.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement, validationClasses);
      toggleButtonState(inputList, buttonElement, validationClasses);
    });
  });

  toggleButtonState(inputList, buttonElement, validationClasses);
}

// Функция очистки валидации
export function clearValidation(formElement, validationClasses) {
  const inputList = Array.from(formElement.querySelectorAll(validationClasses.inputSelector));
  const buttonElement = formElement.querySelector(validationClasses.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationClasses);
  });

  toggleButtonState(inputList, buttonElement, validationClasses);
}

// Функция включения валидации
export function enableValidation(validationClasses) {
  const formList = Array.from(document.querySelectorAll(validationClasses.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationClasses);
  });
}