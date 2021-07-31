import React from "react";
import styled from "styled-components";
const FrameStyle = styled.div`
  max-width: ${(props) => (props.bringCenter ? "38vw" : "100vw")};
  margin: ${(props) =>
    props.verticalCenter && props.horizontalCenter
      ? "auto"
      : props.horizontalCenter
      ? "0 auto 0 auto"
      : props.verticalCenter
      ? " auto 0 auto 0"
      : ""};
  // margin: ${(props) => (props.verticalCenter ? "auto" : "0 auto 0 auto")};
  @media screen and (max-width: 900px) {
    max-width: ${(props) => (props.bringCenter ? "85vw" : "100vw")};
    
  }
  @media screen and (max-width: 800px) {
    max-width: ${(props) => (props.bringCenter ? "90vw" : "100vw")};
    
  }
  @media screen and (max-width: 900px) and (min-height: 1000px) {
    max-width: ${(props) => (props.bringCenter ? "85vw" : "100vw")};
    
  }
  @media screen and (max-width: 600px) {
    max-width: 90vw;
    
  }

  let textWidth = "45vw";
  if (window.innerWidth < 1400) {
    textWidth = "55vw";
  }
  if (window.innerWidth < 1100) {
    textWidth = "65vw";
  }
`;

export default function Frame({
  children,
  bringCenter,
  verticalCenter,
  horizontalCenter,
  width,
}) {
  return (
    <FrameStyle
      verticalCenter={verticalCenter}
      bringCenter={bringCenter}
      horizontalCenter={horizontalCenter}
      width={width}
    >
      {children}
    </FrameStyle>
  );
}
