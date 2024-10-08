import React from "react";
import ButtonLoader from "./ButtonLoader";

const SaveButton = ({ text = "Save", progress, buttonStatus, action }) => {
  return (
    <span>
      <button
        className={`${text === "Save" ? "save-button" : "saved-button"}`}
        type="submit"
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
