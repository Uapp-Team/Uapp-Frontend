import React from "react";
import Pointer from "../../../../components/buttons/Pointer";

const Status = ({ statusId, className }) => {
  return (
    <>
      <span className={className}>
        {statusId === 1 ? (
          <Pointer color="#1890FF" />
        ) : statusId === 2 ? (
          <Pointer color="#52C41A" />
        ) : statusId === 3 ? (
          <Pointer color="#FF4D4F" />
        ) : (
          ""
        )}

        <span className="ml-8px">
          {statusId === 1
            ? "Pending"
            : statusId === 2
            ? "Published"
            : statusId === 3
            ? "Reject"
            : ""}
        </span>
      </span>
    </>
  );
};

export default Status;
