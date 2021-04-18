import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { removeAlert } from "../store/actions";

const selectAlert = (state) => state.alert;

const CustomAlert = (props) => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  if (alert.active) {
    return (
      <Alert variant={alert.colour}>
        <div>
          {alert.type}: {alert.message}
        </div>
        <div>
          <Button size="sm" variant="outline-light" onClick={() => dispatch(removeAlert())}>
            x
          </Button>
        </div>
      </Alert>
    );
  } else {
    return null;
  }
};

export default CustomAlert;
