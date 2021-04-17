import React from 'react'

const LiveGame = (props) => {
  return (
    <div>
      <h1>Play ball!</h1>
      {JSON.stringify(props.players)}
    </div>
  )
}

export default LiveGame
