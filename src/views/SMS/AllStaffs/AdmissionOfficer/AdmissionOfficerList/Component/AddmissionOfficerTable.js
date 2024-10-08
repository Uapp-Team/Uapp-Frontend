import React from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import ButtonLoader from "../../../../Components/ButtonLoader";
import ToggleSwitch from "../../../../Components/ToggleSwitch";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import { userTypes } from "../../../../../../constants/userTypeConstant";

const AddmissionOfficerTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
  officerList,
  history,
  redirectToAssignPage,
  redirectToSubjectPage,
  handleAccountStatus,
  handlRedirectToAdmissionofficerDetails,
  redirectEdit,
  toggleDanger,
  deleteModal,
  closeDeleteModal,
  officerName,
  handleDelete,
  buttonStatus,
  progress,
}) => {
  const userType = localStorage.getItem("userType");

  return (
    <div className="table-responsive" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            {tableData[0]?.isActive ? <th>SL/NO</th> : null}
            {tableData[1]?.isActive ? <th>UAPP ID</th> : null}
            {tableData[2]?.isActive ? <th>Name</th> : null}
            {tableData[3]?.isActive ? <th>Provider</th> : null}
            {tableData[4]?.isActive ? <th>Email</th> : null}
            {tableData[5]?.isActive ? <th>Phone No</th> : null}
            {permissions?.includes(
              permissionList.AdmissionOfficer_Assign_University
            ) ? (
              <>
                {tableData[6]?.isActive ? <th>Assigned University</th> : null}
              </>
            ) : null}
            {permissions?.includes(
              permissionList?.AdmissionOfficer_Assign_Subject
            ) ? (
              <>{tableData[7]?.isActive ? <th>Assigned Courses</th> : null}</>
            ) : null}
            {permissions?.includes(
              permissionList.AdmissionOfficer_Account_Status
            ) ? (
              <>{tableData[8]?.isActive ? <th>Account Status</th> : null}</>
            ) : null}
            {tableData[9]?.isActive ? (
              <th style={{ width: "8%" }} className="text-center">
                Action
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {officerList?.map((officer, i) => (
            <tr key={i} style={{ textAlign: "center" }}>
              {tableData[0]?.isActive ? <th scope="row">{1 + i}</th> : null}
              {tableData[1]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <span
                    onClick={() => {
                      history.push(`/admissionOfficerDetails/${officer?.id}`);
                    }}
                  >
                    {officer?.viewId}
                  </span>
                </td>
              ) : null}

              {tableData[2]?.isActive ? (
                <td className="cursor-pointer hyperlink-hover">
                  <span
                    onClick={() => {
                      history.push(`/admissionOfficerDetails/${officer?.id}`);
                    }}
                  >
                    {officer?.fullName}
                  </span>
                </td>
              ) : null}

              {tableData[3]?.isActive ? <td>{officer?.provider}</td> : null}

              {tableData[4]?.isActive ? <td>{officer?.email}</td> : null}

              {tableData[5]?.isActive ? <td>{officer?.phoneNumber}</td> : null}

              {permissions?.includes(
                permissionList.AdmissionOfficer_Assign_University
              ) ? (
                <>
                  {tableData[6]?.isActive ? (
                    <td>
                      {" "}
                      <span
                        className="badge badge-secondary"
                        style={{ cursor: "pointer" }}
                      >
                        <span
                          onClick={() =>
                            redirectToAssignPage(
                              officer?.providerId,
                              officer?.id
                            )
                          }
                          className="text-decoration-none"
                        >
                          View
                        </span>
                      </span>{" "}
                    </td>
                  ) : null}
                </>
              ) : null}
              {permissions?.includes(
                permissionList.AdmissionOfficer_Assign_Subject
              ) ? (
                <>
                  {tableData[7]?.isActive ? (
                    <td>
                      {" "}
                      <span
                        className="badge badge-secondary"
                        style={{ cursor: "pointer" }}
                      >
                        <span
                          onClick={() => redirectToSubjectPage(officer?.id)}
                          className="text-decoration-none"
                        >
                          View
                        </span>
                      </span>{" "}
                    </td>
                  ) : null}
                </>
              ) : null}

              {permissions?.includes(
                permissionList.AdmissionOfficer_Account_Status
              ) ? (
                <>
                  {tableData[8]?.isActive ? (
                    <td>
                      {
                        <ToggleSwitch
                          defaultChecked={
                            officer?.isActive == false ? false : true
                          }
                          onChange={(e) => {
                            handleAccountStatus(e, officer?.id);
                          }}
                        />
                      }
                    </td>
                  ) : null}
                </>
              ) : null}

              {tableData[9]?.isActive ? (
                <td style={{ width: "8%" }} className="text-center">
                  <ButtonGroup variant="text">
                    {permissions?.includes(
                      permissionList?.View_AdmissionOfficer_Details
                    ) ? (
                      <ButtonForFunction
                        func={() =>
                          handlRedirectToAdmissionofficerDetails(officer?.id)
                        }
                        color={"primary"}
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-eye"></i>}
                        permission={6}
                      />
                    ) : null}
                    {permissions?.includes(
                      permissionList.Update_AdmissionOfficer
                    ) ? (
                      <ButtonForFunction
                        func={() => redirectEdit(officer?.id)}
                        color={"warning"}
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-edit"></i>}
                        permission={6}
                      />
                    ) : null}{" "}
                    {permissions?.includes(
                      permissionList.Delete_AdmissionOfficer
                    ) ? (
                      <ButtonForFunction
                        color={"danger"}
                        func={() => toggleDanger(officer)}
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-trash-alt"></i>}
                        permission={6}
                      />
                    ) : null}{" "}
                  </ButtonGroup>
                  <ConfirmModal
                    text="Do You Want To Delete This Admission Officer ? Once Deleted it can't be Undone "
                    // ${delData?.name}
                    isOpen={deleteModal}
                    toggle={closeDeleteModal}
                    cancel={closeDeleteModal}
                    buttonStatus={buttonStatus}
                    progress={progress}
                    confirm={handleDelete}
                  ></ConfirmModal>

                  {/* <Modal
                    isOpen={deleteModal}
                    toggle={closeDeleteModal}
                    className="uapp-modal"
                  >
                    <ModalBody>
                      <p>
                        Are You Sure to Delete this Admission Officer sakib?
                        Once Deleted it can't be Undone!
                      </p>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        color="danger"
                        onClick={handleDelete}
                        disabled={buttonStatus}
                      >
                        {progress ? <ButtonLoader /> : "YES"}
                      </Button>
                      <Button onClick={closeDeleteModal}>NO</Button>
                    </ModalFooter>
                  </Modal> */}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AddmissionOfficerTable;
