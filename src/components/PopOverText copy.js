import React, { useState } from "react";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

const PopOverText = ({ value, i, btn }) => {
  console.log(value);
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      <Popover
        placement="top"
        isOpen={popoverOpen}
        target={`popover${i}`}
        toggle={() => {
          setPopoverOpen(!popoverOpen);
        }}
      >
        <PopoverBody> {value} </PopoverBody>
      </Popover>
      {/* {value ? (
        <>
          <button className="btn-no-style" id={`popover${i}`}>
            {btn ? btn : null}
          </button>
        </>
      ) : null} */}
      <button className="btn-no-style" id={`popover${i}`}>
        {value ? btn : null}
      </button>
    </>
  );
};

export default PopOverText;
