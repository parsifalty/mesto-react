import React from "react";
import logo from "../images/Vector.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
    </header>
  );
}

export default Header;
