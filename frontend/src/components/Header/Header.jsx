import React from "react";
import "./Header.css";
import { Button } from "../Button/Button";
import logo from '../../images/LOGO.png'

export const Header = () => {
  return (
    <>
      <div className="header_main">
        <div className="header_right_block">
          <a href="/" className="header_logo_link">
            <img src={logo} alt="logo" className="header_logo_pic" />
          </a>
          <Button text = "Додати курс"> </Button>
        </div>

        <div className="header_left_block">
        <Button text = "Вийти"> </Button>
        </div>
      </div>
    </>
  );
};
