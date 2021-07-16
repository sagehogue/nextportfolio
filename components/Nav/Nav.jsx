import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Nav.module.css";

// component determines if link is active, & wraps in router link
function NavLink({ children, href, location }) {
  const router = useRouter();
  console.log(router.asPath);
  let classes = [styles.NavLink];
  if (href === location) {
    classes.push(styles.Active);
  }
  return (
    <Link href={href}>
      <a className={classes.join(" ")}>{children}</a>
    </Link>
  );
}

// location will equal address of page where Nav is used
export default function Nav({ location }) {
  return (
    <div className={styles.Nav}>
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
    </div>
  );
}
