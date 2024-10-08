import React from "react";
import loader from "../../../../assets/img/load.gif";

const Loader = () => {
  return (
    <div className="text-center">
      <img className="img-fluid" src={loader} alt="" />
    </div>
  );
};

export default Loader;
