import React from "react";
import ButtonLoader from "./ButtonLoader";

const SaveButton = ({
  text = "Save",
  type = "submit",
  progress,
  buttonStatus,
  action,
}) => {
  return (
    <span>
      <button
        className={`${text === "Save" ? "save-button" : "saved-button"}`}
        type={type}
        onClick={action}
        disabled={buttonStatus === true ? true : false}
      >
        {text}
      </button>
      {progress ? (
        <span>
          <ButtonLoader />
        </span>
      ) : (
        <></>
      )}
    </span>
  );
};

export default SaveButton;
