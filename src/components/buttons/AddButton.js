import React from "react";

const AddButton = ({ text = "Add", action }) => {
  return (
    <>
      <button className="add-btn" onClick={action}>
        <i class="fas fa-plus"></i> {text}
      </button>
    </>
  );
};

export default AddButton;
