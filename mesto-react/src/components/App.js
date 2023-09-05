import React from "react";
import "../App.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from '../utils/Api.js'
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

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

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
}

  function handleCardDelete(id){ 
    api.deleteCard(id)
    .then((card) => {
      console.log(card)
    const FilterArray = cards.filter((c) => c._id !== id)
  setCards(FilterArray)}).catch((err) => console.error(err))
  }

  function handleSubmitUserForm(obj){ 
    api.setNewUserInfo(obj)
    .then((res) => { 
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => console.error(err))
  }

  function handleAvatarUserForm(avatar){
    api.addNewAvatar(avatar)
    .then((res) => { 
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => console.error(err))
  }

  function handleAddPlaceSubmit(card){ 
    api.addCard(card)
    .then((res) => { 
      setCards([res, ...cards])
      closeAllPopups()
    }).catch((err) => console.error(err))
  }

  const [cards, setCards] = React.useState([])

  React.useEffect(() => { 
    Promise.all([api.getUserFromServer(), api.getInitialCards()])
    .then(([user, cardsList]) => { 
      setCards(cardsList)
      setCurrentUser(user)
    }).catch((err) => console.error(err))
  }, [])

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAppPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleCardClick={handleCardClick}
        onCardLike={handleCardLike}
        cards={cards}
        onCardDelete={handleCardDelete}
      />
      <Footer />


      <EditProfilePopup onSubmit={handleSubmitUserForm} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      
     <EditAvatarPopup onSubmit={handleAvatarUserForm} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>

     <AddPlacePopup onSubmit={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
  
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
    </CurrentUserContext.Provider>
  );
}

export default App;
