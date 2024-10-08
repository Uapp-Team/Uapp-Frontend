import React from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
} from "reactstrap";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ConsultantColumnHide = ({
  dropdownOpen1,
  toggle1,
  tableData,
  handleChecked,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
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
              {i === 5 ? (
                <>
                  {permissions?.includes(
                    permissionList.Consultant_Password_Change
                  ) && (
                    <div className="d-flex justify-content-between">
                      <Col md="8" className="">
                        <p className="">{table?.collumnName}</p>
                      </Col>

                      <Col md="4" className="text-center">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id=""
                            name="check"
                            onChange={(e) => {
                              handleChecked(e, table?.id);
                            }}
                            defaultChecked={table?.isActive}
                          />
                        </FormGroup>
                      </Col>
                    </div>
                  )}
                </>
              ) : i === 13 ? (
                <>
                  {permissions?.includes(
                    permissionList.Change_Consultant_AccountStatus
                  ) && (
                    <div className="d-flex justify-content-between">
                      <Col md="8" className="">
                        <p className="">{table?.collumnName}</p>
                      </Col>

                      <Col md="4" className="text-center">
                        <FormGroup check inline>
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id=""
                            name="check"
                            onChange={(e) => {
                              handleChecked(e, table?.id);
                            }}
                            defaultChecked={table?.isActive}
                          />
                        </FormGroup>
                      </Col>
                    </div>
                  )}
                </>
              ) : (
                <div className="d-flex justify-content-between">
                  <Col md="8" className="">
                    <p className="">{table?.collumnName}</p>
                  </Col>

                  <Col md="4" className="text-center">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id=""
                        name="check"
                        onChange={(e) => {
                          handleChecked(e, table?.id);
                        }}
                        defaultChecked={table?.isActive}
                      />
                    </FormGroup>
                  </Col>
                </div>
              )}
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
      {/* column hide unhide ends here */}
    </div>
  );
};

export default ConsultantColumnHide;
