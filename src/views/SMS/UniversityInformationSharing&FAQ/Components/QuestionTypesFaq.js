import React from "react";
import { FormGroup } from "reactstrap";

const QuestionTypesFaq = ({ activetab, setActivetab }) => {
  return (
    <>
      <p>Types</p>
      <FormGroup row className="has-icon-left position-relative">
        <div
          className="btn-group w-100"
          role="group"
          aria-label="Basic example"
        >
          <span
            className={`btn p-2 mx-3 border-radius-5px fw-600 ${
              activetab === "1"
                ? "bg-white border-faq-modal text-faq-modal"
                : "bg-white"
            }`}
            onClick={() => setActivetab("1")}
          >
            Single Question
          </span>
          <span
            className={`btn p-2 mr-3 border-radius-5px fw-600 ${
              activetab === "2"
                ? "bg-white border-faq-modal text-faq-modal"
                : "bg-white"
            }`}
            onClick={() => setActivetab("2")}
          >
            Multiple Choice
          </span>
          <span
            className={`btn p-2 mr-3 border-radius-5px fw-600 ${
              activetab === "3"
                ? "bg-white border-faq-modal text-faq-modal"
                : "bg-white"
            }`}
            onClick={() => setActivetab("3")}
          >
            Single Choice
          </span>
          <span
            className={`btn p-2 mr-3 border-radius-5px  fw-600 ${
              activetab === "4"
                ? "bg-white border-faq-modal text-faq-modal"
                : "bg-white"
            }`}
            onClick={() => setActivetab("4")}
          >
            Date
          </span>
          <span
            className={`btn p-2 mr-3 border-radius-5px fw-600 ${
              activetab === "5"
                ? "bg-white border-faq-modal text-faq-modal"
                : "bg-white"
            }`}
            onClick={() => setActivetab("5")}
          >
            Date Range
          </span>
        </div>
      </FormGroup>
    </>
  );
};

export default QuestionTypesFaq;
