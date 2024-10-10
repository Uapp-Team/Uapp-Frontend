import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import logoLg from "../../../../../assets/img/Logo.svg";
import copyleaks from "../../../../../assets/img/copyleaks.svg";
import get from "../../../../../helpers/get";

const PlagiarismResultPdf = ({ studentId, result, stringData }) => {
  const componentRef = useRef();
  const [studentDetails, setStudentDetails] = useState();

  useEffect(() => {
    get(`Student/Get/${studentId}`).then((res) => {
      setStudentDetails(res);
    });
  }, [studentId]);

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-border-blue mx-2">
            <i class="fas fa-print"></i> Print
          </button>
        )}
        content={() => componentRef.current}
      />

      <div
        className="d-none d-print-block"
        ref={componentRef}
        style={{
          padding: `0 100px 0`,
        }}
      >
        <div className="d-flex justify-content-between">
          <img height={70} src={logoLg} alt="" />

          <h1> Plagiarism Result </h1>
        </div>

        <div
          className="d-flex justify-content-between"
          style={{
            marginTop: `50px`,
          }}
        >
          <div>
            <h4>Student ID : {studentDetails?.studentViewId}</h4>
            <h4>
              Student Name : {studentDetails?.firstName}{" "}
              {studentDetails?.lastName}
            </h4>
            <h4>Mobile Number : {studentDetails?.phoneNumber}</h4>
            <h4>Email : {studentDetails?.email}</h4>
          </div>

          <div>
            <h3
              className={
                result?.score?.aggregatedScore < 25
                  ? `text-success fw-600`
                  : result?.score?.aggregatedScore < 50
                  ? `text-warning fw-600`
                  : `text-danger fw-600`
              }
            >
              Plagiarism: {result?.score?.aggregatedScore}%
            </h3>
            <h4>Identical Words: {result?.score?.identicalWords}</h4>
            <h4>Related Words: {result?.score?.relatedMeaningWords}</h4>
            <h4>Minor Words: {result?.score?.minorChangedWords}</h4>
          </div>
        </div>
        <div className="custom-card-border p-4">
          <h2>
            <b>Internet Results</b>
          </h2>
          {result?.internet.length > 0 ? (
            result?.internet?.map((item, i) => (
              <div key={i}>
                <h3>
                  <b>
                    {i + 1}. {item.title}
                  </b>
                </h3>
                <h4>
                  <a href={item.url} target="blank">
                    {item.url}
                  </a>
                </h4>
                <div className="d-flex justify-content-between">
                  <h4>Similar Words: {item?.similarWords}</h4>
                  <h4>Identical Words: {item?.identicalWords}</h4>
                  <h4>
                    Plagiarism:{" "}
                    {((item?.identicalWords / stringData) * 100).toFixed(2)}%
                  </h4>
                </div>
              </div>
            ))
          ) : (
            <h4 className="text-center">
              Nothing matches found on the internet
            </h4>
          )}
        </div>
        <h4 className="d-flex justify-content-end align-items-center">
          Powered BY{"  "}
          <a href="https://copyleaks.com/">
            <img height={40} src={copyleaks} alt="" />
          </a>
        </h4>
      </div>
    </>
  );
};

export default PlagiarismResultPdf;
