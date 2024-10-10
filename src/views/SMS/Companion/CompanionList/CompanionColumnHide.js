import React, { useEffect } from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
} from "reactstrap";

import ColumnAffiliate from "../../TableColumn/ColumnAffiliate";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ColumnCompanions from "../../TableColumn/ColumnCompanions";

const CompanionColumnHide = ({
  dropdownOpen1,
  toggle1,
  tableData,
  setTableData,
  handleChecked,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    const tableColumnCompanions = JSON.parse(
      localStorage.getItem("ColumnCompanions")
    );
    tableColumnCompanions && setTableData(tableColumnCompanions);
    !tableColumnCompanions &&
      localStorage.setItem(
        "ColumnCompanions",
        JSON.stringify(ColumnCompanions)
      );
    !tableColumnCompanions && setTableData(ColumnCompanions);
  }, [setTableData]);

  return (
    <div className="d-block">
      {/* column hide unhide starts here */}
      <Dropdown
        className=""
        style={{ float: "right" }}
        isOpen={dropdownOpen1}
        toggle={toggle1}
      >
        <DropdownToggle caret>
          <i className="fas fa-bars"></i>
        </DropdownToggle>
        <DropdownMenu className="bg-dd-1">
          {tableData.map((table, i) => (
            <div key={i}>
              <div className="d-flex justify-content-between">
                <Col md="8" className="">
                  <p className="">{table?.title}</p>
                </Col>

                <Col md="4" className="text-center">
                  <FormGroup check inline>
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id=""
                      name="check"
                      onChange={(e) => {
                        handleChecked(e, i);
                      }}
                      defaultChecked={table?.isActive}
                    />
                  </FormGroup>
                </Col>
              </div>
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
      {/* column hide unhide ends here */}
    </div>
  );
};

export default CompanionColumnHide;
