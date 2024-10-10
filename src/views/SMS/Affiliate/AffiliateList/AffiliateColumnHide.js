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

const AffiliateColumnHide = ({
  dropdownOpen1,
  toggle1,
  tableData,
  setTableData,
  handleChecked,
}) => {
  console.log(tableData, "affiliateTableDate");

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    const tableColumnAffiliate = JSON.parse(
      localStorage.getItem("ColumnAffiliate")
    );
    tableColumnAffiliate && setTableData(tableColumnAffiliate);
    !tableColumnAffiliate &&
      localStorage.setItem("ColumnAffiliate", JSON.stringify(ColumnAffiliate));
    !tableColumnAffiliate && setTableData(ColumnAffiliate);
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

export default AffiliateColumnHide;
