import React, { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { connect, useSelector, useDispatch } from "react-redux";
import { addExtraTurn } from "../actions/actions";
import * as utils from "../utilities"

const container = {
  margin: "auto",
};
// const

const PlayerScoreboard = (props) => {
  const turn = useSelector((state) => state.turn);
  const dispatch = useDispatch()

  const [framesObj, setFrameObj] = useState({
    1: { frameTotal: undefined, cumTotal: undefined },
    2: { frameTotal: undefined, cumTotal: undefined },
    3: { frameTotal: undefined, cumTotal: undefined },
    4: { frameTotal: undefined, cumTotal: undefined },
    5: { frameTotal: undefined, cumTotal: undefined },
    6: { frameTotal: undefined, cumTotal: undefined },
    7: { frameTotal: undefined, cumTotal: undefined },
    8: { frameTotal: undefined, cumTotal: undefined },
    9: { frameTotal: undefined, cumTotal: undefined },
    10: { frameTotal: undefined, cumTotal: undefined },
  });

  const [frameTotals, setFrameTotals] = useState({
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined,
    10: undefined,
  });

  const [cumTotals, setCumTotals] = useState({
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
    5: undefined,
    6: undefined,
    7: undefined,
    8: undefined,
    9: undefined,
    10: undefined,
  });

  // Effect to add an additional bowl to the final frame if final bowl is a strike/spare
  // This is almost definitely in the wrong place, as it was a late addition.
  // Having it in the turn reducer with the other turn based logic added problems because it needs access to 
  // the score state to see whether it should run. I could've passed the score state into
  // the INCREMENT action, but it seemed to pass through on every call when it is only needed once.
  useEffect(() => {
    if (typeof props.score[10][2] != "undefined") {
      // If frame10, bowl2 is defined => check if player gets another go
      if (props.score[10][2] == 10) {
        dispatch(addExtraTurn())
      } else if (Object.values(props.score[turn.frameNo]).reduce((acc, curr) => acc + curr)) {
        dispatch(addExtraTurn())
      }
    }
  }, [props.score[10]])

  // Update frameTotals on score changes
  useEffect(() => {
    updateFrameTotals();
  }, [props.score]);

  // Update cumTotals on frameTotal changes
  useEffect(() => {
    updateCumTotals();
  }, [frameTotals]);

  const updateCumTotals = () => {
    for (let [frameNo, frameTotal] of Object.entries(frameTotals)) {
      // If current frames frameTotal is undefined stop execution
      if (typeof frameTotal == "undefined") {
        return;
      }
      // If first frame => cumTotal = frameTotal
      if (frameNo == 1) {
        setCumTotals((state) => {
          return {
            ...state,
            [frameNo]: frameTotal,
          };
        });
      } else {
        setCumTotals((state) => {
          return {
            ...state,
            [frameNo]: frameTotal + state[frameNo - 1],
          };
        });
      }
    }
  };

  // Monster function to get FrameTotals. Lots of logic (TODO: refactor using utilities?)
  const updateFrameTotals = () => {
    // Iterate through frameTotals to find the earliest undefined frameTotal
    let frameNo = 1;
    while (typeof frameTotals[frameNo] != "undefined" && frameNo <= 10) {
      frameNo += 1;
    }
    const openFrameScore = props.score[frameNo][1] + props.score[frameNo][2];
    const isOpenFrame = openFrameScore < 10;
    const isStrike = props.score[frameNo][1] == 10;
    const isSpare =
      !isStrike && props.score[frameNo][1] + props.score[frameNo][2] == 10;

    // Edge case for frame 10
    if (frameNo == 10) {
      // If game is still active do nothing
      if (turn.activeGame) {
        return;
      }
      // If game is over get final frameTotal
      setFrameTotals((state) => {
        return {
          ...state,
          [frameNo]: Object.values(props.score[frameNo]).reduce((acc, curr) => {
            return acc + curr;
          }),
        };
      });
      return;
    }
    if (isOpenFrame) {
      setFrameTotals((state) => {
        return {
          ...state,
          [frameNo]: openFrameScore,
        };
      });
    } else if (isSpare) {
      // check if next bowl has been bowled
      const nextBowlDone = typeof props.score[frameNo + 1][1] != "undefined";
      if (nextBowlDone) {
        const nextBowlScore = props.score[frameNo + 1][1];
        setFrameTotals((state) => {
          return {
            ...state,
            [frameNo]: openFrameScore + nextBowlScore,
          };
        });
      }
    } else if (isStrike) {
      // check if 2 next bowls have been bowled. Harder than it should be because
      // I'm using objects instead of arrays like an idiot.
      const scoreArray = utils.flattenScoreToArray(props.score)
      const scoreFromCurrentFrame = scoreArray.slice((frameNo - 1) * 2)
      debugger
      // Get valid scores (not nulls/undefineds) of this and the next 2 frames
      const validScores = scoreArray.filter(score => typeof score != "undefined" && score != null);
      // shift current strike off array
      validScores.shift();
      const next2BowlsDone = validScores.length > 1
      if (next2BowlsDone) {
        const next2BowlScores = validScores.slice(0, 2)
        setFrameTotals((state) => {
          return {
            ...state,
            [frameNo]: openFrameScore + next2BowlScores.reduce((acc, curr) => acc + curr),
          };
        });
      }
    }
  };

  const framesJSX = [];
  for (let [frameNo, frame] of Object.entries(props.score)) {
    if (frameNo == 10) {
      break;
    }
    framesJSX.push(
      <div style={{ border: "solid", height: "100px", width: "100px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ border: "solid", borderWidth: "thin" }}>{frame[1]}</div>
          <div style={{ border: "solid", borderWidth: "thin" }}>{frame[2]}</div>
        </div>
        <div>
          <div>ft={frameTotals[frameNo]}</div>
          <div>ct={cumTotals[frameNo]}</div>
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
            <div>ft={frameTotals[10]}</div>
            <div>ct={cumTotals[10]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerScoreboard;
