import React from "react";
import styled from "styled-components";

const Style = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  background-color: #d10e04;
  width: 100vw;
  height: 100vh;
`;
export default function Layout({ children }) {
  return <Style>{children}</Style>;
}
