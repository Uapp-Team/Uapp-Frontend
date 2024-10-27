import React, { useState } from "react";
import {
  ButtonGroup,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Table,
} from "reactstrap";

import PopOverText from "../../../../../../components/PopOverText";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import ToggleSwitch from "../../../../Components/ToggleSwitch";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import { dateFormate } from "../../../../../../components/date/calenderFormate";

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
    <div className="table-responsive mb-2 fixedhead" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {/* {tableData[0]?.isActive ? <th>SL/NO</th> : null} */}
            {tableData[1]?.isActive ? (
              <th>
                UAPP ID{" "}
                <span className="pointer">
                  <i class="fas fa-info-circle" title="Its also refer code"></i>
                </span>
              </th>
            ) : null}
            {tableData[2]?.isActive ? <th>Name</th> : null}
            {tableData[2]?.isActive ? <th>Contact</th> : null}
            {permissions?.includes(
              permissionList.Consultant_Password_Change
            ) ? (
              <>{tableData[5]?.isActive ? <th>Password</th> : null}</>
            ) : null}
            {tableData[6]?.isActive ? <th>Branch</th> : null}
            {tableData[7]?.isActive ? <th>Parent</th> : null}
            {tableData[8]?.isActive ? <th>Type</th> : null}
            {tableData[9]?.isActive ? <th>Started</th> : null}
            {tableData[10]?.isActive ? <th>Student</th> : null}
            {tableData[11]?.isActive ? <th>Applications</th> : null}
            {tableData[12]?.isActive ? <th>Associates</th> : null}

            {/* {permissions?.includes(
              permissionList?.Change_Consultant_AccountStatus
            ) ? (
              <>{tableData[13]?.isActive ? <th>Status</th> : null}</>
            ) : null} */}
            {tableData[13]?.isActive ? <th>Status</th> : null}
            {permissions?.includes(
              permissionList?.Change_Consultant_AccountStatus
            ) ? (
              <>{tableData[13]?.isActive ? <th>BlackList</th> : null}</>
            ) : null}

            {tableData[14]?.isActive ? (
              <th style={{ width: "8%" }} className="text-center">
                Action
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {consultantList?.map((consultant, i) => (
            <tr key={consultant?.id} style={{ textAlign: "center" }}>
              {/* {tableData[0]?.isActive ? (
                <th scope="row">{serialNum + i}</th>
              ) : null} */}
              {tableData[1]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <span
                    onClick={() => {
                      history.push(`/consultantProfile/${consultant?.id}`);
                    }}
                  >
                    {consultant?.viewId}
                  </span>
                </td>
              ) : null}

              {tableData[2]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <span
                    onClick={() => {
                      history.push(`/consultantProfile/${consultant?.id}`);
                    }}
                  >
                    {" "}
                    {consultant?.nameTitle?.name} {consultant?.firstName}{" "}
                    {consultant?.lastName}
                  </span>
                </td>
              ) : null}
              {tableData[2]?.isActive ? (
                <td>
                  <div className=" d-flex">
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

              {permissions?.includes(
                permissionList.Consultant_Password_Change
              ) ? (
                <>
                  {tableData[5]?.isActive ? (
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
              {tableData[6]?.isActive ? (
                <td>{consultant?.branch?.name}</td>
              ) : null}
              {tableData[7]?.isActive ? (
                <td>{consultant?.parentConsultantName}</td>
              ) : null}
              {tableData[8]?.isActive ? (
                <td>{consultant?.consultantType?.name}</td>
              ) : null}
              {tableData[9]?.isActive ? (
                <td>{dateFormate(consultant?.createdOn)}</td>
              ) : null}

              {permissions?.includes(permissionList.View_Consultant_Student) ? (
                <>
                  {tableData[10]?.isActive ? (
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
                          {" "}
                          {consultant?.studentCount}
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
                  {tableData[11]?.isActive ? (
                    <td>
                      {consultant?.applicationCount > 0 ? (
                        <div style={{ marginTop: "5px" }}>
                          <span
                            onClick={() =>
                              redirectToApplications(consultant?.id)
                            }
                            className="Count-second"
                          >
                            {consultant?.applicationCount}
                          </span>
                        </div>
                      ) : (
                        <div style={{ marginTop: "5px" }}>
                          <span className="Count-second">
                            {consultant?.applicationCount}
                          </span>
                        </div>
                      )}
                    </td>
                  ) : null}
                </>
              ) : (
                <>
                  {tableData[11]?.isActive ? (
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
                  {tableData[12]?.isActive ? (
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
                  {tableData[12]?.isActive ? (
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
              {tableData[13]?.isActive ? (
                <td>{consultant?.accountStatus?.statusName}</td>
              ) : null}

              {permissions?.includes(
                permissionList?.Change_Consultant_AccountStatus
              ) ? (
                <>
                  {tableData[13]?.isActive ? (
                    <td>
                      <ToggleSwitch
                        defaultChecked={!consultant?.isActive}
                        onChange={() => handleUpdate(consultant)}
                      />
                    </td>
                  ) : null}
                </>
              ) : null}

              {tableData[14]?.isActive ? (
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
          <form onSubmit={submitModalForm} className="mt-3">
            <FormGroup row>
              <Col md="8">
                <span style={{ color: "#2ea3ff" }}>
                  <span className="text-danger">*</span> Password{" "}
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
                  <span className="text-danger">*</span> Confirm Password{" "}
                </span>

                <Input
                  type="password"
                  onChange={(e) => {
                    verifyPass();
                    confirmPassword(e);
                  }}
                />

                <br />
                {<span className="text-danger">{passError}</span>}
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
