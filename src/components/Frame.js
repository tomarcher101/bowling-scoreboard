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
  const formatScore = (score, frame, frameNo) => {
    if (score == 10) {
      return "X"
    }
    if (frameNo == 2) {
      if (frame[1] + frame[2] == 10) {
        return "/"
      }
    }
    return score
  }

  if (props.frameNo == 10) {
    return (
      <div>
        <div style={outerContainer}>
          <div style={innerContainer}>
            <div style={threeBowlsContainer}>{formatScore(props.frame[1])}</div>
            <div style={threeBowlsContainer}>{formatScore(props.frame[2])}</div>
            <div style={threeBowlsContainer}>{formatScore(props.frame[3])}</div>
          </div>
          <div>
            <div>{props.cumTotal}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div style={outerContainer}>
          <div style={innerContainer}>
            <div style={twoBowlsContainer}>{formatScore(props.frame[1])}</div>
            <div style={twoBowlsContainer}>{formatScore(props.frame[2])}</div>
          </div>
          <div>
            {/* <div>ft={props.frameTotal}</div> */}
            <div>{props.cumTotal}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default Frame;
