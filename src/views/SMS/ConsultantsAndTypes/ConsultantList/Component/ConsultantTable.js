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
import { dateFormate } from "../../../../../components/date/calenderFormate";
import ConsultantActive from "./ConsultantActive";
import ChangePassword from "../../../../../components/password/ChangePassword";

const ConsultantTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
  userTypeId,
  userTypes,
  consultantList,
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
  redirectToConsultantProfile,
  userType,
  redirectToConsultantDashboard,
  handleEdit,
  toggleDanger,
  deleteModal,
  setDeleteModal,
  handleDeleteData,
  buttonStatus,
  pass,
  cPass,
}) => {
  const [popoverOpen, setPopoverOpen] = useState("");
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [PasswordEye, setPasswordEye] = useState(false);
  return (
    <div className="table-responsive fixedhead mb-2" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {tableData[0]?.isActive ? (
              <th>
                UAPP ID{" "}
                <span className="pointer">
                  <i class="fas fa-info-circle" title="Its also refer code"></i>
                </span>
              </th>
            ) : null}
            {tableData[1]?.isActive ? <th>Name</th> : null}
            {tableData[2]?.isActive ? (
              <th className="d-print-none">Contact</th>
            ) : null}

            <th className="d-none d-print-block">Number</th>

            <th className="d-none d-print-block">Email</th>

            {permissions?.includes(
              permissionList.Consultant_Password_Change
            ) ? (
              <>{tableData[3]?.isActive ? <th>Password</th> : null}</>
            ) : null}
            {tableData[4]?.isActive ? <th>Branch</th> : null}
            {tableData[5]?.isActive ? <th>Sales Team Leader</th> : null}
            {tableData[6]?.isActive ? <th>Parent Consultant</th> : null}
            {tableData[7]?.isActive ? <th>Type</th> : null}
            {tableData[8]?.isActive ? <th>Started</th> : null}
            {tableData[9]?.isActive ? <th>Student</th> : null}
            {tableData[10]?.isActive ? <th>Applications</th> : null}
            {tableData[11]?.isActive ? <th>Associates</th> : null}
            {tableData[12]?.isActive ? <th>Affiliates</th> : null}
            {tableData[13]?.isActive ? <th>Referrers</th> : null}

            {/* {permissions?.includes(
              permissionList?.Change_Consultant_AccountStatus
            ) ? (
              <>{tableData[13]?.isActive ? <th>Status</th> : null}</>
            ) : null} */}
            {tableData[14]?.isActive ? <th>BAC Cert</th> : null}
            {tableData[15]?.isActive ? <th>Status</th> : null}
            {tableData[16]?.isActive ? <th>Tier</th> : null}
            {permissions?.includes(
              permissionList?.Change_Consultant_AccountStatus
            ) ? (
              <>{tableData[17]?.isActive ? <th>BlackList</th> : null}</>
            ) : null}

            {tableData[18]?.isActive ? (
              <th style={{ width: "8%" }} className="text-center">
                Action
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {consultantList?.map((consultant, i) => (
            <tr key={consultant?.id} style={{ textAlign: "center" }}>
              {tableData[0]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <Link
                    className="text-id hover"
                    to={`/consultantProfile/${consultant?.id}`}
                  >
                    {consultant?.viewId}
                  </Link>
                </td>
              ) : null}

              {tableData[1]?.isActive ? (
                <td>
                  <div className="cursor-pointer hyperlink-hover">
                    <Link
                      className="text-id hover"
                      to={`/consultantProfile/${consultant?.id}`}
                    >
                      {consultant?.nameTitle?.name} {consultant?.firstName}{" "}
                      {consultant?.lastName}
                    </Link>
                  </div>
                  {consultant?.isEmailInStudents === true ? (
                    <p className="from-student ">From Student</p>
                  ) : null}
                </td>
              ) : null}
              {tableData[2]?.isActive ? (
                <td>
                  <div className="d-flex d-print-none">
                    <PopOverText
                      value={
                        consultant?.phoneNumber &&
                        consultant?.phoneNumber.includes("+")
                          ? consultant?.phoneNumber
                          : consultant?.phoneNumber &&
                            !consultant?.phoneNumber.includes("+")
                          ? "+" + consultant?.phoneNumber
                          : null
                      }
                      btn={<i class="fas fa-phone"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                    <PopOverText
                      value={consultant?.email}
                      btn={<i className="far fa-envelope"></i>}
                      popoverOpen={popoverOpen}
                      setPopoverOpen={setPopoverOpen}
                    />
                  </div>
                </td>
              ) : null}

              <td className="d-none d-print-block">
                {consultant?.phoneNumber &&
                consultant?.phoneNumber.includes("+")
                  ? consultant?.phoneNumber
                  : consultant?.phoneNumber &&
                    !consultant?.phoneNumber.includes("+")
                  ? "+" + consultant?.phoneNumber
                  : null}
              </td>

              <td className="d-none d-print-block">{consultant?.email}</td>

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
              ) : null}
              {tableData[4]?.isActive ? (
                <td>{consultant?.branch?.name}</td>
              ) : null}
              {tableData[5]?.isActive ? (
                <td>{consultant?.salesTeamLeaderName}</td>
              ) : null}
              {tableData[6]?.isActive ? (
                <td>{consultant?.parentConsultantName}</td>
              ) : null}
              {tableData[7]?.isActive ? (
                <td>{consultant?.consultantType?.name}</td>
              ) : null}
              {tableData[8]?.isActive ? (
                <td>{dateFormate(consultant?.createdOn)}</td>
              ) : null}

              {permissions?.includes(permissionList.View_Consultant_Student) ? (
                <>
                  {tableData[9]?.isActive ? (
                    <td>
                      <div style={{ marginTop: "5px" }}>
                        <span
                          onClick={() => {
                            history.push(
                              `/studentByConsultant/${consultant?.id}`
                            );
                          }}
                          className="Count-first"
                        >
                          {consultant?.studentCount}
                        </span>
                      </div>
                    </td>
                  ) : null}
                </>
              ) : (
                <>
                  {tableData[9]?.isActive ? (
                    <td>
                      <div style={{ marginTop: "5px" }}>
                        <span className="Count-first">
                          {consultant?.studentCount}
                        </span>
                      </div>
                    </td>
                  ) : null}
                </>
              )}

              {permissions?.includes(
                permissionList.View_Consultant_Application
              ) ? (
                <>
                  {tableData[10]?.isActive ? (
                    <td>
                      <div style={{ marginTop: "5px" }}>
                        <span
                          onClick={() => redirectToApplications(consultant?.id)}
                          className="Count-second"
                        >
                          {consultant?.applicationCount}
                        </span>
                      </div>
                    </td>
                  ) : null}
                </>
              ) : (
                <>
                  {tableData[10]?.isActive ? (
                    <td>
                      <div style={{ marginTop: "5px" }}>
                        <span className="Count-second">
                          {consultant?.applicationCount}
                        </span>
                      </div>
                    </td>
                  ) : null}
                </>
              )}

              {permissions?.includes(
                permissionList.View_Consultant_Associate
              ) ? (
                <>
                  {tableData[11]?.isActive ? (
                    <td>
                      <div style={{ marginTop: "5px" }}>
                        <span
                          onClick={() => {
                            history.push(`/associates/${consultant?.id}`);
                          }}
                          className="Count-third"
                        >
                          {consultant?.childConsultantCount}
                        </span>
                      </div>
                    </td>
                  ) : null}
                </>
              ) : (
                <>
                  {tableData[11]?.isActive ? (
                    <td>
                      <div style={{ marginTop: "5px" }}>
                        <span className="Count-third">
                          {consultant?.childConsultantCount}
                        </span>
                      </div>
                    </td>
                  ) : null}
                </>
              )}
              {tableData[12]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-fifth"
                      onClick={() => {
                        history.push(
                          `/ConsultantByAffiliate/${consultant?.id}`
                        );
                      }}
                    >
                      {consultant?.affiliateCount}
                    </span>
                  </div>
                </td>
              ) : null}

              {tableData[13]?.isActive ? (
                <td>
                  <div style={{ marginTop: "5px" }}>
                    <span
                      className="Count-fourth"
                      onClick={() => {
                        history.push(`/ConsultantByReferrer/${consultant?.id}`);
                      }}
                    >
                      {consultant?.companionCount}
                    </span>
                  </div>
                </td>
              ) : null}
              {tableData[14]?.isActive ? (
                <td>
                  {consultant?.isBacCertificateApproved === true
                    ? "Approved"
                    : "Not Approved"}
                </td>
              ) : null}
              {tableData[15]?.isActive ? (
                <td>{consultant?.accountStatus?.statusName}</td>
              ) : null}
              {tableData[16]?.isActive ? (
                <td>{consultant?.tier !== "No Tier" && consultant?.tier}</td>
              ) : null}

              {permissions?.includes(
                permissionList?.Change_Consultant_AccountStatus
              ) ? (
                <>
                  {tableData[17]?.isActive ? (
                    <td>
                      <ConsultantActive
                        id={consultant?.id}
                        isActive={!consultant?.isActive}
                      />
                    </td>
                  ) : null}
                </>
              ) : null}

              {tableData[18]?.isActive ? (
                <td style={{ width: "8%" }} className="text-center">
                  <ButtonGroup variant="text">
                    {permissions?.includes(permissionList.View_Consultant) ? (
                      <>
                        <button
                          onClick={() =>
                            redirectToConsultantProfile(consultant?.id)
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
                                redirectToConsultantDashboard(consultant?.id)
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

                    {consultant?.id !== 1 ? (
                      <>
                        {permissions?.includes(
                          permissionList.Edit_Consultant
                        ) ? (
                          <ButtonForFunction
                            func={() => handleEdit(consultant)}
                            color={"warning"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-edit"></i>}
                          />
                        ) : null}

                        {permissions?.includes(
                          permissionList.Delete_Consultant
                        ) ? (
                          <ButtonForFunction
                            color={"danger"}
                            className={"mx-1 btn-sm"}
                            func={() => toggleDanger(consultant)}
                            icon={<i className="fas fa-trash-alt"></i>}
                          />
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
        text="Do You Want To Delete This Consultant ? Once Deleted it can't be Undone!"
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

export default ConsultantTable;
