// Components
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const StrikeModal = (props) => {
  if (props.showStrike) {
    return (
      <Modal.Dialog onClick={props.hideStrike}>
        <Modal.Body>
          <h1>Strike!!!</h1>
          <p>Put an animation here Tom you lazy boy.</p>
          <p>Click anywhere to hide.</p>
        </Modal.Body>
      </Modal.Dialog>
    );
  } else {
    return <div></div>
  }
};

export default StrikeModal;
