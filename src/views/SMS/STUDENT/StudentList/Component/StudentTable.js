import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import ButtonLoader from "../../../Components/ButtonLoader";
import ToggleSwitch from "../../../Components/ToggleSwitch";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";

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
}) => {
  return (
    <div className="table-responsive mb-3" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {tableData[0]?.isActive ? <th>SL/NO</th> : null}
            {tableData[1]?.isActive ? <th>UAPP ID</th> : null}
            {tableData[2]?.isActive ? <th>Full Name</th> : null}
            {tableData[3]?.isActive ? <th>Email</th> : null}
            {tableData[4]?.isActive ? <th>Phone No</th> : null}
            {tableData[5]?.isActive ? <th>Consultant</th> : null}
            {tableData[6]?.isActive ? <th>Branch</th> : null}
            {tableData[7]?.isActive ? <th>UAPP Reg Date</th> : null}
            {permissions?.includes(permissionList.Change_Student_Password) ? (
              <>{tableData[8]?.isActive ? <th>Password</th> : null}</>
            ) : null}
            {permissions?.includes(
              permissionList.Change_Student_Account_Status
            ) ? (
              <>{tableData[9]?.isActive ? <th>Black List</th> : null}</>
            ) : null}

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
                <th scope="row">{serialNum + i}</th>
              ) : null}
              {tableData[1]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <span
                    onClick={() => {
                      history.push(`/studentProfile/${student?.id}`);
                    }}
                  >
                    {student?.uappId}
                  </span>
                </td>
              ) : null}

              {tableData[2]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <span
                    onClick={() => {
                      history.push(`/studentProfile/${student?.id}`);
                    }}
                  >
                    {student?.fullName}
                  </span>
                </td>
              ) : null}

              {tableData[3]?.isActive ? <td>{student?.email}</td> : null}

              {tableData[4]?.isActive ? <td>{student?.phoneNumber}</td> : null}

              {tableData[5]?.isActive ? (
                <td>{student?.consultantName}</td>
              ) : null}
              {tableData[6]?.isActive ? <td>{student?.branchName}</td> : null}

              {tableData[7]?.isActive ? (
                <td>{handleDate(student?.createdOn)}</td>
              ) : null}

              {permissions?.includes(permissionList.Change_Student_Password) ? (
                <>
                  {tableData[8]?.isActive ? (
                    <td>
                      <Link
                        to="/studentList"
                        onClick={() => handlePass(student)}
                      >
                        Change
                      </Link>
                      <Modal
                        isOpen={passModal}
                        toggle={() => handleToggle}
                        className="uapp-modal2"
                      >
                        <ModalBody className="p-5">
                          <h5>
                            Change password for {passData?.firstName}{" "}
                            {passData?.lastName} ({passData?.studentViewId})
                          </h5>
                          <form onSubmit={submitModalForm} className="mt-3">
                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
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
                            <FormGroup
                              row
                              className="has-icon-left position-relative"
                            >
                              <Col md="8">
                                <span>
                                  <span className="text-danger">*</span> Confirm
                                  Password{" "}
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
              {permissions?.includes(
                permissionList.Change_Student_Account_Status
              ) ? (
                <>
                  {tableData[9]?.isActive ? (
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
                        {student?.canDelete && (
                          <ButtonForFunction
                            icon={<i className="fas fa-trash-alt"></i>}
                            color={"danger"}
                            className={"mx-1 btn-sm"}
                            func={() => toggleDanger(student)}
                          />
                        )}
                      </>
                    ) : null}
                  </ButtonGroup>

                  <ConfirmModal
                    text="Do You Want To Delete This Student Information ?"
                    isOpen={deleteModal}
                    toggle={() => setDeleteModal(!deleteModal)}
                    confirm={handleDeleteData}
                    cancel={() => setDeleteModal(false)}
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

export default StudentTable;
