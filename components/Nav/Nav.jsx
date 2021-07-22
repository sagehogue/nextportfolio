import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Nav.module.css";
import NavLink from "../elements/NavLink";
import HamburgerMenu from "../HamburgerMenu/Hamburger";

// EFFECTS
// I think I should change the effects. Display the current page with an underline
// instead of being a different color & change color on hover. Or reverse that.

// location will equal address of page where Nav is used
export default function Nav({ location }) {
  let navToLoad;
  const NavigationLinks = (
    <>
      <NavLink href="/" location={location} noBG noPadding>
        Home
      </NavLink>
      <NavLink href="/about" location={location} noBG noPadding>
        About
      </NavLink>
      <NavLink href="/projects" location={location} noBG noPadding>
        Projects
      </NavLink>
      <NavLink href="/services" location={location} noBG noPadding>
        Services
      </NavLink>
      <NavLink href="/contact" location={location} noBG noPadding>
        Contact
      </NavLink>
    </>
  );
  {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 900) {
        navToLoad = (
          <nav className={[styles.Nav, styles.DesktopNav].join(" ")}>
            {NavigationLinks}
          </nav>
        );
      } else {
        navToLoad = <HamburgerMenu location={location} />;
      }
    }
  }

  return (
    <>
      {/* Desktop Navigation */}

      {navToLoad}
      {/* Mobile Navigation */}
    </>
  );
}
