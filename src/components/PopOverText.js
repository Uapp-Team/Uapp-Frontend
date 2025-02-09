import React, { useEffect, useState } from "react";
// import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
import { Popover } from "react-tiny-popover";

const PopOverText = ({ value, i, btn, popoverOpen, setPopoverOpen }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
    setPopoverOpen(value);
  };

  useEffect(() => {
    popoverOpen !== value && setIsPopoverOpen(false);
  }, [popoverOpen, value]);

  useEffect(() => {
    if (isPopoverOpen) {
      const scrollableContainer = document.querySelector(".fixedhead");
      if (scrollableContainer) {
        scrollableContainer.addEventListener("scroll", function () {
          setIsPopoverOpen(false);
        });
      }
      window.addEventListener("scroll", function () {
        setIsPopoverOpen(false);
      });
    }
  }, [isPopoverOpen]);

  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        positions={[]}
        content={value === popoverOpen ? value : null}
      >
        <button type="button" className="btn-no-style" onClick={handlePopover}>
          {value ? (
            <span className={isPopoverOpen && `text-primary`}>{btn}</span>
          ) : null}
        </button>
      </Popover>
    </>
  );
};

export default PopOverText;
