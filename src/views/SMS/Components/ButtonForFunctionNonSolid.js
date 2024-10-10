import React from "react";
import { Button } from "reactstrap";

const ButtonForFunctionNonSolid = ({
  className,
  icon,
  color,
  permission,
  type,
  url,
  func,
  name,
  disable,
}) => {
  // const {className, icon} = props;

  const data = [1, 2, 3, 4, 6];

  return (
    <>
      {/* {
            data.includes(permission) ?  */}
      <button
        onClick={func}
        color={color}
        type={type}
        className={className}
        disabled={disable}
      >
        {" "}
        {icon} {name}{" "}
      </button>
      {/* :
            null
          }    */}
    </>
  );
};

export default ButtonForFunctionNonSolid;
