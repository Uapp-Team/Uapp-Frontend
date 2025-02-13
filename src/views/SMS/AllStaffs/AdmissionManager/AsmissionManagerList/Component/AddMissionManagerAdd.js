import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  Row,
  FormGroup,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Input,
  ButtonGroup,
} from "reactstrap";
import ReactToPrint from "react-to-print";
import ReactTableConvertToXl from "../../../../ReactTableConvertToXl/ReactTableConvertToXl";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import Select from "react-select";
import Pagination from "../../../../Pagination/Pagination";
import ToggleSwitch from "../../../../Components/ToggleSwitch";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import PopOverText from "../../../../../../components/PopOverText";
import { useHistory } from "react-router-dom";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import put from "../../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Loader from "../../../../Search/Loader/Loader";

const AddMissionManagerAdd = ({
  permissions,
  permissionList,
  redirectToAddAdmissionmanager,
  userTypes,
  progress,
  buttonStatus1,
  dataSizeName,
  dataPerPage,
  selectDataSize,
  dropdownOpen,
  toggle,
  componentRef,
  dropdownOpen1,
  toggle1,
  tableData,
  handleChecked,
  loading,
  managerList,
  redirectToAssignPage,
  redirectToSub,
  redirectToAdmissionOfficerList,
  handleAccountStatus,
  handleViewAdmissionManager,
  updateAdmissionManager,
  toggleDelete,
  deleteModal,
  closeDeleteModal,
  handleDelete,
  entity,
  paginate,
  currentPage,
}) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [popoverOpen, setPopoverOpen] = useState("");
  const userTypeId = localStorage.getItem("userType");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [passData, setPassData] = useState({});
  const [passModal, setPassModal] = useState(false);
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [resetButtonStatus, setResetButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  const passValidate = (e) => {
    setPass(e.target.value);
    if (e.target.value === "") {
      setError("Provide a valid password");
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(e.target.value)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
    } else {
      setError("");
    }
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
    if (e.target.value === "") {
      setPassError("Confirm your password");
    } else {
      setPassError("");
    }
    if (pass && e.target.value !== pass) {
      setPassError("Passwords doesn't match.");
    } else {
      setPassError("");
    }
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("id", passData?.id);
    subData.append("password", pass);
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(pass)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
    } else if (pass !== cPass) {
      setPassError("Passwords do not match");
    } else {
      setResetButtonStatus(true);
      put(`Password/ChangePasswordForAdmissionManager`, subData).then((res) => {
        setResetButtonStatus(false);
        if (res?.status === 200 && res.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setPassData({});
          setPassModal(false);
          setPass("");
          setCPass("");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setSuccess(!success);
        }
      });
    }
  };

  return (
    <div>
      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              {permissions?.includes(permissionList.Add_AdmissionManager) ? (
                <ButtonForFunction
                  func={redirectToAddAdmissionmanager}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Admission Manager"}
                  permission={6}
                />
              ) : null}
            </Col>

            <Col lg="7" md="7" sm="12" xs="12" className="mt-md-0 mt-sm-3">
              <div className="d-flex justify-content-md-end justify-content-sm-start">
                <div className="mr-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Showing :</div>
                    <div className="ddzindex">
                      <Select
                        options={dataSizeName}
                        value={{ label: dataPerPage, value: dataPerPage }}
                        onChange={(opt) => selectDataSize(opt.value)}
                      />
                    </div>
                  </div>
                </div>

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
                            </>
                          ) : i === 5 ? (
                            <>
                              {permissions?.includes(
                                permissionList.AdmissionManager_Assign_University
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
                            </>
                          ) : i === 6 ? (
                            <>
                              {permissions?.includes(
                                permissionList?.AdmissionManager_Assign_Subject
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
                                        name="isAcceptHome"
                                        onChange={(e) => {
                                          handleChecked(e, i);
                                        }}
                                        defaultChecked={table?.isActive}
                                      />
                                    </FormGroup>
                                  </Col>
                                </div>
                              )}{" "}
                            </>
                          ) : i === 7 ? (
                            <>
                              {permissions?.includes(
                                permissionList?.AdmissionManager_Assign_AdmissionOfficer
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
                                        name="isAcceptHome"
                                        onChange={(e) => {
                                          handleChecked(e, i);
                                        }}
                                        defaultChecked={table?.isActive}
                                      />
                                    </FormGroup>
                                  </Col>
                                </div>
                              )}{" "}
                            </>
                          ) : i === 10 ? (
                            <>
                              {permissions?.includes(
                                permissionList?.AdmissionManager_Account_Status
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
                                        name="isAcceptHome"
                                        onChange={(e) => {
                                          handleChecked(e, i);
                                        }}
                                        defaultChecked={table?.isActive}
                                      />
                                    </FormGroup>
                                  </Col>
                                </div>
                              )}{" "}
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

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>
          {permissions?.includes(permissionList?.View_AdmissionManager_list) ? (
            <>
              {loading ? (
                <Loader />
              ) : managerList?.length === 0 ? (
                <h3 className="text-center">No Data Found</h3>
              ) : (
                <div className="table-responsive fixedhead" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="tablehead">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>UAPP ID</th> : null}
                        {tableData[1]?.isActive ? <th>Full Name</th> : null}
                        {permissions?.includes(
                          permissionList.Staff_Password_Change
                        ) ? (
                          <>
                            {userTypeId === userTypes?.SystemAdmin ||
                            userTypeId === userTypes?.ProviderAdmin ||
                            userTypeId === userTypes?.Admin ? (
                              <>
                                {tableData[2]?.isActive ? (
                                  <th>Password</th>
                                ) : null}
                              </>
                            ) : null}
                          </>
                        ) : null}
                        {tableData[3]?.isActive ? <th>Provider</th> : null}
                        {tableData[4]?.isActive ? <th>Contact</th> : null}

                        {permissions?.includes(
                          permissionList?.AdmissionManager_Assign_University
                        ) ? (
                          <>
                            {tableData[5]?.isActive ? (
                              <th>Assigned University</th>
                            ) : null}
                          </>
                        ) : null}
                        {permissions?.includes(
                          permissionList?.AdmissionManager_Assign_Subject
                        ) ? (
                          <>
                            {tableData[6]?.isActive ? (
                              <th>Assigned Courses</th>
                            ) : null}
                          </>
                        ) : null}

                        {permissions?.includes(
                          permissionList?.AdmissionManager_Assign_AdmissionOfficer
                        ) ? (
                          <>
                            {" "}
                            {tableData[7]?.isActive ? (
                              <th>Admission Officers</th>
                            ) : null}
                          </>
                        ) : null}

                        {tableData[8]?.isActive ? (
                          <th>Registered Student</th>
                        ) : null}

                        {tableData[9]?.isActive ? <th>Applications</th> : null}
                        {tableData[10]?.isActive ? <th>Branch</th> : null}

                        {permissions?.includes(
                          permissionList?.AdmissionManager_Account_Status
                        ) ? (
                          <>
                            {tableData[11]?.isActive ? (
                              <th>Account Status</th>
                            ) : null}
                          </>
                        ) : null}
                        {tableData[12]?.isActive ? (
                          <th style={{ width: "8%" }} className="text-center">
                            Action
                          </th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {managerList?.map((manager, i) => (
                        <tr key={manager.id} style={{ textAlign: "center" }}>
                          {tableData[0]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              {" "}
                              <span
                                onClick={() => {
                                  handleViewAdmissionManager(
                                    manager?.id,
                                    manager?.provider?.id
                                  );
                                }}
                              >
                                {manager?.sequenceId}
                              </span>
                            </td>
                          ) : null}

                          {tableData[1]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <span
                                onClick={() => {
                                  handleViewAdmissionManager(
                                    manager?.id,
                                    manager?.provider?.id
                                  );
                                }}
                              >
                                {" "}
                                {manager?.nameTittle?.name} {manager?.firstName}{" "}
                                {manager?.lastName}
                              </span>
                            </td>
                          ) : null}

                          {permissions?.includes(
                            permissionList.Staff_Password_Change
                          ) ? (
                            <>
                              {userTypeId === userTypes?.SystemAdmin ||
                              userTypeId === userTypes?.ProviderAdmin ||
                              userTypeId === userTypes?.Admin ? (
                                <>
                                  {tableData[2]?.isActive ? (
                                    <td>
                                      <Link onClick={() => handlePass(manager)}>
                                        Change
                                      </Link>
                                    </td>
                                  ) : null}
                                </>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[3]?.isActive ? (
                            <td>{manager?.provider?.name}</td>
                          ) : null}

                          {tableData[4]?.isActive ? (
                            <td>
                              <div className=" d-flex">
                                <PopOverText
                                  value={
                                    manager?.phoneNumber &&
                                    manager?.phoneNumber.includes("+")
                                      ? manager?.phoneNumber
                                      : manager?.phoneNumber &&
                                        !manager?.phoneNumber.includes("+")
                                      ? "+" + manager?.phoneNumber
                                      : null
                                  }
                                  btn={<i class="fas fa-phone"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                                <PopOverText
                                  value={manager?.email}
                                  btn={<i className="far fa-envelope"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                              </div>
                            </td>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.AdmissionManager_Assign_University
                          ) ? (
                            <>
                              {tableData[5]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() =>
                                        redirectToAssignPage(
                                          manager?.provider?.id,
                                          manager?.id
                                        )
                                      }
                                      className="Count-fifth"
                                    >
                                      View
                                    </span>
                                  </div>
                                </td>
                              ) : null}
                            </>
                          ) : null}
                          {permissions?.includes(
                            permissionList?.AdmissionManager_Assign_Subject
                          ) ? (
                            <>
                              {tableData[6]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() => redirectToSub(manager?.id)}
                                      className="Count-fourth"
                                    >
                                      View
                                    </span>
                                  </div>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.AdmissionManager_Assign_AdmissionOfficer
                          ) ? (
                            <>
                              {tableData[7]?.isActive ? (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      onClick={() =>
                                        redirectToAdmissionOfficerList(
                                          manager?.providerId,
                                          manager?.id
                                        )
                                      }
                                      className="Count-first"
                                    >
                                      {manager?.totalOfficers}
                                    </span>
                                  </div>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[8]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span
                                  onClick={() => {
                                    history.push(
                                      `/admission-manager-applications/${2}/${3}/${
                                        manager?.id
                                      }`
                                    );
                                  }}
                                  className="Count-second"
                                >
                                  {manager?.registeredApplication}
                                </span>
                              </div>
                            </td>
                          ) : null}

                          {/* Applications starts here */}
                          {tableData[9]?.isActive ? (
                            <td>
                              <div style={{ marginTop: "5px" }}>
                                <span
                                  onClick={() => {
                                    history.push(
                                      `/ApplicationListByAdmissionmanager/${manager?.id}`
                                    );
                                  }}
                                  className="Count-third"
                                >
                                  {manager?.totalApplication}
                                </span>
                              </div>
                            </td>
                          ) : null}
                          {/* Applications ends here */}

                          {tableData[10]?.isActive ? (
                            <td>{manager?.branchName}</td>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.AdmissionManager_Account_Status
                          ) ? (
                            <>
                              {tableData[11]?.isActive ? (
                                <td>
                                  {
                                    <ToggleSwitch
                                      defaultChecked={
                                        manager?.isActive === false
                                          ? false
                                          : true
                                      }
                                      onChange={(e) => {
                                        handleAccountStatus(e, manager?.id);
                                      }}
                                    />
                                  }
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[12]?.isActive ? (
                            <td style={{ width: "8%" }} className="text-center">
                              <ButtonGroup variant="text">
                                {permissions?.includes(
                                  permissionList.View_AdmissionManager_Details
                                ) ? (
                                  <ButtonForFunction
                                    func={() =>
                                      handleViewAdmissionManager(
                                        manager?.id,
                                        manager?.provider?.id
                                      )
                                    }
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-eye"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {manager?.email ===
                                "admissionmanager@uapp.uk" ? null : (
                                  <>
                                    {permissions?.includes(
                                      permissionList?.Update_AdmissionManager
                                    ) ? (
                                      <ButtonForFunction
                                        func={() =>
                                          updateAdmissionManager(
                                            manager?.id,
                                            manager?.provider?.id
                                          )
                                        }
                                        color={"warning"}
                                        className={"mx-1 btn-sm"}
                                        icon={<i className="fas fa-edit"></i>}
                                        permission={6}
                                      />
                                    ) : null}

                                    {permissions?.includes(
                                      permissionList?.Delete_AdmissionManager
                                    ) ? (
                                      <ButtonForFunction
                                        func={() => toggleDelete(manager)}
                                        color={"danger"}
                                        className={"mx-1 btn-sm"}
                                        icon={
                                          <i className="fas fa-trash-alt"></i>
                                        }
                                        permission={6}
                                      />
                                    ) : null}
                                  </>
                                )}
                              </ButtonGroup>
                            </td>
                          ) : null}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </>
          ) : null}

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>

      <Modal
        isOpen={passModal}
        toggle={() => handleToggle}
        className="uapp-modal2"
      >
        <ModalBody className="p-5">
          <h5>
            Change password for {passData?.nameTittle?.name}{" "}
            {passData?.firstName} {passData?.lastName}
          </h5>
          <form onSubmit={submitModalForm} className="mt-3">
            <FormGroup row>
              <Col md="8">
                <span>
                  <span className="text-danger">*</span> Password{" "}
                </span>

                <Input
                  type="password"
                  onChange={(e) => {
                    passValidate(e);
                  }}
                />
                <span className="text-danger">{error}</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="8">
                <span>
                  <span className="text-danger">*</span> Confirm Password{" "}
                </span>

                <Input
                  type="password"
                  onChange={(e) => {
                    confirmPassword(e);
                  }}
                />

                <span className="text-danger">{passError}</span>
              </Col>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between mt-3">
              <CancelButton cancel={() => handleToggle(false)} />

              <SaveButton
                text="Submit"
                progress={progress}
                buttonStatus={resetButtonStatus}
              />
            </FormGroup>
          </form>
        </ModalBody>
      </Modal>
      <ConfirmModal
        text="Do You Want To Delete This Admission Manager? Once Deleted it can't be Undone "
        // ${delData?.name}
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        cancel={closeDeleteModal}
        buttonStatus={resetButtonStatus}
        progress={progress}
        confirm={handleDelete}
      />
    </div>
  );
};

export default AddMissionManagerAdd;
