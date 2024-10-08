import React, { useState } from "react";
import remove from "../../../../../helpers/remove";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
  ButtonGroup,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../../Components/ButtonLoader";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";

const DistributionLevelSettingList = (props) => {
  const { success, setSuccess, distributionData, toggleUpdate } = props;
  const [deleteModal, setDeleteModal] = useState(false);
  const [delData, setDelData] = useState({});
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [progress, setProgress] = useState(false);

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`DistributionLevelSetting/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      setDeleteModal(false);
    });
  };

  return (
    <div>
      <p className="section-title">Distribution Level Settings List</p>

      <div className="table-responsive">
        <Table className="table-sm table-bordered">
          <thead className="tablehead">
            <tr style={{ textAlign: "center" }}>
              <th>Level Name</th>
              <th>Level Value</th>
              <th>Commission Percentage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {distributionData?.map((ls, i) => (
              <tr key={i} style={{ textAlign: "center" }}>
                <td>{ls?.levelName}</td>
                <td>{ls?.levelValue}</td>
                <td>{ls?.commissionPercent}</td>

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
                  <ConfirmModal
                    text="Do You Want To Delete This Distribution Level ? Once Deleted it can't be Undone!"
                    isOpen={deleteModal}
                    toggle={() => setDeleteModal(!deleteModal)}
                    confirm={confirmDelete}
                    cancel={() => setDeleteModal(false)}
                    buttonStatus={buttonStatus}
                    progress={progress}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DistributionLevelSettingList;
