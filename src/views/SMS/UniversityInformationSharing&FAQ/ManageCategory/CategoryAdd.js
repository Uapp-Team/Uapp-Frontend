import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import post from "../../../../helpers/post";

const CategoryAdd = ({ categoryId = 0, submitPath, refetch }) => {
  const [add, setAdd] = useState(true);

  const defaultData = {
    id: 0,
    name: "",
  };

  return (
    <>
      <CategoryForm
        categoryId={categoryId}
        add={add}
        setAdd={setAdd}
        method={post}
        submitPath={submitPath}
        defaultData={defaultData}
        refetch={refetch}
      />
    </>
  );
};

export default CategoryAdd;
