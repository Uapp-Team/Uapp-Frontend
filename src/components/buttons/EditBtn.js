import React from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";

const EditBtn = ({ data, path, action }) => {
  const history = useHistory();

  const handleEdit = () => {
    data && path && history.push(path, { state: data });
    !data && path && history.push(path);
    action && action();
  };

  return (
    <>
      <span className="pointer gray-500 ml-4px" onClick={handleEdit}>
        <AiOutlineEdit size={20} />
      </span>
    </>
  );
};

export default EditBtn;
