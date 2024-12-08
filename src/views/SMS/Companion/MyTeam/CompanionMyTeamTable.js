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

const CompanionMyTeamTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
  userTypeId,
  userTypes,
  companionTeamList,
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
  return (
    <div className="table-responsive fixedhead mb-2" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {tableData[0]?.isActive ? <th>UAPP ID </th> : null}
            {tableData[1]?.isActive ? <th>Full Name</th> : null}
            {tableData[2]?.isActive ? <th>Contact</th> : null}

            {tableData[3]?.isActive ? <th>Parent</th> : null}

            {tableData[4]?.isActive ? <th>Started</th> : null}
            {tableData[5]?.isActive ? <th>Pending Invitation</th> : null}
            {tableData[6]?.isActive ? <th>Leads</th> : null}
            {tableData[6]?.isActive ? <th>Student</th> : null}
            {tableData[7]?.isActive ? <th>Team Member</th> : null}
            {tableData[8]?.isActive ? <th>Application</th> : null}
            {tableData[9]?.isActive ? <th>Registered</th> : null}

            {tableData[10]?.isActive ? (
              <th style={{ width: "8%" }} className="text-center">
                Action
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {companionTeamList?.map((companionTeam, i) => (
            <tr key={companionTeam?.id} style={{ textAlign: "center" }}>
              {tableData[0]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <Link
                    className="text-id hover"
                    to={`/companion-profile/${companionTeam?.id}`}
                  >
                    {companionTeam?.uappId}
                  </Link>
                </td>
              ) : null}

              {tableData[1]?.isActive ? (
                <td>
                  <div className="cursor-pointer hyperlink-hover">
                    <Link
                      className="text-id hover"
                      to={`/companion-profile/${companionTeam?.id}`}
                    >
                      {companionTeam?.name}
                    </Link>
                  </div>
                </td>
              ) : null}
              {tableData[2]?.isActive ? (
                <td>
                  <div className="d-flex justify-content-center">
                    <PopOverText
                      value={
                        companionTeam?.phone &&
                        companionTeam?.phone.includes("+")
                          ? companionTeam?.phone
                          : companionTeam?.phone &&
                            !companionTeam?.phone.includes("+")
                          ? "+" + companionTeam?.phone
                          : null
                      }
                      btn={<i class="fas fa-phone"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                    <PopOverText
                      value={companionTeam?.email}
                      btn={<i className="far fa-envelope"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                  </div>
                </td>
              ) : null}

              {tableData[3]?.isActive ? (
                <td>{companionTeam?.parentName}</td>
              ) : null}

              {tableData[4]?.isActive ? (
                <td>{dateFormate(companionTeam?.createdOn)}</td>
              ) : null}
              {tableData[5]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-first"
                      onClick={() => {
                        history.push(
                          `/companion-Invitation-list/${companionTeam?.id}`
                        );
                      }}
                    >
                      {companionTeam?.invitationCount}
                    </span>
                  </div>
                </td>
              ) : null}

              {tableData[6]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-fifth-no-pointer"
                      onClick={() => {
                        history.push(
                          `/companion-lead-list/${companionTeam?.id}`
                        );
                      }}
                    >
                      {companionTeam?.leadCount}
                    </span>
                  </div>
                </td>
              ) : null}
              {tableData[6]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-sixth-no-pointer"
                      onClick={() => {
                        history.push(
                          `/companion-student-list/${companionTeam?.id}`
                        );
                      }}
                    >
                      {companionTeam?.studentCount}
                    </span>
                  </div>
                </td>
              ) : null}

              {tableData[7]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-second"
                      onClick={() => {
                        history.push(
                          `/companion-team-List/${companionTeam?.id}`
                        );
                      }}
                    >
                      {companionTeam?.teammembersCount}
                    </span>
                  </div>
                </td>
              ) : null}

              {tableData[8]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-third"
                      onClick={() => {
                        history.push(
                          `/companion-application-List-Team-Members/${companionTeam?.id}`
                        );
                      }}
                    >
                      {companionTeam?.totalApplicationCount}
                    </span>
                  </div>
                </td>
              ) : null}
              {tableData[9]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-fourth-no-pointer"
                      onClick={() => {
                        history.push(
                          `/companion-registered-application-List-Team-Members/${companionTeam?.id}`
                        );
                      }}
                    >
                      {companionTeam?.totalRegisterApplicationCount}
                    </span>
                  </div>
                </td>
              ) : null}

              {tableData[10]?.isActive ? (
                <td style={{ width: "8%" }} className="text-center">
                  <ButtonGroup variant="text">
                    {/* {permissions?.includes(permissionList.View_Consultant) ? ( */}
                    <>
                      <button
                        onClick={() =>
                          redirectToConsultantProfile(companionTeam?.id)
                        }
                        className="mx-1 btn-sm consultant-eye-button"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
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
        text="Do You Want To Delete This Affiliate ? Once Deleted it can't be Undone!"
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

export default CompanionMyTeamTable;
