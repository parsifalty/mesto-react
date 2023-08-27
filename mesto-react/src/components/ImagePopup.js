import React from 'react'

function ImagePopup(props){ 
    return ( 
    <div className={`popup popup_type_image-overlay ${props.card ? 'popup_active' : ''}`}>
      <div className="popup__overlay-holder">
        <img className="popup__image" src={`${props.card ? props.card.link : ''}`}/>
        <p className="popup__span"></p>
        <button className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </div>
    )
}

export default ImagePopup