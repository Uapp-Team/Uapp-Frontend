import React, { useState } from "react";
import {
  ButtonGroup,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Table,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import ToggleSwitch from "../../../../Components/ToggleSwitch";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import PopOverText from "../../../../../../components/PopOverText";
import { useToasts } from "react-toast-notifications";
import put from "../../../../../../helpers/put";
import { Link } from "react-router-dom/cjs/react-router-dom";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import Loader from "../../../../Search/Loader/Loader";

const AddmissionOfficerTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
  officerList,
  // history,
  redirectToAssignPage,
  redirectToSubjectPage,
  handleAccountStatus,
  handlRedirectToAdmissionofficerDetails,
  redirectEdit,
  toggleDanger,
  deleteModal,
  closeDeleteModal,
  // officerName,
  handleDelete,
  buttonStatus,
  progress,
  loading,
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
      put(`Password/ChangePasswordForAdmissionOfficer`, subData).then((res) => {
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="table-responsive fixedhead" ref={componentRef}>
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  {tableData[0]?.isActive ? <th>UAPP ID</th> : null}
                  {tableData[1]?.isActive ? <th>Name</th> : null}
                  {permissions?.includes(
                    permissionList.Staff_Password_Change
                  ) ? (
                    <>
                      {userTypeId === userTypes?.SystemAdmin ||
                      userTypeId === userTypes?.Admin ? (
                        <>{tableData[2]?.isActive ? <th>Password</th> : null}</>
                      ) : null}
                    </>
                  ) : null}
                  {tableData[3]?.isActive ? <th>Provider</th> : null}
                  {tableData[4]?.isActive ? <th>Contact</th> : null}

                  {permissions?.includes(
                    permissionList.AdmissionOfficer_Assign_University
                  ) ? (
                    <>
                      {tableData[5]?.isActive ? (
                        <th>Assigned University</th>
                      ) : null}
                    </>
                  ) : null}
                  {permissions?.includes(
                    permissionList?.AdmissionOfficer_Assign_Subject
                  ) ? (
                    <>
                      {tableData[6]?.isActive ? (
                        <th>Assigned Courses</th>
                      ) : null}
                    </>
                  ) : null}

                  {tableData[7]?.isActive ? (
                    <th>Registered Applications</th>
                  ) : null}

                  {tableData[8]?.isActive ? <th>Applications</th> : null}

                  {tableData[9]?.isActive ? <th>Branch</th> : null}

                  {permissions?.includes(
                    permissionList.AdmissionOfficer_Account_Status
                  ) ? (
                    <>
                      {tableData[10]?.isActive ? <th>Account Status</th> : null}
                    </>
                  ) : null}
                  {tableData[11]?.isActive ? (
                    <th style={{ width: "8%" }} className="text-center">
                      Action
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {officerList?.map((officer, i) => (
                  <tr key={i} style={{ textAlign: "center" }}>
                    {tableData[0]?.isActive ? (
                      <td className="cursor-pointer hyperlink-hover">
                        <Link
                          className="text-id hover"
                          to={`/admissionOfficerDetails/${officer?.id}`}
                        >
                          {officer?.viewId}
                        </Link>
                      </td>
                    ) : null}

                    {tableData[1]?.isActive ? (
                      <td className="cursor-pointer hyperlink-hover">
                        <Link
                          className="text-id hover"
                          to={`/admissionOfficerDetails/${officer?.id}`}
                        >
                          {officer?.fullName}
                        </Link>
                      </td>
                    ) : null}

                    {permissions?.includes(
                      permissionList.Staff_Password_Change
                    ) ? (
                      <>
                        {userTypeId === userTypes?.SystemAdmin ||
                        userTypeId === userTypes?.Admin ? (
                          <>
                            {tableData[2]?.isActive ? (
                              <td>
                                <Link onClick={() => handlePass(officer)}>
                                  Change
                                </Link>
                              </td>
                            ) : null}
                          </>
                        ) : null}
                      </>
                    ) : null}

                    {tableData[3]?.isActive ? (
                      <td>{officer?.provider}</td>
                    ) : null}

                    {tableData[4]?.isActive ? (
                      <td>
                        <div className="d-flex justify-content-center">
                          <PopOverText
                            value={
                              officer?.phoneNumber &&
                              officer?.phoneNumber.includes("+")
                                ? officer?.phoneNumber
                                : officer?.phoneNumber &&
                                  !officer?.phoneNumber.includes("+")
                                ? "+" + officer?.phoneNumber
                                : null
                            }
                            btn={<i class="fas fa-phone"></i>}
                            popoverOpen={popoverOpen}
                            setPopoverOpen={setPopoverOpen}
                          />
                          <PopOverText
                            value={officer?.email}
                            btn={<i className="far fa-envelope"></i>}
                            popoverOpen={popoverOpen}
                            setPopoverOpen={setPopoverOpen}
                          />
                        </div>
                      </td>
                    ) : null}

                    {permissions?.includes(
                      permissionList.AdmissionOfficer_Assign_University
                    ) ? (
                      <>
                        {tableData[5]?.isActive ? (
                          <td>
                            <div style={{ marginTop: "5px" }}>
                              <span
                                onClick={() =>
                                  redirectToAssignPage(
                                    officer?.providerId,
                                    officer?.id
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
                      permissionList.AdmissionOfficer_Assign_Subject
                    ) ? (
                      <>
                        {tableData[6]?.isActive ? (
                          <td>
                            <div style={{ marginTop: "5px" }}>
                              <span
                                onClick={() =>
                                  redirectToSubjectPage(officer?.id)
                                }
                                className="Count-fourth"
                              >
                                View
                              </span>
                            </div>
                          </td>
                        ) : null}
                      </>
                    ) : null}

                    {tableData[7]?.isActive ? (
                      <td>
                        <div style={{ marginTop: "5px" }}>
                          <span
                            onClick={() => {
                              history.push(
                                `/admission-officer-applications/${2}/${3}/${
                                  officer?.id
                                }`
                              );
                            }}
                            className="Count-second"
                          >
                            {officer?.registeredCount}
                          </span>
                        </div>
                      </td>
                    ) : null}

                    {/* Applications starts here */}
                    {tableData[8]?.isActive ? (
                      <td>
                        <div style={{ marginTop: "5px" }}>
                          <span
                            onClick={() => {
                              history.push(
                                `/ApplicationListByAdmissionOfficer/${officer?.id}`
                              );
                            }}
                            className="Count-third"
                          >
                            {officer?.applicationCount}
                          </span>
                        </div>
                      </td>
                    ) : null}

                    {tableData[9]?.isActive ? (
                      <td>{officer?.branchName}</td>
                    ) : null}

                    {permissions?.includes(
                      permissionList.AdmissionOfficer_Account_Status
                    ) ? (
                      <>
                        {tableData[10]?.isActive ? (
                          <td>
                            {
                              <ToggleSwitch
                                defaultChecked={
                                  officer?.isActive === false ? false : true
                                }
                                onChange={(e) => {
                                  handleAccountStatus(e, officer?.id);
                                }}
                              />
                            }
                          </td>
                        ) : null}
                      </>
                    ) : null}

                    {tableData[11]?.isActive ? (
                      <td style={{ width: "8%" }} className="text-center">
                        <ButtonGroup variant="text">
                          {permissions?.includes(
                            permissionList?.View_AdmissionOfficer_Details
                          ) ? (
                            <ButtonForFunction
                              func={() =>
                                handlRedirectToAdmissionofficerDetails(
                                  officer?.id
                                )
                              }
                              color={"primary"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-eye"></i>}
                              permission={6}
                            />
                          ) : null}
                          {permissions?.includes(
                            permissionList.Update_AdmissionOfficer
                          ) ? (
                            <ButtonForFunction
                              func={() => redirectEdit(officer?.id)}
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                            />
                          ) : null}{" "}
                          {permissions?.includes(
                            permissionList.Delete_AdmissionOfficer
                          ) ? (
                            <ButtonForFunction
                              color={"danger"}
                              func={() => toggleDanger(officer)}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                            />
                          ) : null}{" "}
                        </ButtonGroup>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}

      <ConfirmModal
        text="Do You Want To Delete This Admission Officer ? Once Deleted it can't be Undone "
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        cancel={closeDeleteModal}
        buttonStatus={buttonStatus}
        progress={progress}
        confirm={handleDelete}
      />
      <Modal
        isOpen={passModal}
        toggle={() => handleToggle}
        className="uapp-modal2"
      >
        <ModalBody className="p-5">
          <h5>Change password for {passData?.fullName}</h5>
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
    </>
  );
};

export default AddmissionOfficerTable;
