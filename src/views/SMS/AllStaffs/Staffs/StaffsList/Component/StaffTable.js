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

const StaffTable = ({
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
}) => {
  const [popoverOpen, setPopoverOpen] = useState("");
  console.log(employeeList);
  return (
    <div className="table-responsive" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {tableData[0]?.isActive ? <th>UAPP Id</th> : null}
            {tableData[1]?.isActive ? <th>Staff Type</th> : null}
            {permissions?.includes(permissionList.Staff_Password_Change) ? (
              <>
                {userTypeId === userTypes?.SystemAdmin ||
                userTypeId === userTypes?.Admin ? (
                  <>{tableData[2]?.isActive ? <th>Password</th> : null}</>
                ) : null}
              </>
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
                    to={`/staffProfile/${emp.id}`}
                  >
                    {emp?.uappId}
                  </Link>
                </td>
              ) : null}
              {tableData[1]?.isActive ? <td>{emp?.staffType}</td> : null}
              {permissions?.includes(permissionList.Staff_Password_Change) ? (
                <>
                  {userTypeId === userTypes?.SystemAdmin ||
                  userTypeId === userTypes?.Admin ? (
                    <>
                      {tableData[2]?.isActive ? (
                        <td>
                          <Link to="/staffList" onClick={() => handlePass(emp)}>
                            Change
                          </Link>
                        </td>
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}
              {tableData[3]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <Link
                    className="text-id hover"
                    to={`/staffProfile/${emp?.id}`}
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
                      permissionList.View_Employee_Details
                    ) ? (
                      <ButtonForFunction
                        func={() => redirectToStaffProfile(emp?.id)}
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
                          permissionList?.Update_Employee
                        ) ? (
                          <ButtonForFunction
                            func={() => redirecttoStaffGeneralInfo(emp?.id)}
                            color={"warning"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-edit"></i>}
                          />
                        ) : null}

                        {permissions?.includes(
                          permissionList.Delete_Employee
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
        confirm={() => handleDeleteStaff(data?.id)}
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
                buttonStatus={buttonStatus}
              />
            </FormGroup>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default StaffTable;
