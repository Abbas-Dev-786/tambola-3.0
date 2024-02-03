import Confetti from "react-confetti";

const ConfettiContainer = () => {
  const { height, width } = window.screen;

  return <Confetti width={width} height={height} />;
};

export default ConfettiContainer;
