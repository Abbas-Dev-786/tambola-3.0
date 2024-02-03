import React from "react";
import Confetti from "react-confetti";

export default () => {
  const { height, width } = window?.screen;
  return <Confetti width={width} height={height} />;
};
