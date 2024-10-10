import React from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import ButtonLoader from "../../../Components/ButtonLoader";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";

const StaffTypeTable = ({
  EmployeesTypeList,
  handleEmpCount,
  handleUpdate,
  toggleDanger,
  deleteModal,
  setDeleteModal,
  empDelId,
  empDelName,
  handleDeletePermission,
  progress2,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <div>
      {permissions?.includes(permissionList?.View_Staff_type_list) && (
        <div className="table-responsive">
          <Table id="table-to-xls" className="table-sm table-bordered">
            <thead className="tablehead">
              <tr style={{ textAlign: "center" }}>
                {/* <th>SL/NO</th> */}
                <th>Name</th>
                <th className="text-center"> Total Staff</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {EmployeesTypeList?.map((etype, i) => (
                <tr key={etype.id} style={{ textAlign: "center" }}>
                  {/* <th scope="row">{i + 1}</th> */}
                  <td>{etype.name}</td>
                  <td className="text-center">
                    {permissions?.includes(
                      permissionList?.View_Employee_list
                    ) ? (
                      <span
                        onClick={() => handleEmpCount(etype?.id)}
                        className="badge badge-pill badge-primary cursor-pointer"
                      >
                        {" "}
                        View ({etype.employeeCount}){" "}
                      </span>
                    ) : (
                      <span className="badge badge-pill badge-primary cursor-pointer">
                        {" "}
                        View ({etype.employeeCount}){" "}
                      </span>
                    )}
                  </td>
                  <td>
                    <ButtonGroup>
                      {etype?.id === 2 ||
                      etype?.id === 3 ||
                      etype?.id === 4 ||
                      etype?.id === 5 ||
                      etype?.id === 6 ||
                      etype?.id === 7 ? null : (
                        <>
                          {permissions?.includes(
                            permissionList?.Edit_Staff_type
                          ) && (
                            <ButtonForFunction
                              func={() => handleUpdate(etype)}
                              color={"warning"}
                              className={"mr-2 btn-sm"}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                            />
                          )}
                          {permissions?.includes(
                            permissionList?.Delete_Staff_type
                          ) && (
                            <ButtonForFunction
                              func={() => toggleDanger(etype)}
                              color={"danger"}
                              className={"btn-sm"}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                            />
                          )}
                        </>
                      )}
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <ConfirmModal
        text={`Do You Want To Delete This ${empDelName} Information ?`}
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={() => handleDeletePermission(empDelId)}
        cancel={() => setDeleteModal(false)}
        progress={progress2}
      />
    </div>
  );
};

export default StaffTypeTable;
