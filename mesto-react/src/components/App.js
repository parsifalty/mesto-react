import React from "react";
import "../App.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAppPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  return (
    <div className="App">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAppPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        name={`profile`}
        title={`Редактировать профиль`}
        button={`Сохранить`}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_username"
            id="username"
            name="username"
            type="text"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="username-error popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_occupation"
            id="occupation"
            name="occupation"
            type="text"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="occupation-error popup__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        name={`create-card`}
        title={`Новое место`}
        button={`Сохранить`}
      >
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_place-name"
            id="name"
            name="name"
            type="text"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="name-error popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_link"
            id="link"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="link-error popup__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name={`profile-avatar`}
        title={`Обновить аватар`}
        button={`Сохранить`}
        container={"type-avatar"}
        isAvatarContainer={true}
      >
        <label className="popup__field">
          <input
            className="popup__input popup__input_type_avatar"
            name="avatar"
            id="avatar"
            minLength="5"
            maxLength="200"
            type="url"
            required
            placeholder="Ссылка"
          />
          <span className="avatar-error popup__input-error"></span>
        </label>
      </PopupWithForm>
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      <div className="popup popup_type_delete-card">
        <div className="popup__container popup__container_type-delete">
          <h2 className="popup__title popup__title_type_delete-card">
            Вы уверены ?
          </h2>
          <button className="popup__close-button" type="button"></button>
          <button
            className="popup__submit popup__submit_type-confirm"
            type="button"
          >
            Да
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
