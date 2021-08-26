import React from "react";
import styled from "styled-components";

const Style = styled.div`
  display: grid;
  grid-template-columns: repeat(40, 1fr);
  grid-template-rows: repeat(40, 1fr);
  background-color: #d10e04;
`;
export default function Layout({ children }) {
  return <Style>{children}</Style>;
}
