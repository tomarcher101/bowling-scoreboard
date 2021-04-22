import React from "react";
import { connect, useDispatch } from "react-redux";
import { removeAlert } from "../actions/actions";
import * as utilities from "../utilities";

// Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const CustomAlert = (props) => {
  const dispatch = useDispatch();

  if (props.alert.active) {
    return (
      <Alert variant={props.alert.variant}>
        <span>
          {utilities.capitalize(props.alert.title)}: {props.alert.message}
          <Button
            size="sm"
            variant="outline-dark"
            onClick={() => dispatch(removeAlert())}
            style={{float: "right"}}
          >
            x
          </Button>
        </span>
      </Alert>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return { alert: state.alert };
};

export default connect(mapStateToProps)(CustomAlert);
