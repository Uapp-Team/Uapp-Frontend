import React from "react";
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

const StaffTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
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
  console.log(employeeList);
  return (
    <div className="table-responsive" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {/* {tableData[0]?.isActive ? <th>SL/NO</th> : null} */}
            {/* {tableData[1]?.isActive ? <th>UAPP Id</th> : null} */}
            {tableData[2]?.isActive ? <th>Provider</th> : null}
            {permissions?.includes(permissionList.Staff_Password_Change) ? (
              <>
                {" "}
                {userTypeId === userTypes?.SystemAdmin ||
                userTypeId === userTypes?.Admin ? (
                  <>{tableData[3]?.isActive ? <th>Password</th> : null}</>
                ) : null}
              </>
            ) : null}
            {tableData[4]?.isActive ? <th>Full Name</th> : null}
            {/* {tableData[5]?.isActive ? <th>Branch</th> : null} */}
            {tableData[6]?.isActive ? <th>Email</th> : null}
            {tableData[7]?.isActive ? <th>Phone No</th> : null}
            {tableData[8]?.isActive ? (
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
              {/* {tableData[1]?.isActive ? (
                <td
                  className="cursor-pointer hyperlink-hover"
                  onClick={() => handleEmpClick(emp.id)}
                >
                  <span>{emp?.uappId}</span>
                </td>
              ) : null} */}
              {tableData[2]?.isActive ? <td>{emp?.provider}</td> : null}
              {permissions?.includes(permissionList.Staff_Password_Change) ? (
                <>
                  {" "}
                  {userTypeId === userTypes?.SystemAdmin ||
                  userTypeId === userTypes?.Admin ? (
                    <>
                      {tableData[3]?.isActive ? (
                        <td>
                          <Link
                            // to="/providerComplianceList"
                            onClick={() => handlePass(emp)}
                          >
                            Change
                          </Link>
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
                                      <span className="text-danger">*</span>{" "}
                                      Password{" "}
                                    </span>

                                    <Input
                                      type="password"
                                      onBlur={passValidate}
                                      onChange={() => setError("")}
                                    />
                                    <span className="text-danger">{error}</span>
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Col md="8">
                                    <span>
                                      <span className="text-danger">*</span>{" "}
                                      Confirm Password{" "}
                                    </span>

                                    <Input
                                      type="password"
                                      onChange={(e) => {
                                        verifyPass();
                                        confirmPassword(e);
                                      }}
                                    />

                                    <br />
                                    {
                                      <span className="text-danger">
                                        {passError}
                                      </span>
                                    }
                                  </Col>
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-between mt-3">
                                  <CancelButton
                                    cancel={() => handleToggle(false)}
                                  />

                                  <SaveButton
                                    text="Submit"
                                    progress={progress}
                                    buttonStatus={buttonStatus}
                                  />
                                </FormGroup>
                              </form>
                            </ModalBody>
                          </Modal>
                        </td>
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}
              {tableData[4]?.isActive ? (
                <td
                  className="cursor-pointer hyperlink-hover"
                  onClick={() => handleEmpClick(emp.id)}
                >
                  {emp?.fullName}
                </td>
              ) : null}
              {/* {tableData[5]?.isActive ? <td>{emp.branch}</td> : null} */}
              {tableData[6]?.isActive ? <td>{emp.email}</td> : null}
              {tableData[7]?.isActive ? <td>{emp.phoneNumber}</td> : null}
              {tableData[8]?.isActive ? (
                <td className="text-center">
                  <ButtonGroup variant="text">
                    {permissions?.includes(permissionList.View_Provider) ? (
                      <ButtonForFunction
                        func={() => redirectToStaffProfile(emp?.id)}
                        color={"primary"}
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-eye"></i>}
                      />
                    ) : null}

                    {permissions.includes(permissionList?.Edit_Provider) ? (
                      <ButtonForFunction
                        func={() => redirecttoStaffGeneralInfo(emp?.id)}
                        color={"warning"}
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-edit"></i>}
                      />
                    ) : null}

                    {permissions?.includes(permissionList.Delete_Provider) ? (
                      <ButtonForFunction
                        func={() => toggleDanger(emp)}
                        color={"danger"}
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-trash-alt"></i>}
                        disable={buttonStatus}
                      />
                    ) : null}
                  </ButtonGroup>
                  <ConfirmModal
                    text=" Are You Sure to Delete this Provider Compliance  ? 
                    Once Deleted it can't be Undone!"
                    isOpen={deleteModal}
                    toggle={closeDeleteModal}
                    confirm={() => handleDeleteStaff(emp?.id)}
                    cancel={closeDeleteModal}
                    buttonStatus={buttonStatus}
                    progress={progress}
                  />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StaffTable;
