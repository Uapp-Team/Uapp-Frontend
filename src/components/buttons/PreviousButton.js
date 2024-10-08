import React from "react";

const PreviousButton = ({ action }) => {
  return (
    <>
      <button className="previous-button" onClick={action} type="button">
        Previous
      </button>
    </>
  );
};

export default PreviousButton;
