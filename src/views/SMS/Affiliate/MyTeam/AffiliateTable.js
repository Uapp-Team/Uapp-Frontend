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

const AffiliateTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
  userTypeId,
  userTypes,
  affiliateTeamList,
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

            {/* {permissions?.includes(
              permissionList.Consultant_Password_Change
            ) ? (
              <>{tableData[3]?.isActive ? <th>Password</th> : null}</>
            ) : null} */}

            {tableData[7]?.isActive ? <th>Started</th> : null}
            {tableData[11]?.isActive ? <th>Status</th> : null}

            {permissions?.includes(
              permissionList?.Change_Consultant_AccountStatus
            ) ? (
              <>{tableData[12]?.isActive ? <th>BlackList</th> : null}</>
            ) : null}

            {tableData[13]?.isActive ? (
              <th style={{ width: "8%" }} className="text-center">
                Action
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {affiliateTeamList?.map((affiliateTeam, i) => (
            <tr key={affiliateTeam?.id} style={{ textAlign: "center" }}>
              {tableData[0]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <Link
                    className="text-id hover"
                    to={`/affiliate-profile/${affiliateTeam?.id}`}
                  >
                    {affiliateTeam?.uappId}
                  </Link>
                </td>
              ) : null}

              {tableData[1]?.isActive ? (
                <td>
                  <div className="cursor-pointer hyperlink-hover">
                    <Link
                      className="text-id hover"
                      to={`/affiliate-profile/${affiliateTeam?.id}`}
                    >
                      {affiliateTeam?.name}
                    </Link>
                  </div>
                </td>
              ) : null}
              {tableData[2]?.isActive ? (
                <td>
                  <div className="d-flex justify-content-center">
                    <PopOverText
                      value={
                        affiliateTeam?.phone &&
                        affiliateTeam?.phone.includes("+")
                          ? affiliateTeam?.phone
                          : affiliateTeam?.phone &&
                            !affiliateTeam?.phone.includes("+")
                          ? "+" + affiliateTeam?.phone
                          : null
                      }
                      btn={<i class="fas fa-phone"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                    <PopOverText
                      value={affiliateTeam?.email}
                      btn={<i className="far fa-envelope"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                  </div>
                </td>
              ) : null}
              {/* 
              {permissions?.includes(
                permissionList.Consultant_Password_Change
              ) ? (
                <>
                  {tableData[3]?.isActive ? (
                    <td>
                      <span
                        className="passwordChangeStyle"
                        onClick={() => handlePass(consultant)}
                      >
                        Change
                      </span>
                    </td>
                  ) : null}
                </>
              ) : null} */}

              {tableData[7]?.isActive ? (
                <td>{dateFormate(affiliateTeam?.started)}</td>
              ) : null}
              {tableData[11]?.isActive ? (
                <td>{affiliateTeam?.accountStatus}</td>
              ) : null}
              {permissions?.includes(
                permissionList?.Change_Consultant_AccountStatus
              ) ? (
                <>
                  {tableData[12]?.isActive ? (
                    <td>
                      <ToggleSwitch
                        defaultChecked={!affiliateTeam?.isActive}
                        onChange={() => handleUpdate(affiliateTeam)}
                      />
                    </td>
                  ) : null}
                </>
              ) : null}

              {tableData[13]?.isActive ? (
                <td style={{ width: "8%" }} className="text-center">
                  <ButtonGroup variant="text">
                    {permissions?.includes(permissionList.View_Consultant) ? (
                      <>
                        <button
                          onClick={() =>
                            redirectToConsultantProfile(affiliateTeam?.id)
                          }
                          className="mx-1 btn-sm consultant-eye-button"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      </>
                    ) : null}

                    {permissions?.includes(
                      permissionList.View_Consultant_Dashboard
                    ) ? (
                      <>
                        {userType === userTypes?.SystemAdmin ||
                        userType === userTypes?.Admin ||
                        userType === userTypes?.ComplianceManager ? (
                          <>
                            <ButtonForFunction
                              color={"primary"}
                              func={() =>
                                redirectToConsultantDashboard(affiliateTeam?.id)
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

export default AffiliateTable;
