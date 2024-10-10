import React from "react";
import ReactToPrint from "react-to-print";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";

const PrintFile = ({ dropdownOpen, toggle, componentRef }) => {
  return (
    <div className="mr-3">
      <Dropdown
        className="uapp-dropdown"
        style={{ float: "right" }}
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle caret>
          <i className="fas fa-print fs-7"></i>
        </DropdownToggle>
        <DropdownMenu className="bg-dd-4">
          <div className="d-flex justify-content-around align-items-center mt-2">
            <div className="cursor-pointer">
              <ReactTableConvertToXl
                id="test-table-xls-button"
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                icon={<i className="fas fa-file-excel"></i>}
              />
            </div>
            <div className="cursor-pointer">
              <ReactToPrint
                trigger={() => (
                  <p>
                    <i className="fas fa-file-pdf"></i>
                  </p>
                )}
                content={() => componentRef.current}
              />
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default PrintFile;
