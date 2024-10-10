import React from "react";
import AccordionForFaqCategory from "./Components/AccordionForFaqCategory";
import SubCategoryListUnderCategory from "./SubCategoryListUnderCategory";

const CategoriesAndItsSubCategories = ({
  openIndex,
  toggleAccordion,
  isManageCategory,
}) => {
  return (
    <div className="mt-4 ml-4">
      <AccordionForFaqCategory
        content="University"
        isOpen={openIndex === 1}
        toggleAccordion={() => toggleAccordion(1)}
      ></AccordionForFaqCategory>
    </div>
  );
};

export default CategoriesAndItsSubCategories;
