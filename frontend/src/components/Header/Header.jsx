import React from "react";
import "./Header.css";
import { Button } from "../Button/Button";
import logo from '../../images/LOGO.png'

export const Header = ({ textButton, logoutText, firstAction, secondAction }) => {
  return (
    <div className="header_main">
      <div className="header_right_block">
        <a href="/" className="header_logo_link">
          <img src={logo} alt="logo" className="header_logo_pic" />
        </a>
        <Button text={textButton} onClick={firstAction} />
      </div>
      <div className="header_left_block">
        <Button text={logoutText} onClick={secondAction}  />
      </div>
    </div>
  );
};
