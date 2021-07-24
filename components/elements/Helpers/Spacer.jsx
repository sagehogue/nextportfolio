import React from "react";

import styled from "styled-components";
const SpacerStyle = styled.div`
  margin-top: 1rem;
`;
export default function Spacer({ children }) {
  return <SpacerStyle>{children}</SpacerStyle>;
}
