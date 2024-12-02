import React from "react";

const Origine = ({ typeId }) => {
  return (
    <>
      <p className="text-gray fs-12px mb-1 fw-700">
        <i>
          {typeId === 1
            ? "For Home Students"
            : typeId === 2
            ? "For EU/UK Students"
            : typeId === 3
            ? "For International Students"
            : ""}
        </i>
      </p>
    </>
  );
};

export default Origine;
