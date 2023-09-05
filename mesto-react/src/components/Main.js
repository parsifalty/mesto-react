import React from "react";
import api from "../utils/Api.js";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {
  // const [cards, setCards] = React.useState([]);

  const UserContext = React.useContext(CurrentUserContext)

 /* React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.error(err));
  }, []); */

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-area">
          <img
            src={UserContext.avatar}
            className="profile__avatar"
            alt="аватар-профиля"
          />
          <button
            className="profile__avatar-area-button"
            onClick={props.onEditAvatar}
            type="button"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-box">
            <h1 className="profile__info-fullname">{UserContext.name}</h1>
            <button
              className="profile__info-button"
              onClick={props.onEditProfile}
              type="button"
            ></button>
          </div>
          <p className="profile__info-occupation">{UserContext.about}</p>
        </div>
        <button
          className="profile__button"
          onClick={props.onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="grid-net" aria-label="грид-сетка">
        {props.cards.map((item, i) => (
          <Card onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} key={i} {...item} onCardClick={props.handleCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
