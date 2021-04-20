import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { submitFinalScore } from "../actions/actions";
import * as utils from "../utilities";
import Frame from "./Frame";

const container = {
  margin: "auto",
};

const PlayerScoreboard = (props) => {
  const dispatch = useDispatch();

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

  // Update frameTotals
  useEffect(() => {
    updateFrameTotals();
  }, [props.score]);

  // Update cumTotals
  useEffect(() => {
    updateCumTotals();
  }, [frameTotals]);

  // Submit Final Score
  useEffect(() => {
    dispatch(submitFinalScore(props.playerName, cumTotals[10]));
  }, [cumTotals[10]]);

  const updateCumTotals = () => {
    for (let [frameNo, frameTotal] of Object.entries(frameTotals)) {
      // If current frame's frameTotal is undefined stop execution
      if (typeof frameTotal == "undefined") {
        return;
      }
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
    for (let frameNo of Object.keys(frameTotals)) {
      frameNo = Number(frameNo)
      const openFrameScore = props.score[frameNo][1] + props.score[frameNo][2];
      const isOpenFrame = openFrameScore < 10;
      const isStrike = props.score[frameNo][1] == 10;
      const isSpare =
        !isStrike && props.score[frameNo][1] + props.score[frameNo][2] == 10;

      // Frame 10 edge case only fill when player finished
      if (frameNo == 10) {
        if (!props.turn.activePlayers.includes(props.playerName)) {
          setFrameTotals((state) => {
            return {
              ...state,
              [frameNo]: Object.values(props.score[frameNo]).reduce(
                (acc, curr) => {
                  return acc + curr;
                }
              ),
            };
          });
        }
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
        const scoreArray = utils.flattenScoreToArray(props.score);
        const scoreFromCurrentFrame = scoreArray.slice((frameNo - 1) * 2);
        // Get valid scores (not nulls/undefineds) of this and the next 2 frames
        const validScores = scoreFromCurrentFrame.filter(
          (score) => typeof score != "undefined" && score != null
        );
        // shift current strike off array
        validScores.shift();
        const next2BowlsDone = validScores.length > 1;
        if (next2BowlsDone) {
          const next2BowlScores = validScores.slice(0, 2);
          setFrameTotals((state) => {
            return {
              ...state,
              [frameNo]:
                openFrameScore +
                next2BowlScores.reduce((acc, curr) => acc + curr),
            };
          });
        }
      }
    }
  };

  const framesJSX = [];
  for (let [frameNo, frame] of Object.entries(props.score)) {
    framesJSX.push(
      <div key={`frame${frameNo}`}>
        <div style={{borderColor: props.colour}}>
          <Frame
            frameNo={frameNo}
            frame={frame}
            frameTotal={frameTotals[frameNo]}
            cumTotal={cumTotals[frameNo]}
          />
        </div>
        <div>
          <h5 >{frameNo}</h5>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div
        style={{ display: "flex", margin: "auto", justifyContent: "center" }}
      >
        {framesJSX}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { turn: state.turn };
};

export default connect(mapStateToProps)(PlayerScoreboard);
