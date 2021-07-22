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
  }
  &:hover {
    color: var(--color-2);
  }
  &:hover:active {
    background-color: var(--color-1);
  }
`;

export default function NavLink({ href, location, children, noPadding, noBG }) {
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
      >
        {children}
      </NavStyle>
    </Link>
  );
}
