import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Nav.module.css";
import styled from "styled-components";

const NavStyle = styled.a`
  transition: all 0.25s;
  padding: ${(props) => (props.noPadding ? "0" : "0.5rem 1rem")};
  color: var(--color-offwhite);
  font-family: var(--font-subheading);
  font-weight: 800;
  letter-spacing: 2px;
  background-color: ${(props) => (props.noBG ? "0" : "var(--color-5)")};
  border: none;
  &::after {
    display: block;
    width: 3.2rem;
    height: 5px;
    background-color: ${(props) =>
      props.active ? "var(--color-3)" : "transparent"};
    content: " ";
    transform: ${(props) => (props.hamburger ? "translateX(.95rem)" : "")};
  }
  &:hover {
    color: var(--color-2);
  }
  &:hover:active {
    background-color: var(--color-1);
  }
  @media screen and (max-width: 1650px) {
    font-size: 14px;
    &::after {
      width: 2.9rem;
    }
  }
  @media screen and (max-width: 1500px) {
    margin-right: 1rem;
  }
  @media screen and (max-width: 1400px) {
    font-size: 12px;
    margin-right: 1.75rem;
    &::after {
      width: 2.6rem;
      height: 4px;
    }
  }
  @media screen and (max-width: 1300px) {
    font-size: 10px;
    margin-right: 2.5rem;
    &::after {
      width: 2.25rem;
      height: 3px;
    }
  }
  @media screen and (max-width: 1050px) {
    font-size: 10px;
    margin-right: 1.25rem;
    &::after {
    width:${(props) => (props.hamburger ? "2.55rem" : "2.25rem")};
    }
    @media screen and (max-width: 900px) {
      font-size: 1.35rem;
      &::after {
      width:${(props) => (props.hamburger ? "4.65rem" : "2.25rem")};
      }
    }
`;

export default function NavLink({
  href,
  location,
  children,
  noPadding,
  noBG,
  hamburger = false,
}) {
  //   const router = useRouter();
  console.log(href === location);
  let classes = [styles.NavLink];
  if (href === location) {
    classes.push(styles.Active);
  }

  return (
    <Link href={href}>
      <NavStyle
        active={href === location ? true : false}
        location={location}
        noPadding={noPadding}
        noBG={noBG}
        hamburger={hamburger}
      >
        {children}
      </NavStyle>
    </Link>
  );
}
