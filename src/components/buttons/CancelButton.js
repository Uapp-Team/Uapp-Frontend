import React from "react";

const CancelButton = ({ text = "Cancel", cancel }) => {
  return (
    <>
      <button className="cancel-button" onClick={cancel} type="reset">
        {text}
      </button>
    </>
  );
};

export default CancelButton;
