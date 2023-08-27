import React from 'react'
import api from '../utils/Api.js'
import Card from './Card.js'
function Main(props){
  
  const [userName, setUserName] = React.useState([]);
  const [userAvatar, setUserAvatar] = React.useState([]);
  const [userDescription, setUserDescription] = React.useState([]);
  const [cards, setCards] = React.useState([]);

 
React.useEffect(() => { 
api.getUserFromServer()
  .then((res) => { 
   setUserName(res.name);
   setUserDescription(res.about);
   setUserAvatar(res.avatar)
  }).catch((err) => console.error(err))
  }, []
)

React.useEffect(() => { 
  api.getInitialCards()
    .then((res) => { 
     setCards(res)
    })
    .catch((err) => console.error(err))
    }, []
  )

 
 
    return ( 
        <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-area">
          <img src={userAvatar} className="profile__avatar" alt="аватар-профиля" />
          <button className="profile__avatar-area-button"  onClick={props.onEditAvatar} type="button"></button>
        </div>
        <div className="profile__info">
          <div className="profile__info-box">
            <h1 className="profile__info-fullname">{userName}</h1>
            <button className="profile__info-button" onClick={props.onEditProfile} type="button"></button>
          </div>
          <p className="profile__info-occupation">{userDescription}</p>
        </div>
        <button className="profile__button" onClick={props.onAddPlace} type="button"></button>
      </section>
      <section className="grid-net" aria-label="грид-сетка">{cards.map((item, i) => (
  <Card 
  key={i}
  {...item}
  onCardClick={props.handleCardClick}/>
      )
      )
}</section>
    </main>
    )
}

export default Main