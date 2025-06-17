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
import { userTypes } from "../../../../../../constants/userTypeConstant";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import PopOverText from "../../../../../../components/PopOverText";
import EyeBtn from "../../../../../../components/buttons/EyeBtn";
import ChangePassword from "../../../../../../components/password/ChangePassword";

const SalesTeamLeaderTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
  data,
  toggleDanger,
  deleteModal,
  closeDeleteModal,
  buttonStatus,
  progress,
  userTypeId,
  employeeList,
  handleEmpClick,
  handlePass,
  serialNum,
  passModal,
  handleToggle,
  passData,
  submitModalForm,
  passValidate,
  setError,
  error,
  verifyPass,
  confirmPassword,
  passError,
  setPassModal,
  redirectToStaffProfile,
  redirecttoStaffGeneralInfo,
  handleDeleteStaff,
  pass,
  cPass,
  redirectToAssignPage,
}) => {
  const [popoverOpen, setPopoverOpen] = useState("");
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [PasswordEye, setPasswordEye] = useState(false);

  return (
    <div className="table-responsive" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {tableData[0]?.isActive ? <th>UAPP Id</th> : null}
            {tableData[1]?.isActive ? <th>Assign Consultant</th> : null}
            {permissions?.includes(permissionList.Staff_Password_Change) ? (
              <>{tableData[2]?.isActive ? <th>Password</th> : null}</>
            ) : null}
            {tableData[3]?.isActive ? <th>Full Name</th> : null}
            {tableData[4]?.isActive ? <th>Branch</th> : null}
            {tableData[5]?.isActive ? <th>Contact</th> : null}

            {tableData[6]?.isActive ? (
              <th className="text-center">Action</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {employeeList?.map((emp, i) => (
            <tr key={emp.id} style={{ textAlign: "center" }}>
              {/* {tableData[0]?.isActive ? (
                <th scope="row">{serialNum + i}</th>
              ) : null} */}
              {tableData[0]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <Link
                    className="text-id hover"
                    to={`/salesTeamLeaderProfile/${emp.employeeId}`}
                  >
                    {emp?.uappId}
                  </Link>
                </td>
              ) : null}
              {tableData[1]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      onClick={() =>
                        redirectToAssignPage(emp?.employeeId, emp?.branchId)
                      }
                      className="Count-fifth"
                    >
                      View({emp?.consultantCount})
                    </span>
                  </div>
                </td>
              ) : null}

              {permissions?.includes(permissionList.Staff_Password_Change) ? (
                <>
                  {tableData[2]?.isActive ? (
                    <td>
                      <Link
                        to="/salesTeamLeaderList"
                        onClick={() => handlePass(emp)}
                      >
                        Change
                      </Link>
                    </td>
                  ) : null}
                </>
              ) : null}
              {tableData[3]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <Link
                    className="text-id hover"
                    to={`/salesTeamLeaderProfile/${emp?.employeeId}`}
                  >
                    {emp?.fullName}
                  </Link>
                  <span></span>
                </td>
              ) : null}
              {tableData[4]?.isActive ? <td>{emp.branch}</td> : null}
              {tableData[5]?.isActive ? (
                <td>
                  <div className="d-flex justify-content-center">
                    <PopOverText
                      value={
                        emp.phoneNumber && emp.phoneNumber.includes("+")
                          ? emp.phoneNumber
                          : emp.phoneNumber && !emp.phoneNumber.includes("+")
                          ? "+" + emp.phoneNumber
                          : null
                      }
                      btn={<i class="fas fa-phone"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                    <PopOverText
                      value={emp.email}
                      btn={<i className="far fa-envelope"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                  </div>
                </td>
              ) : null}

              {tableData[6]?.isActive ? (
                <td className="text-center">
                  <ButtonGroup variant="text">
                    {permissions?.includes(
                      permissionList.View_SalesTeamLeader_Details
                    ) ? (
                      <ButtonForFunction
                        func={() => redirectToStaffProfile(emp?.employeeId)}
                        color={"primary"}
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-eye"></i>}
                      />
                    ) : null}

                    {emp?.email === "accountmanager@uapp.uk" ||
                    emp?.email === "accounts@uapp.uk" ||
                    emp?.email === "compliance@uapp.uk" ||
                    emp?.email === "edit@uapp.uk" ||
                    emp?.email === "finance@uapp.uk" ? null : (
                      <>
                        {permissions.includes(
                          permissionList?.Update_SalesTeamLeader
                        ) ? (
                          <ButtonForFunction
                            func={() =>
                              redirecttoStaffGeneralInfo(emp?.employeeId)
                            }
                            color={"warning"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-edit"></i>}
                          />
                        ) : null}

                        {permissions?.includes(
                          permissionList.Delete_SalesTeamLeader
                        ) ? (
                          <ButtonForFunction
                            func={() => toggleDanger(emp)}
                            color={"danger"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-trash-alt"></i>}
                            disable={buttonStatus}
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
      <ConfirmModal
        text=" Are You Sure to Delete this Staff ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        confirm={() => handleDeleteStaff(data)}
        cancel={closeDeleteModal}
        buttonStatus={buttonStatus}
        progress={progress}
      />
      <Modal
        isOpen={passModal}
        toggle={() => handleToggle}
        className="uapp-modal2"
      >
        <ModalBody className="p-5">
          <h5>Change password for {passData?.fullName}</h5>
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
    </div>
  );
};

export default SalesTeamLeaderTable;
