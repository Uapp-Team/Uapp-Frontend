import React from "react";
import CloseBtn from "../../../../components/buttons/CloseBtn";

const ApplicationList = ({ modalClose }) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Application list</h3>
        <CloseBtn action={modalClose} />
      </div>
      <div className="table-responsive"></div>
    </>
  );
};

export default ApplicationList;
