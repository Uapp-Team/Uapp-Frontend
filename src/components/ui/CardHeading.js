import React from "react";

const CardHeading = ({ Icon, text }) => {
  return (
    <div className="d-flex align-items-center section-title fw-600 mb-16px teal-500">
      {Icon && <Icon size={18} className="mr-2" />}
      <span className="fs-16px">{text}</span>
    </div>
  );
};

export default CardHeading;
