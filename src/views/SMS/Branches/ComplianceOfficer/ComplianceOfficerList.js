import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";

import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import LinkButton from "../../Components/LinkButton";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Loader from "../../Search/Loader/Loader";
import ButtonLoader from "../../Components/ButtonLoader";
import ToggleSwitch from "../../Components/ToggleSwitch";
import put from "../../../../helpers/put";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const ComplianceOfficerList = () => {
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [complianceList, setComplianceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serialNum, setSerialNum] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [delData, setDelData] = useState(null);
  const [success, setSuccess] = useState(false);

  // for hide/unhide table column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkPhn, setCheckPhn] = useState(true);
  const [checkCity, setCheckCity] = useState(true);
  const [checkCountry, setCheckCountry] = useState(true);
  const [checkState, setCheckState] = useState(true);
  const [checkBranch, setCheckBranch] = useState(true);
  const [checkSts, setCheckSts] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const history = useHistory();
  const backToDashboard = () => {
    history.push("/");
  };

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`ComplianceOfficer/Index`).then((res) => {
      setComplianceList(res);
      console.log("compList", res);
      setLoading(false);
    });
  }, [success]);

  const handleUpdate = (id) => {
    history.push(`/complianceOfficerInformation/${id}`);
  };

  const handleDeleteCompOfficer = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`ComplianceOfficer/Delete/${delData}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);

      setSuccess(!success);
    });
  };

  const toggleDanger = (id) => {
    setDelData(id);
    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const componentRef = useRef();

  const redirectToProfile = (data) => {
    history.push(`/complianceOfficerProfile/${data?.id}`);
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedEmail = (e) => {
    setCheckEmail(e.target.checked);
  };
  const handleCheckedPhn = (e) => {
    setCheckPhn(e.target.checked);
  };
  const handleCheckedCity = (e) => {
    setCheckCity(e.target.checked);
  };
  const handleCheckedCountry = (e) => {
    setCheckCountry(e.target.checked);
  };
  const handleCheckedState = (e) => {
    setCheckState(e.target.checked);
  };
  const handleCheckedBranch = (e) => {
    setCheckBranch(e.target.checked);
  };
  const handleCheckedSts = (e) => {
    setCheckSts(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  const handleAccountStatus = (e, officerId) => {
    // setChecked(e.target.checked);

    const subData = {
      id: officerId,
    };

    put(`ComplianceOfficer/UpdateAccountStatus/${officerId}`, subData).then(
      (res) => {
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    );
  };

  return (
    <div>
      <BreadCrumb title="Compliance Officer List" backTo="" path="/" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card className="uapp-employee-search">
            <CardBody>
              <Row className="mb-3">
                <Col
                  lg="6"
                  md="6"
                  sm="12"
                  xs="12"
                  style={{ marginBottom: "10px" }}
                >
                  {permissions?.includes(permissionList?.Add_Employee) ? (
                    <LinkButton
                      url={"/complianceOfficerInformation"}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={"Add Compliance Officer"}
                    />
                  ) : null}
                </Col>

                <Col lg="6" md="6" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
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
                          {/* <DropdownItem> */}
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

                    {/* column hide unhide starts here */}

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
                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">SL/NO</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  id=""
                                  name="isAcceptHome"
                                  onChange={(e) => {
                                    handleCheckedSLNO(e);
                                  }}
                                  defaultChecked={checkSlNo}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Name</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedName(e);
                                  }}
                                  defaultChecked={checkName}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Email</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedEmail(e);
                                  }}
                                  defaultChecked={checkEmail}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Phone No</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedPhn(e);
                                  }}
                                  defaultChecked={checkPhn}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">City</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedCity(e);
                                  }}
                                  defaultChecked={checkCity}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Country</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedCountry(e);
                                  }}
                                  defaultChecked={checkCountry}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">State/County</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedState(e);
                                  }}
                                  defaultChecked={checkState}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Branch</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedBranch(e);
                                  }}
                                  defaultChecked={checkBranch}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Account Status</p>
                            </Col>
                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedSts(e);
                                  }}
                                  defaultChecked={checkSts}
                                />
                              </FormGroup>
                            </Col>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Col md="8" className="">
                              <p className="">Action</p>
                            </Col>

                            <Col md="4" className="text-center">
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleCheckedAction(e);
                                  }}
                                  defaultChecked={checkAction}
                                />
                              </FormGroup>
                            </Col>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide ends here */}
                  </div>
                </Col>
              </Row>

              {loading ? (
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div className="table-responsive" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="tablehead">
                      <tr style={{ textAlign: "center" }}>
                        {/* {checkSlNo ? <th>SL/NO</th> : null} */}

                        {checkName ? <th>Name</th> : null}
                        {checkEmail ? <th>Email</th> : null}
                        {checkPhn ? <th>Phone No</th> : null}
                        {checkCity ? <th>City</th> : null}
                        {checkCountry ? <th>Country</th> : null}
                        {checkState ? <th>State/County</th> : null}
                        {checkBranch ? <th>Branch</th> : null}
                        {permissions?.includes(
                          permissionList.Change_Employee_Account_Status
                        ) ? (
                          <>{checkSts ? <th>Account Status</th> : null}</>
                        ) : null}
                        {checkAction ? (
                          <th style={{ width: "8%" }} className="text-center">
                            Action
                          </th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {complianceList?.map((comp, i) => (
                        <tr key={comp?.id} style={{ textAlign: "center" }}>
                          {/* {checkSlNo ? <td>{serialNum + i}</td> : null} */}

                          {checkName ? (
                            <td>
                              {comp?.nameTittle?.name} {comp?.firstName}{" "}
                              {comp?.lastName}
                            </td>
                          ) : null}

                          {checkEmail ? <td>{comp?.email}</td> : null}

                          {checkPhn ? <td>{comp?.phoneNumber}</td> : null}

                          {checkCity ? <td>{comp?.city}</td> : null}

                          {checkCountry ? <td>{comp?.country?.name}</td> : null}
                          {checkState ? <td>{comp?.state?.name}</td> : null}
                          {checkBranch ? <td>{comp?.branch?.name}</td> : null}

                          {permissions?.includes(
                            permissionList.Change_Employee_Account_Status
                          ) ? (
                            <>
                              {checkSts ? (
                                <td>
                                  {
                                    <ToggleSwitch
                                      defaultChecked={
                                        comp?.isActive == false ? false : true
                                      }
                                      onChange={(e) => {
                                        handleAccountStatus(e, comp?.id);
                                      }}
                                    />
                                  }
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {checkAction ? (
                            <td style={{ width: "8%" }} className="text-center">
                              <ButtonGroup variant="text">
                                {permissions?.includes(
                                  permissionList?.View_Employee_Details
                                ) ? (
                                  <ButtonForFunction
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    func={() => redirectToProfile(comp)}
                                    icon={<i className="fas fa-eye"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {permissions?.includes(
                                  permissionList.Update_Employee
                                ) ? (
                                  <>
                                    <ButtonForFunction
                                      color={"warning"}
                                      className={"mx-1 btn-sm"}
                                      func={() => handleUpdate(comp?.id)}
                                      icon={<i className="fas fa-edit"></i>}
                                      permission={6}
                                    />
                                  </>
                                ) : null}

                                {permissions?.includes(
                                  permissionList?.Delete_Employee
                                ) ? (
                                  <>
                                    {comp?.email !== "info@smsheg.co.uk" ? (
                                      <ButtonForFunction
                                        color={"danger"}
                                        func={() => toggleDanger(comp?.id)}
                                        className={"mx-1 btn-sm"}
                                        icon={
                                          <i className="fas fa-trash-alt"></i>
                                        }
                                        permission={6}
                                      />
                                    ) : null}
                                  </>
                                ) : null}
                              </ButtonGroup>
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
              <div className="d-flex justify-content-end mt-3">
                <h5>Total Results Found: {complianceList.length}</h5>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      <ConfirmModal
        text="Do You Want To Delete This Compliance Officer? Once Deleted it can't be Undone "
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        cancel={closeDeleteModal}
        buttonStatus={buttonStatus}
        progress={progress}
        confirm={handleDeleteCompOfficer}
      />
    </div>
  );
};

export default ComplianceOfficerList;
