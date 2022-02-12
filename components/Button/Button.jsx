import React from "react";
import styles from "../../styles/Button.module.css";
import styled from "styled-components";
import Link from "next/link";

// Gotta refactor this to use styled components

const ButtonStyle = styled.button`
  display: block;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "var(--color-3)"};
  color: ${(props) => (props.color ? props.color : "var(--color-offwhite)")};
  font-weight: 700;
  border: none;
  font-size: 18px;
  padding: ${(props) => (props.padding ? props.padding : "2rem 5rem")};
  margin: ${(props) => (props.marginTop ? props.marginTop : "0")}
    ${(props) => (props.marginRight ? props.marginRight : "0")}
    ${(props) => (props.marginBottom ? props.marginBottom : "0")}
    ${(props) => (props.marginLeft ? props.marginLeft : "0")};
  ${(props) => (props.mAuto ? "margin: auto;" : "")}
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  &:hover { 
    color: ${props => props.hoverColor? props.hoverColor : `var(--color-2)`};
  }
`;

const Anchor = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export default function Button({
  children,
  cta,
  link,
  padding = false,
  bgColor = false,
  color = false,
  marginTop = false,
  marginRight = false,
  marginBottom = false,
  marginLeft = false,
  mAuto = false,
  clickHandler = false,
  hoverColor=false
}) {
  console.log(hoverColor)
  if (link) {
    return (
      <Link href={link}>
        <ButtonStyle
          marginTop={marginTop}
          marginBottom={marginBottom}
          marginLeft={marginLeft}
          marginRight={marginRight}
          type="button"
          bgColor={bgColor}
          color={color}
          padding={padding}
          hoverColor={hoverColor}
        >
          {children}
        </ButtonStyle>
      </Link>
    );
  }else {

    return (
      <ButtonStyle
        mAuto={mAuto}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        type="button"
        bgColor={bgColor}
        color={color}
        padding={padding}
        hoverColor={hoverColor}
        onClick={clickHandler ? clickHandler : null}
      >
        {children}
      </ButtonStyle>
    );
  } 
}
