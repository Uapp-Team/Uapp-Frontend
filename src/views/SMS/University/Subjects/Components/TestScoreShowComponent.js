import React from "react";
import icon_info from "../../../../../assets/img/icons/icon_info.png";

const TestScoreShowComponent = ({ setShowForm, showForm, testScore, name }) => {
  return (
    <div className="mb-3">
      {testScore?.isIELTSMandatory ? (
        <>
          <img src={icon_info} alt="" />{" "}
          <span
            className="pl-3"
            style={{ fontWeight: "500", fontSize: "16px" }}
          >
            IELTS is Mandatory
          </span>
          <br />
          <span className="pl-5">IELTS Score: {testScore?.ieltSscore}</span>
          <br />
        </>
      ) : (
        <>
          <span className="pl-5">
            IELTS Equivalent Score: {testScore?.ieltSscore}
          </span>
          <br />
        </>
      )}
      {testScore?.isGreMandatory ? (
        <>
          <img src={icon_info} alt="" />{" "}
          <span
            className="pl-3"
            style={{ fontWeight: "500", fontSize: "16px" }}
          >
            GRE is required
          </span>
          <br />
          <span className="pl-5">GRE Score: {testScore?.greScore}</span>
          <br />
        </>
      ) : (
        <>
          <span className="pl-5">GRE Score: {testScore?.greScore}</span>
          <br />
        </>
      )}
      {testScore?.isGmatMandatory ? (
        <>
          <img src={icon_info} alt="" />{" "}
          <span
            className="pl-3"
            style={{ fontWeight: "500", fontSize: "16px" }}
          >
            GMAT is required
          </span>
          <br />
          <span className="pl-5">GMAT Score: {testScore?.gmatScore}</span>
        </>
      ) : (
        <>
          <span className="pl-5">GMAT Score: {testScore?.gmatScore}</span>
        </>
      )}
    </div>
  );
};

export default TestScoreShowComponent;
