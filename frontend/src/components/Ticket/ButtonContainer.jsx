import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getRow } from "../../utils/arrayToObj";
import { RaiseHand } from "../../api";
import ConfettiContainer from "../confetti";

const ButtonContainer = ({ data }) => {
  const [isFirstFive, setIsFirstFive] = useState(false);
  const [isFirstRow, setIsFirstRow] = useState(false);
  const [isSecondRow, setIsSecondRow] = useState(false);
  const [isThirdRow, setIsThirdRow] = useState(false);
  const [isCorner, setIsCorner] = useState(false);
  const [isFullGrid, setIsFullGrid] = useState(false);

  const [isFirstFiveClicked, setIsFirstFiveClicked] = useState(false);
  const [isFirstRowClicked, setIsFirstRowClicked] = useState(false);
  const [isSecondRowClicked, setIsSecondRowClicked] = useState(false);
  const [isThirdRowClicked, setIsThirdRowClicked] = useState(false);
  const [isCornerClicked, setIsCornerClicked] = useState(false);
  const [isFullGridClicked, setIsFullGridClicked] = useState(false);

  const [animate, setAnimate] = useState(false);
  const [recycle, setRecycle] = useState(false);

  const { mutate, data: scheme } = useMutation({
    mutationFn: RaiseHand,
    onSuccess: (data) => {
      if (data?.type === "first five") setIsFirstFiveClicked(true);
      else if (data?.type === "first row") setIsFirstRowClicked(true);
      else if (data?.type === "second row") setIsSecondRowClicked(true);
      else if (data?.type === "third row") setIsThirdRowClicked(true);
      else if (data?.type === "corner") setIsCornerClicked(true);
      else if (data?.type === "full") setIsFullGridClicked(true);

      if (data?.type === "full") {
        setAnimate(true);
        setRecycle(true);
      } else {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 5200);
      }

      toast.success("Your Request submitted");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  useEffect(() => {
    const firstRow = getRow(data, 0);
    const secondRow = getRow(data, 1);
    const thirdRow = getRow(data, 2);

    const firstCorner = firstRow?.filter((el) => el.key != null)?.[0];
    const secondCorner = firstRow
      ?.slice()
      ?.reverse()
      ?.filter((el) => el.key != null)?.[0];
    const thirdCorner = thirdRow?.filter((el) => el.key != null)?.[0];
    const fourthCorner = thirdRow
      ?.slice()
      ?.reverse()
      ?.filter((el) => el.key != null)?.[0];

    if (firstRow?.filter((el) => el.key != null)?.every((el) => el.isChecked)) {
      setIsFirstRow(true);
    }

    if (
      secondRow?.filter((el) => el.key != null)?.every((el) => el.isChecked)
    ) {
      setIsSecondRow(true);
    }

    if (thirdRow?.filter((el) => el.key != null)?.every((el) => el.isChecked)) {
      setIsThirdRow(true);
    }

    if (data?.filter((el) => el.isChecked).length == 5) {
      setIsFirstFive(true);
    }

    if (
      data?.[0] &&
      data?.filter((el) => el.key != null)?.every((el) => el.isChecked)
    ) {
      setIsFullGrid(true);
    }

    const corners = [firstCorner, secondCorner, thirdCorner, fourthCorner];
    if (corners?.every((el) => el?.isChecked)) {
      setIsCorner(true);
    }
  }, [data]);

  return (
    <div className="row mt-5">
      {animate && <ConfettiContainer recycle={recycle} />}
      <div className="col">
        <button
          className="btn btn-outline-secondary"
          disabled={!isFirstFive && !isFirstFiveClicked}
          onClick={() => mutate({ type: "first five" })}
        >
          First Five
        </button>
      </div>
      <div className="col">
        <button
          className="btn btn-outline-secondary"
          disabled={!isFirstRow && !isFirstRowClicked}
          onClick={() => mutate({ type: "first row" })}
        >
          1st Row
        </button>
      </div>
      <div className="col">
        <button
          className="btn btn-outline-secondary"
          disabled={!isSecondRow && !isSecondRowClicked}
          onClick={() => mutate({ type: "second row" })}
        >
          2nd Row
        </button>
      </div>
      <div className="col">
        <button
          className="btn btn-outline-secondary"
          disabled={!isThirdRow && !isThirdRowClicked}
          onClick={() => mutate({ type: "third row" })}
        >
          3rd Row
        </button>
      </div>
      <div className="col">
        <button
          className="btn btn-outline-secondary"
          onClick={() => mutate({ type: "corner" })}
          disabled={!isCorner && !isCornerClicked}
        >
          Corner
        </button>
      </div>
      <div className="col">
        <button
          className="btn btn-outline-secondary"
          disabled={!isFullGrid && !isFullGridClicked}
          onClick={() => mutate({ type: "full" })}
        >
          Full Grid
        </button>
      </div>
    </div>
  );
};

export default ButtonContainer;

ButtonContainer.propTypes = {
  data: PropTypes.array,
};
