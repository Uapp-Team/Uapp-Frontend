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
import PopOverText from "../../../../components/PopOverText";
import { dateFormate } from "../../../../components/date/calenderFormate";
import ToggleSwitch from "../../Components/ToggleSwitch";
import ButtonForFunction from "../../Components/ButtonForFunction";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const CompanionTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
  userTypeId,
  userTypes,
  companionList,
  serialNum,
  history,
  handlePass,
  passModal,
  handleToggle,
  passData,
  submitModalForm,
  passValidate,
  setError,
  error,
  verifyPass,
  confirmPassword,
  setPassModal,
  progress,
  passError,
  handleDate,
  redirectToApplications,
  handleUpdate,
  redirectToConsultantProfile,
  userType,
  redirectToConsultantDashboard,
  handleEdit,
  toggleDanger,
  deleteModal,
  setDeleteModal,
  handleDeleteData,
  buttonStatus,
}) => {
  const [popoverOpen, setPopoverOpen] = useState("");

  const adminPermission =
    userType === userTypes?.SystemAdmin.toString() ||
    userType === userTypes?.Admin.toString();

  return (
    <div className="table-responsive fixedhead mb-2" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {tableData[0]?.isActive ? <th>UAPP ID </th> : null}
            {tableData[1]?.isActive ? <th>Full Name</th> : null}
            {tableData[2]?.isActive ? <th>Contact</th> : null}

            {permissions?.includes(
              permissionList.Consultant_Password_Change
            ) ? (
              <>{tableData[3]?.isActive ? <th>Password</th> : null}</>
            ) : null}

            {tableData[4]?.isActive ? <th>Parent</th> : null}
            {adminPermission && tableData[5]?.isActive ? (
              <th>Consultant</th>
            ) : null}
            {tableData[6]?.isActive ? <th>Started</th> : null}
            {tableData[7]?.isActive ? <th>Pending Invitation</th> : null}
            {tableData[8]?.isActive ? <th>Leads</th> : null}
            {tableData[9]?.isActive ? <th>Students</th> : null}
            {tableData[10]?.isActive ? <th>Team Member</th> : null}
            {tableData[11]?.isActive ? <th>Application</th> : null}
            {tableData[12]?.isActive ? <th>Registered</th> : null}
            {tableData[13]?.isActive ? <th>Status</th> : null}
            {tableData[14]?.isActive ? <th>Branch</th> : null}

            {permissions?.includes(
              permissionList?.Change_Consultant_AccountStatus
            ) ? (
              <>{tableData[15]?.isActive ? <th>BlackList</th> : null}</>
            ) : null}

            {tableData[16]?.isActive ? (
              <th style={{ width: "8%" }} className="text-center">
                Action
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {companionList?.map((companion, i) => (
            <tr key={companion?.id} style={{ textAlign: "center" }}>
              {tableData[0]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <Link
                    className="text-id hover"
                    to={`/companion-profile/${companion?.id}`}
                  >
                    {companion?.viewId}
                  </Link>
                </td>
              ) : null}

              {tableData[1]?.isActive ? (
                <td>
                  <div className="cursor-pointer hyperlink-hover">
                    <Link
                      className="text-id hover"
                      to={`/companion-profile/${companion?.id}`}
                    >
                      {companion?.name}
                    </Link>
                  </div>
                  {companion?.isEmailInStudents === true ? (
                    <p className="from-student ">From Student</p>
                  ) : null}
                </td>
              ) : null}
              {tableData[2]?.isActive ? (
                <td>
                  <div className="d-flex justify-content-center">
                    <PopOverText
                      value={
                        companion?.phone && companion?.phone.includes("+")
                          ? companion?.phone
                          : companion?.phone && !companion?.phone.includes("+")
                          ? "+" + companion?.phone
                          : null
                      }
                      btn={<i class="fas fa-phone"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                    <PopOverText
                      value={companion?.email}
                      btn={<i className="far fa-envelope"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                  </div>
                </td>
              ) : null}

              {permissions?.includes(
                permissionList.Consultant_Password_Change
              ) ? (
                <>
                  {tableData[3]?.isActive ? (
                    <td>
                      <span
                        className="passwordChangeStyle"
                        onClick={() => handlePass(companion)}
                      >
                        Change
                      </span>
                    </td>
                  ) : null}
                </>
              ) : null}

              {tableData[4]?.isActive ? <td>{companion?.parentName}</td> : null}
              {adminPermission && tableData[5]?.isActive ? (
                <td>{companion?.consultantName}</td>
              ) : null}

              {tableData[6]?.isActive ? (
                <td>{dateFormate(companion?.createdOn)}</td>
              ) : null}
              {tableData[7]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-first"
                      onClick={() => {
                        history.push(
                          `/companion-Invitation-list/${companion?.id}`
                        );
                      }}
                    >
                      {companion?.invitationCount}
                    </span>
                  </div>
                </td>
              ) : null}

              {tableData[8]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-fifth-no-pointer"
                      onClick={() => {
                        history.push(`/companion-lead-list/${companion?.id}`);
                      }}
                    >
                      {companion?.leadCount}
                    </span>
                  </div>
                </td>
              ) : null}
              {tableData[9]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-sixth-no-pointer"
                      onClick={() => {
                        history.push(
                          `/companion-student-list/${companion?.id}`
                        );
                      }}
                    >
                      {companion?.studentCount}
                    </span>
                  </div>
                </td>
              ) : null}

              {tableData[10]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-second"
                      onClick={() => {
                        history.push(`/companion-team-List/${companion?.id}`);
                      }}
                    >
                      {companion?.teamMembersCount}
                    </span>
                  </div>
                </td>
              ) : null}

              {tableData[11]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-third"
                      onClick={() => {
                        history.push(
                          `/ApplicationListByCompanion/${companion?.id}`
                        );
                      }}
                    >
                      {companion?.totalApplicationCount}
                    </span>
                  </div>
                </td>
              ) : null}
              {tableData[12]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-fourth-no-pointer"
                      onClick={() => {
                        history.push(
                          `/companion-applications/${2}/${3}/${companion?.id}`
                        );
                      }}
                    >
                      {companion?.totalRegisteredApplicationCount}
                    </span>
                  </div>
                </td>
              ) : null}

              {tableData[13]?.isActive ? (
                <td>{companion?.accountStatus}</td>
              ) : null}

              {tableData[14]?.isActive ? (
                <td>{companion?.branchName}</td>
              ) : null}

              {permissions?.includes(
                permissionList?.Change_Consultant_AccountStatus
              ) ? (
                <>
                  {tableData[15]?.isActive ? (
                    <td>
                      <ToggleSwitch
                        defaultChecked={!companion?.isActive}
                        onChange={() => handleUpdate(companion)}
                      />
                    </td>
                  ) : null}
                </>
              ) : null}

              {tableData[16]?.isActive ? (
                <td style={{ width: "8%" }} className="text-center">
                  <ButtonGroup variant="text">
                    {/* {permissions?.includes(permissionList.View_Consultant) ? ( */}
                    <>
                      <button
                        onClick={() =>
                          redirectToConsultantProfile(companion?.id)
                        }
                        className="mx-1 btn-sm consultant-eye-button"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </>
                    {/* ) : null} */}

                    {/* {permissions?.includes(
                      permissionList.View_Consultant_Dashboard
                    ) ? ( */}
                    <>
                      {userType === userTypes?.SystemAdmin ||
                      userType === userTypes?.Admin ||
                      userType === userTypes?.ComplianceManager ? (
                        <>
                          <ButtonForFunction
                            color={"primary"}
                            func={() =>
                              redirectToConsultantDashboard(companion?.id)
                            }
                            className={"mx-1 btn-sm"}
                            icon={
                              <i className="fas fa-tachometer-alt-fast"></i>
                            }
                            permission={6}
                          />
                        </>
                      ) : null}
                    </>
                    {/* ) : null} */}

                    <>
                      {adminPermission ? (
                        <ButtonForFunction
                          func={() => handleEdit(companion)}
                          color={"warning"}
                          className={"mx-1 btn-sm"}
                          icon={<i className="fas fa-edit"></i>}
                        />
                      ) : null}

                      {adminPermission ? (
                        <ButtonForFunction
                          color={"danger"}
                          className={"mx-1 btn-sm"}
                          func={() => toggleDanger(companion)}
                          icon={<i className="fas fa-trash-alt"></i>}
                        />
                      ) : null}
                    </>
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
            Change password for {passData?.firstName} {passData?.lastName}
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
                buttonStatus={buttonStatus}
              />
            </FormGroup>
          </form>
        </ModalBody>
      </Modal>

      <ConfirmModal
        text="Do You Want To Delete This Companion  ? Once Deleted it can't be Undone!"
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

export default CompanionTable;
