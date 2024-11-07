import React from "react";

const Tag = ({ title, label, action }) => {
  return (
    <>
      <span className="text-gray">{title}: </span>
      <span className="text-dark-green">{label} </span>
      <span className="text-dark-green pointer mr-3" onClick={() => action()}>
        X
      </span>
    </>
  );
};

export default Tag;
