import React from "react";

const outerContainer = {
  height: "100px",
  width: "100px",
  borderRadius: "10px",
  border: "solid",
};
const innerContainer = {
  display: "flex",
  padding: "5px",
  width: "100%",
  height: "40%",
  borderRadius: "3px",
};
const twoBowlsContainer = {
  border: "solid",
  borderWidth: "thin",
  height: "100%",
  width: "50%",
};
const threeBowlsContainer = {
  border: "solid",
  borderWidth: "thin",
  height: "100%",
  width: "50%",
};

const Frame = (props) => {
  const formatScore = (score, frameNo, bowlNo) => {
    if (
      bowlNo == 2 &&
      props.frame[2] > 0 &&
      props.frame[1] + props.frame[2] == 10
    ) {
      return "/";
    }
    if (score == 10) {
      return "X";
    }
    return score;
  };

  const bowlScores =
    props.frameNo == 10 ? (
      <div style={innerContainer}>
        <div style={threeBowlsContainer}>
          {formatScore(props.frame[1], props.frameNo, 1)}
        </div>
        <div style={threeBowlsContainer}>
          {formatScore(props.frame[2], props.frameNo, 2)}
        </div>
        <div style={threeBowlsContainer}>
          {formatScore(props.frame[3], props.frameNo, 3)}
        </div>
      </div>
    ) : (
      <div style={innerContainer}>
        <div style={twoBowlsContainer}>
          {formatScore(props.frame[1], props.frameNo, 1)}
        </div>
        <div style={twoBowlsContainer}>
          {formatScore(props.frame[2], props.frameNo, 2)}
        </div>
      </div>
    );

  return (
    <div>
      <div style={outerContainer} className={`bg-${props.colour}`}>
        {bowlScores}
        <div>
          <h3 className="rb">{props.cumTotal}</h3>
        </div>
      </div>
    </div>
  );
};

export default Frame;
