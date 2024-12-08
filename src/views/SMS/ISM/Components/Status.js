import React from "react";
import Pointer from "../../../../components/buttons/Pointer";

const Status = ({ statusId, className }) => {
  return (
    <>
      <span className={className}>
        {statusId === 1 ? (
          <Pointer color="#fff" />
        ) : statusId === 2 ? (
          <Pointer color="#D9D9D9" />
        ) : statusId === 3 ? (
          <Pointer color="#1890FF" />
        ) : statusId === 4 ? (
          <Pointer color="#52C41A" />
        ) : statusId === 5 ? (
          <Pointer color="#FF4D4F" />
        ) : (
          ""
        )}

        <span className="ml-8px">
          {statusId === 1
            ? "Not Answered"
            : statusId === 2
            ? "Draft"
            : statusId === 3
            ? "Pending"
            : statusId === 4
            ? "Published"
            : statusId === 5
            ? "Reject"
            : ""}
        </span>
      </span>
    </>
  );
};

export default Status;
