import React from "react";
import styled from "styled-components";

const Styles = styled.h1`
  color: var(--color-offwhite);
  width: inherit;
`;

export default function Headline({ children }) {
  return <Styles>{children}</Styles>;
}
