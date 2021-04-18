import React, {useState} from "react";
import { connect } from "react-redux";

const container = {
  margin: "auto",
}
// const 

const PlayerScoreboard = (props) => {
  const [framesObj, setFrameObj] = useState({
    1: {1: undefined, 2: undefined, frameTotal: undefined, cumTotal: 0},
    2: {1: undefined, 2: undefined, frameTotal: undefined, cumTotal: 0},
    3: {1: undefined, 2: undefined, frameTotal: undefined, cumTotal: 0},
    4: {1: undefined, 2: undefined, frameTotal: undefined, cumTotal: 0},
    5: {1: undefined, 2: undefined, frameTotal: undefined, cumTotal: 0},
    6: {1: undefined, 2: undefined, frameTotal: undefined, cumTotal: 0},
    7: {1: undefined, 2: undefined, frameTotal: undefined, cumTotal: 0},
    8: {1: undefined, 2: undefined, frameTotal: undefined, cumTotal: 0},
    9: {1: undefined, 2: undefined, frameTotal: undefined, cumTotal: 0},
  })

  const framesJSX = []
  for (let [frameNo, frame] of Object.entries(framesObj)) {
    framesJSX.push(
      <div style={{border: "solid", height: "100px", width: "100px"}}>
        {/* <div>{frameNo}</div> */}
        <div style={{display: "flex"}}>
          <div style={{border: "solid", borderWidth: "thin"}}>b1={frame[1]}</div>
          <div style={{border: "solid", borderWidth: "thin"}}>b2={frame[2]}</div>
        </div >
        <div>
          <div>ft={frame[3]}</div>
          <div>ct={frame[4]}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={container}>
      <div style={{display: "flex", margin: "auto", justifyContent: "center"}}>
        {framesJSX}
      </div>
    </div>
  )
}
  
export default PlayerScoreboard;
