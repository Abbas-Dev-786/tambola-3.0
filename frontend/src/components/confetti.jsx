import Confetti from "react-confetti";

const ConfettiContainer = (props) => {
  const { height, width } = window.screen;

  return <Confetti {...props} width={width} height={height} />;
};

export default ConfettiContainer;
