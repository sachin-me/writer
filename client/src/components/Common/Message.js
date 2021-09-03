import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ message, error }) => {
  return (
    (message || error) && (
      <div className="mt-3">
        <Alert variant={message ? "success" : "danger"}>
          {message || error}
        </Alert>
      </div>
    )
  );
};

export default Message;