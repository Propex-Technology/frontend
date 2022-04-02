import React, { useState, useEffect } from "react";
import { debounce, classList } from "../utils";
import { Icon, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import Link from '@mui/material/Link';

const Header = props => {

  //#region Boilerplate Menu + Scroll Logic
  const [isTop, setIsTop] = useState(true);
  const [isClosed, setIsClosed] = useState(true);

  let scrollableElement = document.querySelector(".scrollable-content");
  if (!scrollableElement) scrollableElement = window;

  let handleScrollRef = null;
  let toggleIcon = isClosed ? "menu" : "close";

  const handleScroll = () => {
    return debounce(({ target: { scrollTop } }) => {
      let isCurrentTop = scrollTop < 100 || scrollableElement.scrollY < 100;
      setIsTop(isCurrentTop);
    }, 20);
  };

  handleScrollRef = handleScroll();

  useEffect(() => {
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScrollRef);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScrollRef);
      }
    };
  }, [scrollableElement, handleScrollRef]);
  //#endregion



  return (
    <section
      className={classList({
        header: true,
        "header-fixed": !isTop,
        closed: isClosed,
      })}
    >
      <div className="container header-container">
        <div className="brand">
          <img src="./assets/images/logos/propex-logo.png" alt="" />
        </div>
        <ul className="navigation">
          <li>
            <Link href="https://propex.uk/">About Us</Link>
          </li>
          <li>
            <NavLink to="/marketplace">Marketplace</NavLink>
          </li>
          <li>
            <Link href="https://projk.net/jeremy/">List a Property</Link>
          </li>
        </ul>
        <div className="m-auto" />
        <ul className="navigation">
          <li>
            <a href="/account">
              <Icon className="mr-4">person</Icon> My Account
            </a>
          </li>
        </ul>
        <IconButton
          className="header__toggle"
          onClick={() => {
            setIsClosed(!isClosed);
          }}
        >
          <Icon>{toggleIcon}</Icon>
        </IconButton>
      </div>
    </section>
  );
};

export default Header;
