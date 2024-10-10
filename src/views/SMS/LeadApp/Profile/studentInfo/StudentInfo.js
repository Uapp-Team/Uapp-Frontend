import React, { useState } from "react";
import ThemeAccordion from "../../../components/ui/ThemeAccordion";
import Personal from "./Personal";

const StudentInfo = () => {
  const [openIndex, setOpenIndex] = useState(1);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="mb-30px">
      <ThemeAccordion
        title="Personal Information"
        content={<Personal />}
        isOpen={openIndex === 1}
        toggleAccordion={() => toggleAccordion(1)}
      />
      <ThemeAccordion
        title="Contact Information"
        content={<Personal />}
        isOpen={openIndex === 2}
        toggleAccordion={() => toggleAccordion(2)}
      />
      <ThemeAccordion
        title="Application Information"
        content={<Personal />}
        isOpen={openIndex === 3}
        toggleAccordion={() => toggleAccordion(3)}
      />
    </div>
  );
};

export default StudentInfo;
