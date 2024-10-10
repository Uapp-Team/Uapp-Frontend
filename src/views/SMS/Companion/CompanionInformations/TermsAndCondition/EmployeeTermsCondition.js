import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import Loader from "../../../Search/Loader/Loader";

const EmployeeTermsCondition = ({
  setConsData,
  consData,
  currentUserDetails,
  loading,
}) => {
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          {currentUserDetails?.details !== "<p><br></p>" &&
            currentUserDetails?.details !== "<p> </p>" &&
            currentUserDetails?.details !== "<h5><br></h5>" && (
              <div>
                {currentUserDetails?.userName && (
                  <h2 className="mb-3 ">
                    <b className="bg-u">
                      INDEX FOR UAPP{" "}
                      <span style={{ color: "#fc7300" }}>
                        {" "}
                        {currentUserDetails?.userName}
                      </span>{" "}
                      HANDBOOK
                    </b>
                  </h2>
                )}

                <div
                  dangerouslySetInnerHTML={createMarkup(
                    currentUserDetails?.details
                  )}
                ></div>
                <div className="mt-4">
                  {" "}
                  <h5>
                    SIGNATURE:{" "}
                    <span className="signature-student">
                      {consData?.data?.firstName}
                    </span>
                  </h5>
                  <h5>
                    NAME OF THE EMPLOYEE: :{" "}
                    <span style={{ fontSize: "14px" }}>
                      {consData?.data?.firstName}
                    </span>
                  </h5>
                  <h5>
                    Date:{" "}
                    <span style={{ fontSize: "14px" }}>
                      {consData?.data?.startedDate}{" "}
                    </span>
                  </h5>
                </div>
              </div>
            )}
        </>
      )}
    </>
  );
};

export default EmployeeTermsCondition;
