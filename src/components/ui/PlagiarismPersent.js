import React from "react";

const PlagiarismPersent = ({ aggregatedScore }) => {
  return (
    <div className="text-center">
      <h1
        className={
          aggregatedScore < 25
            ? `text-success fw-600`
            : aggregatedScore < 50
            ? `text-warning fw-600`
            : `text-danger fw-600`
        }
      >
        {aggregatedScore}%
      </h1>
      <h3
        className={
          aggregatedScore < 25
            ? `text-success fw-600`
            : aggregatedScore < 50
            ? `text-warning fw-600`
            : `text-danger fw-600`
        }
      >
        Plagiarism
      </h3>
    </div>
  );
};

export default PlagiarismPersent;
