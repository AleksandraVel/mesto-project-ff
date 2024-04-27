export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupWithEscape);
  popup.addEventListener("click", closeModalOnClickOverlay);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupWithEscape);
  popup.removeEventListener("click", closeModalOnClickOverlay);
}

function closePopupWithEscape(event) {
  if (event.keyCode === 27) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closeModalOnClickOverlay(event) {
  if (event.target.classList.contains("popup__close")) {
    closeModal(event.target.closest(".popup"));
  } else if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}