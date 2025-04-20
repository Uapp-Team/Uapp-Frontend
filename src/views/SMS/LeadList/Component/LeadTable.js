import React, { useState } from "react";
import put from "../../../../helpers/put";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import {
  ButtonGroup,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Table,
} from "reactstrap";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ToggleSwitch from "../../Components/ToggleSwitch";
import PopOverText from "../../../../components/PopOverText";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { dateFormate } from "../../../../components/date/calenderFormate";
import ChangePassword from "../../../../components/password/ChangePassword";

const LeadTable = ({
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
  pass,
  cPass,
}) => {
  const [popoverOpen, setPopoverOpen] = useState("");
  const userType = localStorage.getItem("userType");
  const { addToast } = useToasts();
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [PasswordEye, setPasswordEye] = useState(false);

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
            {userType !== userTypes?.Consultant ? (
              <> {tableData[3]?.isActive ? <th>Consultant</th> : null}</>
            ) : null}
            {tableData[4]?.isActive ? <th>Companion</th> : null}
            {tableData[5]?.isActive ? <th>Branch</th> : null}
            {tableData[6]?.isActive ? <th>UAPP Reg Date</th> : null}
            {permissions?.includes(permissionList.Change_Student_Password) ? (
              <>{tableData[7]?.isActive ? <th>Password</th> : null}</>
            ) : null}
            {permissions?.includes(
              permissionList.Change_Student_Account_Status
            ) ? (
              <>{tableData[8]?.isActive ? <th>Black List</th> : null}</>
            ) : null}
            {tableData[9]?.isActive ? <th>Verified</th> : null}
            {tableData[10]?.isActive ? (
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

              {userType !== userTypes?.Consultant ? (
                <>
                  {" "}
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
                </>
              ) : null}

              {tableData[4]?.isActive ? (
                <>
                  {" "}
                  <td> {student?.companionName}</td>
                </>
              ) : null}
              {tableData[5]?.isActive ? (
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

              {tableData[6]?.isActive ? (
                <td>{dateFormate(student?.createdOn)}</td>
              ) : null}

              {permissions?.includes(permissionList.Change_Student_Password) ? (
                <>
                  {tableData[7]?.isActive ? (
                    <td>
                      <Link
                        to="/lead-student-List"
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
                  {tableData[8]?.isActive ? (
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
              {tableData[9]?.isActive ? (
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

              {tableData[10]?.isActive ? (
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
          <ChangePassword
            submitModalForm={submitModalForm}
            PasswordEye={PasswordEye}
            setPasswordEye={setPasswordEye}
            passValidation={passValidate}
            password={pass}
            passError={error}
            ConPasswordEye={confirmPasswordEye}
            setConPasswordEye={setConfirmPasswordEye}
            ConPassValidation={confirmPassword}
            conPassword={cPass}
            conPassError={passError}
            handleToggle={handleToggle}
            progress={progress}
            buttonStatus={buttonStatus}
          />
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

export default LeadTable;
