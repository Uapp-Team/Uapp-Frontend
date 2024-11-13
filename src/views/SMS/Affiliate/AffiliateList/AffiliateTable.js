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
  affiliateList,
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
            {adminPermission && tableData[4]?.isActive ? (
              <th>Consultant</th>
            ) : null}
            {tableData[5]?.isActive ? <th>Started</th> : null}
            {tableData[6]?.isActive ? <th>Invitation</th> : null}
            {tableData[6]?.isActive ? <th>Leads</th> : null}
            {tableData[6]?.isActive ? <th>Students</th> : null}
            {tableData[7]?.isActive ? <th>Team Member</th> : null}
            {tableData[7]?.isActive ? <th>Application</th> : null}
            {tableData[7]?.isActive ? <th>Registered</th> : null}
            {tableData[8]?.isActive ? <th>Status</th> : null}

            {tableData[9]?.isActive ? <th>Branch</th> : null}

            {permissions?.includes(
              permissionList?.Change_Consultant_AccountStatus
            ) ? (
              <>{tableData[10]?.isActive ? <th>BlackList</th> : null}</>
            ) : null}

            {tableData[11]?.isActive ? (
              <th style={{ width: "8%" }} className="text-center">
                Action
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {affiliateList?.map((affiliate, i) => (
            <tr key={affiliate?.id} style={{ textAlign: "center" }}>
              {tableData[0]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <Link
                    className="text-id hover"
                    to={`/affiliate-profile/${affiliate?.id}`}
                  >
                    {affiliate?.viewId}
                  </Link>
                </td>
              ) : null}

              {tableData[1]?.isActive ? (
                <td>
                  <div className="cursor-pointer hyperlink-hover">
                    <Link
                      className="text-id hover"
                      to={`/affiliate-profile/${affiliate?.id}`}
                    >
                      {affiliate?.name}
                    </Link>
                  </div>
                  {affiliate?.isEmailInStudents === true ? (
                    <p className="from-student ">From Student</p>
                  ) : null}
                </td>
              ) : null}
              {tableData[2]?.isActive ? (
                <td>
                  <div className="d-flex justify-content-center">
                    <PopOverText
                      value={
                        affiliate?.phone && affiliate?.phone.includes("+")
                          ? affiliate?.phone
                          : affiliate?.phone && !affiliate?.phone.includes("+")
                          ? "+" + affiliate?.phone
                          : null
                      }
                      btn={<i class="fas fa-phone"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                    <PopOverText
                      value={affiliate?.email}
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
                        onClick={() => handlePass(affiliate)}
                      >
                        Change
                      </span>
                    </td>
                  ) : null}
                </>
              ) : null}

              {tableData[4]?.isActive ? <td>{affiliate?.parentName}</td> : null}
              {adminPermission && tableData[4]?.isActive ? (
                <td>{affiliate?.consultantName}</td>
              ) : null}

              {tableData[5]?.isActive ? (
                <td>{dateFormate(affiliate?.createdOn)}</td>
              ) : null}

              {tableData[6]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-first"
                      onClick={() => {
                        history.push(
                          `/affiliate-Invitation-list/${affiliate?.id}`
                        );
                      }}
                    >
                      {affiliate?.invitationCount}
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
                        history.push(`/affiliate-lead-list/${affiliate?.id}`);
                      }}
                    >
                      {affiliate?.leadCount}
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
                          `/affiliate-student-list/${affiliate?.id}`
                        );
                      }}
                    >
                      {affiliate?.studentCount}
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
                        history.push(`/affiliate-team-List/${affiliate?.id}`);
                      }}
                    >
                      {affiliate?.teamMembersCount}
                    </span>
                  </div>
                </td>
              ) : null}
              {tableData[7]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-third"
                      onClick={() => {
                        history.push(
                          `/ApplicationListByAffiliate/${affiliate?.id}`
                        );
                      }}
                    >
                      {affiliate?.totalApplicationCount}
                    </span>
                  </div>
                </td>
              ) : null}
              {tableData[7]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-fourth-no-pointer"
                      onClick={() => {
                        history.push(
                          `/affiliate-applications/${2}/${3}/${affiliate?.id}`
                        );
                      }}
                    >
                      {affiliate?.totalRegisteredApplicationCount}
                    </span>
                  </div>
                </td>
              ) : null}
              {tableData[8]?.isActive ? (
                <td>{affiliate?.accountStatus}</td>
              ) : null}

              {tableData[9]?.isActive ? <td>{affiliate?.branchName}</td> : null}

              {permissions?.includes(
                permissionList?.Change_Consultant_AccountStatus
              ) ? (
                <>
                  {tableData[10]?.isActive ? (
                    <td>
                      <ToggleSwitch
                        defaultChecked={!affiliate?.isActive}
                        onChange={() => handleUpdate(affiliate)}
                      />
                    </td>
                  ) : null}
                </>
              ) : null}

              {tableData[11]?.isActive ? (
                <td style={{ width: "8%" }} className="text-center">
                  <ButtonGroup variant="text">
                    {/* {permissions?.includes(permissionList.View_Consultant) ? ( */}
                    <>
                      <button
                        onClick={() =>
                          redirectToConsultantProfile(affiliate?.id)
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
                              redirectToConsultantDashboard(affiliate?.id)
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
                          func={() => handleEdit(affiliate)}
                          color={"warning"}
                          className={"mx-1 btn-sm"}
                          icon={<i className="fas fa-edit"></i>}
                        />
                      ) : null}

                      {adminPermission ? (
                        <ButtonForFunction
                          color={"danger"}
                          className={"mx-1 btn-sm"}
                          func={() => toggleDanger(affiliate)}
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
