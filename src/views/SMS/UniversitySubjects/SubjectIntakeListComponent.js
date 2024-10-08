import React from "react";
import { Button, Modal, ModalBody, ModalFooter, Table } from "reactstrap";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonForFunction from "../Components/ButtonForFunction";
import ButtonLoader from "../Components/ButtonLoader";
import ConfirmModal from "../../../components/modal/ConfirmModal";

const SubjectIntakeListComponent = ({
  subIntake,
  serialNum,
  handleDate,
  toggleDanger,
  deleteModal,
  closeDeleteModal,
  intName,
  buttonStatus1,
  handleDelete,
  intId,
  progress,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <div>
      <div className="hedding-titel d-flex justify-content-between ml-3 mb-4">
        <div>
          <h5>
            {" "}
            <b>Intake List</b>{" "}
          </h5>
          <div className="bg-h"></div>
        </div>
      </div>
      <div className="table-responsive page-header ">
        <Table className="table-sm table-bordered rounded">
          <thead className="thead-uapp-bg">
            <tr style={{ textAlign: "center" }}>
              <th>SL/NO</th>
              <th>Name</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subIntake?.map((int, i) => (
              <tr key={int?.id} style={{ textAlign: "center" }}>
                <th scope="row">{serialNum + i}</th>
                <td>{int?.intake?.name}</td>
                <td>{int?.intakeStatus?.name}</td>
                <td>{handleDate(int?.applicationDeadLine)}</td>
                <td style={{ width: "8%" }} className="text-center">
                  {permissions?.includes(permissionList.Edit_Subjects) ? (
                    <ButtonForFunction
                      className={"mx-1 btn-sm"}
                      func={() => toggleDanger(int?.intake?.name, int?.id)}
                      color={"danger"}
                      icon={<i className="fas fa-trash-alt"></i>}
                      permission={6}
                    />
                  ) : null}
                  <ConfirmModal
                    text="Do You Want To Delete This ? Once Deleted it can't be Undone "
                    // ${delData?.name}
                    isOpen={deleteModal}
                    toggle={closeDeleteModal}
                    cancel={closeDeleteModal}
                    progress={progress}
                    confirm={() => handleDelete(intId)}
                  ></ConfirmModal>

                  {/* <Modal
                    isOpen={deleteModal}
                    toggle={closeDeleteModal}
                    className="uapp-modal"
                  >
                    <ModalBody>
                      <p>
                        Are You Sure to Delete this{" "}
                        <span className="font-weight-bold">{intName}</span> ?
                        Once Deleted it can't be Undone!
                      </p>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        disabled={buttonStatus1}
                        color="danger"
                        onClick={() => handleDelete(intId)}
                      >
                        {progress ? <ButtonLoader /> : "YES"}
                      </Button>
                      <Button onClick={closeDeleteModal}>NO</Button>
                    </ModalFooter>
                  </Modal> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* <div className="d-flex justify-content-end mt-1 mr-4 mb-3">
                <h5>Total Results Found: {subIntake.length}</h5>
            </div> */}
    </div>
  );
};

export default SubjectIntakeListComponent;
