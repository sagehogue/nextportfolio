import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import NavLink from "../elements/NavLink";
const HamburgerStyle = styled.div`
position: absolute;
z-index: 2;
right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content; center;
  min-height: 5rem;
  min-width: 5rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
  & .Menu-Widget--Hamburger-Top-Div {
    transform: ${(props) =>
      props.isOpen ? "translateY(160%) rotate(45deg) " : "none"};
  }
  & .Menu-Widget--Hamburger-Middle-Div {
    opacity: ${(props) => (props.isOpen ? "0" : "1")};
  }
  & .Menu-Widget--Hamburger-Bottom-Div {
    transform: ${(props) =>
      props.isOpen ? "translateY(-160%)rotate(-45deg) " : "none"};
  }
`;
const HamburgerDiv = styled.div`
  width: 4.5rem;
  height: 0.45rem;
  background-color: var(--color-text-i);
  margin-top: 0.3rem;
  transition: all 0.2s, opacity 0.1s;
  background-color: ${(props) =>
    props.isOpen ? `var(--color-6)` : "var(--color-5)"};
`;

const Tray = styled.nav`
  position: absolute;
  top: 4.5rem;
  right: 0;
  z-index: 2;
  transition: all 0.2s;
  text-align: center;
  background-color: var(--color-i);
  padding: 0.25rem;
  min-height: 8.75rem;
  display: flex;
  flex-direction: column;
  min-width: 8.5rem;
  max-width: 15rem;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(10rem)"};
`;

export default function Hamburger({ location }) {
  let [menuIsOpen, setMenuIsOpen] = useState(false);
  let toggleMenu = () => {
    if (menuIsOpen) {
      setMenuIsOpen(false);
    } else {
      setMenuIsOpen(true);
    }
  };
  return (
    <>
      <HamburgerStyle
        className="Menu-Widget--Hamburger"
        onClick={toggleMenu}
        isOpen={menuIsOpen}
      >
        <HamburgerDiv
          className="Menu-Widget--Hamburger-Top-Div"
          isOpen={menuIsOpen}
        ></HamburgerDiv>
        <HamburgerDiv
          className="Menu-Widget--Hamburger-Middle-Div"
          isOpen={menuIsOpen}
        ></HamburgerDiv>
        <HamburgerDiv
          className="Menu-Widget--Hamburger-Bottom-Div"
          isOpen={menuIsOpen}
        ></HamburgerDiv>
      </HamburgerStyle>
      <Tray isOpen={menuIsOpen}>
        <NavLink href="/" location={location}>
          Home
        </NavLink>
        <NavLink href="/about" location={location}>
          About
        </NavLink>
        <NavLink href="/projects" location={location}>
          Projects
        </NavLink>
        <NavLink href="/services" location={location}>
          Services
        </NavLink>
        <NavLink href="/contact" location={location}>
          Contact
        </NavLink>
      </Tray>
    </>
  );
}
