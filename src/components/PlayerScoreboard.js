import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { incrementTurn } from "../actions/actions";

const container = {
  margin: "auto",
};
// const

const PlayerScoreboard = (props) => {
  const [framesObj, setFrameObj] = useState({
    1: { frameTotal: undefined, cumTotal: 0 },
    2: { frameTotal: undefined, cumTotal: 0 },
    3: { frameTotal: undefined, cumTotal: 0 },
    4: { frameTotal: undefined, cumTotal: 0 },
    5: { frameTotal: undefined, cumTotal: 0 },
    6: { frameTotal: undefined, cumTotal: 0 },
    7: { frameTotal: undefined, cumTotal: 0 },
    8: { frameTotal: undefined, cumTotal: 0 },
    9: { frameTotal: undefined, cumTotal: 0 },
    10: { frameTotal: undefined, cumTotal: 0 },
  });

  useEffect(() => {
    updateFrameTotals();
  }, [props.score]);

  const updateFrameTotals = (scoreObj) => {
    // Get first empty frame
    let frameNo = 1;
    while (typeof framesObj[frameNo].frameTotal != "undefined") {
      frameNo += 1;
    }

    const openFrameScore = props.score[frameNo][1] + props.score[frameNo][2];
    const isOpenFrame = openFrameScore < 10;
    const isStrike = props.score[frameNo][1] == 10;
    const isSpare =
      !isStrike && props.score[frameNo][1] + props.score[frameNo][2] == 10;

    if (isOpenFrame) {
      setFrameObj((state) => {
        return {
          ...state,
          [frameNo]: {
            ...state[frameNo],
            frameTotal: openFrameScore,
          },
        };
      });
    } else if (isSpare) {
      // check if next bowl has been bowled
      const nextBowlDone = typeof props.score[frameNo + 1][1] != "undefined";
      if (nextBowlDone) {
        const nextBowlScore = props.score[frameNo + 1][1];
        setFrameObj((state) => {
          return {
            ...state,
            [frameNo]: {
              ...state[frameNo],
              frameTotal: openFrameScore + nextBowlScore,
            },
          };
        });
      } else {
        return undefined;
      }
    } else if (isStrike) {
      // check if 2 next bowls have been bowled
      const next2BowlsDone =
        typeof props.score[frameNo + 1][1] != "undefined" &&
        typeof props.score[frameNo + 1][2] != "undefined";
      if (next2BowlsDone) {
        const next2BowlsScore =
          props.score[frameNo + 1][1] + props.score[frameNo + 1][2];
        setFrameObj((state) => {
          return {
            ...state,
            [frameNo]: {
              ...state[frameNo],
              frameTotal: openFrameScore + next2BowlsScore,
            },
          };
        });
      }
    }
  };

  const framesJSX = [];
  for (let [frameNo, frame] of Object.entries(props.score)) {
    if (frameNo == 10) {
      continue;
    }
    framesJSX.push(
      <div style={{ border: "solid", height: "100px", width: "100px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ border: "solid", borderWidth: "thin" }}>{frame[1]}</div>
          <div style={{ border: "solid", borderWidth: "thin" }}>{frame[2]}</div>
        </div>
        <div>
          <div>ft={framesObj[frameNo].frameTotal}</div>
          <div>ct={framesObj[frameNo].cumTotal}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div
        style={{ display: "flex", margin: "auto", justifyContent: "center" }}
      >
        {/* First 9 frames */}
        {framesJSX}
        {/* 10th Frame */}
        <div style={{ border: "solid", height: "100px", width: "100px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ border: "solid", borderWidth: "thin" }}>
              {props.score[10][1]}
            </div>
            <div style={{ border: "solid", borderWidth: "thin" }}>
              {props.score[10][2]}
            </div>
            <div style={{ border: "solid", borderWidth: "thin" }}>
              {props.score[10][3]}
            </div>
          </div>
          <div>
            <div>ft={framesObj[10].frameTotal}</div>
            <div>ct={framesObj[10].cumTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerScoreboard;
