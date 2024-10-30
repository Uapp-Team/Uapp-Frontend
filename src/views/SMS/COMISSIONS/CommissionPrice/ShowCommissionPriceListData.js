import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
  ButtonGroup,
} from "reactstrap";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const ShowCommissionPriceListData = (props) => {
  const {
    list,
    toggleUpdate,
    toggleDanger,
    deleteModal,
    setDeleteModal,
    confirmDelete,
    progress,
  } = props;
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <div>
      <p className="section-title">Commission Price List</p>

      <div className="table-responsive">
        <Table className="table-sm table-bordered">
          <thead className="thead-uapp-bg">
            <tr style={{ textAlign: "center" }}>
              <th>Price Range Name</th>
              <th>Student From</th>
              <th>Student To</th>
              <th>Commission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((ls, i) => (
              <tr key={i} style={{ textAlign: "center" }}>
                <td>{ls?.priceRangeName}</td>
                <td>{ls?.rangeFrom}</td>
                <td>{ls?.rangeTo}</td>
                <td>{ls?.commissionAmount}</td>

                <td style={{ width: "15%" }} className="text-center">
                  <ButtonGroup variant="text">
                    {permissions?.includes(
                      permissionList.Configure_CommissionStucture
                    ) ? (
                      <Button
                        className="mr-1 btn-sm"
                        color="warning"
                        onClick={() => toggleUpdate(ls)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    ) : null}

                    {permissions?.includes(
                      permissionList.Configure_CommissionStucture
                    ) ? (
                      <Button
                        className="ml-1 btn-sm"
                        color="danger"
                        onClick={() => toggleDanger(ls)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    ) : null}
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <ConfirmModal
        text="Do You Want To Delete This Information?"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={confirmDelete}
        cancel={() => setDeleteModal(false)}
        progress={progress}
      />
    </div>
  );
};

export default ShowCommissionPriceListData;
