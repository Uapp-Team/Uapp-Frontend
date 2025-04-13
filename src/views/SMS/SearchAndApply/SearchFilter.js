import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import DefaultDropdownU from "../../../components/Dropdown/DefaultDropdownU";
import DefaultDropdown from "../../../components/Dropdown/DefaultDropdown";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification03Icon } from "@hugeicons/core-free-icons";

const SearchFilter = ({ closeModal }) => {
  return (
    <>
      <div className="right-side-modal overflowY">
        <div className="d-flex justify-content-between align-items-center mb-30px">
          <h3>Filter</h3>
          <AiOutlineClose
            size={24}
            onClick={() => {
              closeModal();
            }}
            className="pointer"
          />
        </div>
        <HugeiconsIcon icon={Notification03Icon} size={44} strokeWidth={3} />

        <p>Study Level</p>
        <DefaultDropdown
          // label={userLable}
          // setLabel={setUserLable}
          // value={userValue}
          // setValue={setUserValue}
          url="SearchFilter/EducationLevels"
        />
      </div>
    </>
  );
};

export default SearchFilter;
