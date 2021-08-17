import React from "react";
import styled from "styled-components";
import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loader() {
  return <Spinner type="Rings" color="#FC7419" height={250} width={250} />;
}
