import React from "react";

const Origine = ({ typeId }) => {
  return (
    <>
      <h5 className="text-gray">
        {typeId === 1
          ? "Home/UK"
          : typeId === 2
          ? "EU/EEU"
          : typeId === 3
          ? "International"
          : ""}
      </h5>
    </>
  );
};

export default Origine;
