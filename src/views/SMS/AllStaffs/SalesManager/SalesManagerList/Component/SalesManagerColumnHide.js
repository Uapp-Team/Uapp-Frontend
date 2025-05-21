import React from "react";
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
} from "reactstrap";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const SalesManagerColumnHide = ({
  dropdownOpen1,
  toggle1,
  tableData,
  setTableData,
  handleChecked,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <div className="">
      <Dropdown
        className="uapp-dropdown"
        style={{ float: "right" }}
        isOpen={dropdownOpen1}
        toggle={toggle1}
      >
        <DropdownToggle caret>
          <i className="fas fa-bars"></i>
        </DropdownToggle>
        <DropdownMenu className="bg-dd-1">
          {tableData?.map((table, i) => (
            <div key={i}>
              {i === 2 ? (
                <>
                  {permissions?.includes(
                    permissionList.Staff_Password_Change
                  ) && (
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
                  )}
                </>
              ) : (
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
                        name="isAcceptHome"
                        onChange={(e) => {
                          handleChecked(e, i);
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
    </div>
  );
};

export default SalesManagerColumnHide;
