import React from "react";
import { Table } from "reactstrap";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonForFunction from "../Components/ButtonForFunction";
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
      <p className="section-title ml-3">Intake List</p>
      <div className="table-responsive page-header ">
        <Table className="table-sm table-bordered rounded">
          <thead className="thead-uapp-bg">
            <tr style={{ textAlign: "center" }}>
              {/* <th>SL/NO</th> */}
              <th>Name</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subIntake?.map((int, i) => (
              <tr key={int?.id} style={{ textAlign: "center" }}>
                {/* <th scope="row">{serialNum + i}</th> */}
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* <div className="d-flex justify-content-end mt-1 mr-4 mb-3">
                <h5>Total Results Found: {subIntake.length}</h5>
            </div> */}
      <ConfirmModal
        text="Do You Want To Delete This ? Once Deleted it can't be Undone "
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        cancel={closeDeleteModal}
        progress={progress}
        confirm={() => handleDelete(intId)}
      />
    </div>
  );
};

export default SubjectIntakeListComponent;
