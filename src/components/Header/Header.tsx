import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__list">
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/resume">Создать резюме</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
