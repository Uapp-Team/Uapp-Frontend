import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ButtonGroup,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Table,
} from "reactstrap";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import ToggleSwitch from "../../../Components/ToggleSwitch";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import PopOverText from "../../../../../components/PopOverText";
import { useToasts } from "react-toast-notifications";
import put from "../../../../../helpers/put";
import { dateFormate } from "../../../../../components/date/calenderFormate";

const StudentTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
  userTypeId,
  userTypes,
  history,
  studentData,
  serialNum,
  handleDate,
  handlePass,
  passModal,
  passData,
  submitModalForm,
  passValidate,
  handleToggle,
  setError,
  error,
  verifyPass,
  confirmPassword,
  passError,
  setPassModal,
  buttonStatus,
  progress,
  handleBlacklist,
  redirectToStudentProfile,
  handleEdit,
  toggleDanger,
  deleteModal,
  setDeleteModal,
  handleDeleteData,
  success,
  setSuccess,
}) => {
  const [popoverOpen, setPopoverOpen] = useState("");
  const { addToast } = useToasts();

  const reSendEmail = (e, id) => {
    e.preventDefault();

    put(`Student/ResendVerificationEmail/${id}`).then((res) => {
      if (res?.status === 200 && res.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        // setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        // setSuccess(!success);
      }
    });
  };

  const reSendLoginEmail = (e, userid) => {
    e.preventDefault();

    put(`StudentRegistration/ResendLogin/${userid}`).then((res) => {
      if (res?.status === 200 && res.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        // setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        // setSuccess(!success);
      }
    });
  };

  return (
    <div className="table-responsive fixedhead mb-3" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {tableData[0]?.isActive ? <th>UAPP ID</th> : null}
            {tableData[1]?.isActive ? <th>Full Name</th> : null}
            {tableData[2]?.isActive ? <th>Contact</th> : null}
            {tableData[3]?.isActive ? <th>Consultant</th> : null}
            {tableData[4]?.isActive ? <th>Branch</th> : null}
            {tableData[5]?.isActive ? <th>UAPP Reg Date</th> : null}
            {permissions?.includes(permissionList.Change_Student_Password) ? (
              <>{tableData[6]?.isActive ? <th>Password</th> : null}</>
            ) : null}
            {permissions?.includes(
              permissionList.Change_Student_Account_Status
            ) ? (
              <>{tableData[7]?.isActive ? <th>Black List</th> : null}</>
            ) : null}
            {tableData[8]?.isActive ? <th>Verified</th> : null}
            {tableData[9]?.isActive ? (
              <th style={{ width: "8%" }} className="text-center">
                Action
              </th>
            ) : null}
          </tr>
        </thead>

        <tbody>
          {studentData?.map((student, i) => (
            <tr key={student.id} style={{ textAlign: "center" }}>
              {tableData[0]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <Link
                    className="text-id hover"
                    to={`/studentProfile/${student?.id}`}
                  >
                    {student?.uappId}
                  </Link>
                </td>
              ) : null}

              {tableData[1]?.isActive ? (
                <td>
                  <div className="cursor-pointer hyperlink-hover">
                    <Link
                      className="text-id hover"
                      to={`/studentProfile/${student?.id}`}
                    >
                      {student?.fullName}
                    </Link>
                  </div>
                  {student?.isConsultant === true ? (
                    <p className="from-student ">Consultant</p>
                  ) : null}
                </td>
              ) : null}

              {tableData[2]?.isActive ? (
                <td>
                  <div className="d-flex justify-content-center sa">
                    <PopOverText
                      value={
                        student?.phoneNumber &&
                        student?.phoneNumber.includes("+")
                          ? student?.phoneNumber
                          : student?.phoneNumber &&
                            !student?.phoneNumber.includes("+")
                          ? "+" + student?.phoneNumber
                          : null
                      }
                      // value={
                      //   student?.phoneNumber ? "+" + student.phoneNumber : null
                      // }
                      btn={<i class="fas fa-phone"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                    <PopOverText
                      value={student?.email}
                      btn={<i className="far fa-envelope"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                  </div>
                </td>
              ) : null}

              {tableData[3]?.isActive ? (
                <>
                  {" "}
                  {permissions?.includes(permissionList.View_Consultant) ? (
                    <td className="cursor-pointer hyperlink-hover">
                      <Link
                        className="text-id hover"
                        to={`/consultantProfile/${student?.consultantId}`}
                      >
                        {student?.consultantName}
                      </Link>
                    </td>
                  ) : (
                    <td> {student?.consultantName}</td>
                  )}
                </>
              ) : null}
              {tableData[4]?.isActive ? (
                <>
                  {" "}
                  {permissions?.includes(permissionList.View_Branch) ? (
                    <td className="cursor-pointer hyperlink-hover">
                      <Link
                        className="text-id hover"
                        to={`/branchProfile/${student?.branchId}`}
                      >
                        {student?.branchName}
                      </Link>
                    </td>
                  ) : (
                    <td> {student?.branchName}</td>
                  )}
                </>
              ) : null}

              {tableData[5]?.isActive ? (
                <td>{dateFormate(student?.createdOn)}</td>
              ) : null}

              {permissions?.includes(permissionList.Change_Student_Password) ? (
                <>
                  {tableData[6]?.isActive ? (
                    <td>
                      <Link
                        to="/studentList"
                        onClick={() => handlePass(student)}
                      >
                        Change
                      </Link>
                    </td>
                  ) : null}
                </>
              ) : null}
              {permissions?.includes(
                permissionList.Change_Student_Account_Status
              ) ? (
                <>
                  {tableData[7]?.isActive ? (
                    <td>
                      <ToggleSwitch
                        defaultChecked={
                          student?.blacklisted == null
                            ? false
                            : student?.blacklisted === false
                            ? false
                            : true
                        }
                        onChange={(e) => {
                          handleBlacklist(e, student?.id);
                        }}
                      />
                    </td>
                  ) : null}
                </>
              ) : null}
              {tableData[8]?.isActive ? (
                <td>
                  {student?.isVerified === true ? (
                    <>
                      <span>Verified</span>
                      <br />
                      <span
                        className="link-color pointer"
                        onClick={(e) => reSendLoginEmail(e, student?.userid)}
                      >
                        Resend Login
                      </span>
                    </>
                  ) : (
                    <span
                      className="link-color pointer"
                      onClick={(e) => reSendEmail(e, student?.id)}
                    >
                      Resend
                    </span>
                  )}
                </td>
              ) : null}

              {tableData[9]?.isActive ? (
                <td style={{ width: "8%" }} className="text-center">
                  <ButtonGroup variant="text">
                    {permissions?.includes(permissionList.View_Student) ? (
                      <ButtonForFunction
                        icon={<i className="fas fa-eye"></i>}
                        color={"primary"}
                        className={"mx-1 btn-sm"}
                        func={() => redirectToStudentProfile(student?.id)}
                      />
                    ) : null}
                    {permissions?.includes(permissionList.Edit_Student) ? (
                      <ButtonForFunction
                        icon={<i className="fas fa-edit"></i>}
                        color={"warning"}
                        className={"mx-1 btn-sm"}
                        func={() => handleEdit(student)}
                      />
                    ) : null}

                    {permissions?.includes(permissionList.Delete_Student) ? (
                      <>
                        {/* {student?.canDelete && ( */}
                        <ButtonForFunction
                          icon={<i className="fas fa-trash-alt"></i>}
                          color={"danger"}
                          className={"mx-1 btn-sm"}
                          func={() => toggleDanger(student)}
                        />
                        {/* )} */}
                      </>
                    ) : null}
                  </ButtonGroup>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        isOpen={passModal}
        toggle={() => handleToggle}
        className="uapp-modal2"
      >
        <ModalBody className="p-5">
          <h5>
            Change password for {passData?.fullName} ({passData?.uappId})
          </h5>
          <form onSubmit={submitModalForm} className="mt-3">
            <FormGroup row className="has-icon-left position-relative">
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
            <FormGroup row className="has-icon-left position-relative">
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
                <br />
              </Col>
            </FormGroup>

            <FormGroup className="d-flex justify-content-between mt-3">
              <CancelButton cancel={() => handleToggle(false)} />

              <SaveButton text="Submit" buttonStatus={buttonStatus} />
            </FormGroup>
          </form>
        </ModalBody>
      </Modal>

      <ConfirmModal
        text="Do You Want To Delete This Student Information ?"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDeleteData}
        cancel={() => setDeleteModal(false)}
        buttonStatus={buttonStatus}
        progress={progress}
      />
    </div>
  );
};

export default StudentTable;
