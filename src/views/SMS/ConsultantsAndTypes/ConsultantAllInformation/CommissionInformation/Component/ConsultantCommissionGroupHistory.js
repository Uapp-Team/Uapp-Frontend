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
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import { dateFormate } from "../../../../../../components/date/calenderFormate";

const ConsultantCommissionGroupHistory = ({
  userTypeId,
  userTypes,
  commissionGroupList,
  handleDate,
  handleReAssign,
  toggleDanger,
  deleteModal,
  closeDeleteModal,
  delCommissionName,
  delCommissionId,
  buttonStatus,
  handleDeleteCommission,
  reAssignModal,
  closeReAssignModal,
  commissionName,
  handleReAssignSubmit,
  commissionId,
  progress,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <div className="mt-5 mx-1">
      <div className="hedding-titel d-flex justify-content-between ms-2 mb-4">
        <p className="section-title">
          Consultant Commission Group History : Assigned Commission Groups
        </p>
      </div>

      <div className="table-responsive mt-3">
        <Table>
          <thead className="tablehead">
            <tr>
              {/* <th>SL/No</th> */}
              <th>Name</th>
              <th>Applications</th>
              <th>Status</th>
              <th>Date Range</th>
              {userTypeId == userTypes?.Consultant ? null : <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {commissionGroupList?.map((commission, i) => (
              <tr key={commission?.id}>
                {/* <th scope="row">{1 + i}</th> */}
                <td>{commission?.commissionGroup?.name}</td>
                <td>{commission?.applicationCount}</td>
                <td>
                  {commission?.isActive == false ? "Deactivated" : "Active"}
                </td>
                <td>
                  {dateFormate(commission?.createdOn)}
                  {" to "}
                  {dateFormate(commission?.updatedOn)}
                </td>
                {userTypeId == userTypes?.Consultant ? null : (
                  <td style={{ width: "20%" }} className="text-center">
                    <ButtonGroup variant="text">
                      {permissions?.includes(
                        permissionList?.Assign_Commission_Group
                      ) && (
                        <>
                          <SaveButton
                            text="Re-Assign"
                            action={() => handleReAssign(commission)}
                            progress={progress}
                            buttonStatus={buttonStatus}
                            permission={6}
                          />

                          <ButtonForFunction
                            func={() => toggleDanger(commission)}
                            color={"danger"}
                            className={"mx-1 btn-sm"}
                            name={"Delete"}
                            permission={6}
                          />
                        </>
                      )}

                      {/* delete modal */}

                      <Modal
                        isOpen={deleteModal}
                        toggle={closeDeleteModal}
                        className="uapp-modal"
                      >
                        <ModalBody>
                          <p>
                            Are you sure to delete this{" "}
                            <b>{delCommissionName}</b> ? Once deleted it can't
                            be undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={() =>
                              handleDeleteCommission(delCommissionId)
                            }
                            disabled={buttonStatus}
                          >
                            YES
                          </Button>
                          <Button color="primary" onClick={closeDeleteModal}>
                            NO
                          </Button>
                        </ModalFooter>
                      </Modal>

                      {/* Re Assign modal */}
                      <Modal
                        isOpen={reAssignModal}
                        toggle={closeReAssignModal}
                        className="uapp-modal"
                      >
                        <ModalBody>
                          <p>
                            Are you sure to re-assign this{" "}
                            <b>{commissionName}</b> ?
                          </p>
                          <br />
                          <p className="text-danger">
                            Note : Re-assigning only affects new applications.
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button color="danger" onClick={closeReAssignModal}>
                            NO
                          </Button>

                          <Button
                            color="primary"
                            onClick={() => handleReAssignSubmit(commissionId)}
                            disabled={buttonStatus}
                          >
                            {progress ? <ButtonLoader /> : "Yes"}
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </ButtonGroup>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ConsultantCommissionGroupHistory;
