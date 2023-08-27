import React from "react";

function Card(card) {
  function handleClick() {
    card.onCardClick(card);
  }
  return (
    <article className="grid-net__item">
      <div className="grid-net__item-image-box">
        <img
          src={card.link}
          className="grid-net__item-image"
          alt={card.name}
          onClick={handleClick}
        />
      </div>
      <button className="grid-net__item-button-delete" type="delete"></button>
      <div className="grid-net__item-box">
        <h2 className="grid-net__item-title">{card.name}</h2>
        <div className="grid-net__item-user-box">
          <button className="grid-net__item-button"></button>
          <span className="grid-net__item-number">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
