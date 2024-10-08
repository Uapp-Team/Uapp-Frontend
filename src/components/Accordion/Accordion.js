import React from "react";

const Accordion = ({ title, content, isOpen, toggleAccordion }) => {
  return (
    <>
      <div
        className={`${
          isOpen ? `accordion-header-open` : `accordion-header`
        } d-flex justify-content-between`}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span>
          {isOpen ? (
            <i class="fas fa-chevron-up"></i>
          ) : (
            <i class="fas fa-chevron-down"></i>
          )}
        </span>
      </div>
      {isOpen && content}
    </>
  );
};

export default Accordion;
