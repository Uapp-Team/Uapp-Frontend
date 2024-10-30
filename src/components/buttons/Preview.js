import React from "react";
import ButtonForFunction from "../../views/SMS/Components/ButtonForFunction";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Preview = ({ url }) => {
  return (
    <>
      <Link to={url}>
        <ButtonForFunction
          icon={<i class="far fa-eye"></i>}
          color={"primary"}
          className={"m-1 btn-sm"}
          func={() => {}}
        />
      </Link>
    </>
  );
};

export default Preview;
