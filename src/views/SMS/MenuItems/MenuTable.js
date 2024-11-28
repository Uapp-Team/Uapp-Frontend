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
import PopOverText from "../../../components/PopOverText";
import { dateFormate } from "../../../components/date/calenderFormate";
import ToggleSwitch from "../Components/ToggleSwitch";
import ButtonForFunction from "../Components/ButtonForFunction";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import uapploader from "../../../assets/img/Uapp_fav.png";
import Uremove from "../../../helpers/Uremove";
import { useToasts } from "react-toast-notifications";
import remove from "../../../helpers/remove";

const MenuTable = ({
  componentRef,
  tableData,
  permissions,
  permissionList,
  userTypeId,
  userTypes,
  MenuItemList,
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

  passError,
  handleDate,
  redirectToApplications,
  handleUpdate,
  redirectToConsultantProfile,
  userType,
  redirectToConsultantDashboard,
  deleteModal,
  setDeleteModal,
  setSuccess,
  success,
}) => {
  const { addToast } = useToasts();
  const [delData, setDelData] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const handleEdit = (data) => {
    history.push(`/menu-add/${data?.id}`);
  };

  const toggleDanger = (p) => {
    setDelData(p);
    setDeleteModal(true);
  };
  const handleDeleteData = () => {
    remove(`MenuItem/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  return (
    <div className="table-responsive fixedhead mb-2" ref={componentRef}>
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            <th>Title </th>
            <th>NaveLink</th>
            <th>Type</th>
            <th>Icon</th>
            <th>Parent Name</th>
            <th>Display Order</th>
            <th style={{ width: "8%" }} className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {MenuItemList?.items?.map((menu, i) => (
            <tr key={menu?.id}>
              <td>{menu?.title}</td>
              <td>{menu?.navLink}</td>
              <td>{menu?.type}</td>
              <td>{menu?.icon}</td>
              <td>{menu?.parentName}</td>
              <td>{menu?.displayOrder}</td>
              <td>
                {menu?.isPredefined === true ? null : (
                  <ButtonGroup variant="text">
                    <>
                      <ButtonForFunction
                        func={() => handleEdit(menu)}
                        color={"warning"}
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-edit"></i>}
                      />
                      <ButtonForFunction
                        color={"danger"}
                        className={"mx-1 btn-sm"}
                        func={() => toggleDanger(menu)}
                        icon={<i className="fas fa-trash-alt"></i>}
                      />
                    </>
                  </ButtonGroup>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmModal
        text="Do You Want To Delete This Menu ? Once Deleted it can't be Undone!"
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

export default MenuTable;
