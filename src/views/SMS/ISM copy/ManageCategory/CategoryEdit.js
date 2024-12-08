import React from "react";
import CategoryForm from "./CategoryForm";
import put from "../../../../helpers/put";

const CategoryEdit = ({
  categoryId,
  data,
  submitPath,
  deletePath,
  refetch,
  isOpen,
  toggleAccordion,
}) => {
  return (
    <>
      <CategoryForm
        categoryId={categoryId}
        method={put}
        submitPath={submitPath}
        defaultData={data}
        deletePath={deletePath}
        refetch={() => refetch()}
        isOpen={isOpen}
        toggleAccordion={toggleAccordion}
      />
    </>
  );
};

export default CategoryEdit;
