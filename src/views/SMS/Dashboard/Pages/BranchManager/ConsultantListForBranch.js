import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";
import ToggleSwitch from "../../../Components/ToggleSwitch";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import remove from "../../../../../helpers/remove";
import put from "../../../../../helpers/put";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";

const ConsultantListForBranch = ({ id }) => {
  const [data, setData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [delData, setDelData] = useState({});
  const history = useHistory();
  const [deleteModal, setDeleteModal] = useState(false);
  const { addToast } = useToasts();

  // user select data per page

  useEffect(() => {
    get(`BranchManagerDashboard/Consultants?id=${id}`).then((res) => {
      setData(res);
    });
  }, [success, id]);

  const toggleDanger = (p) => {
    setDelData(p);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    remove(`Consultant/Delete/${delData?.id}`).then((res) => {
      setButtonStatus(false);
      //
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  // Edit Consultant Information

  const handleEdit = (id) => {
    history.push(`/consultantInformation/${id}`);
  };

  const handleUpdate = (id) => {
    put(`Consultant/UpdateAccountStatus/${id}`).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          autoDismiss: true,
          appearance: "success",
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          autoDismiss: true,
          appearance: "error",
        });
      }
    });
  };

  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <div className="d-flex">
          <h5 className="mb-0">Consultant List</h5>
          <span className="count-summery">{data?.totalConsultant}</span>
        </div>

        {data?.consultants?.length === 0 ? (
          <p className="text-center">No Consultant List</p>
        ) : (
          <div className="overflowY-300px">
            <Table responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  {/* <td>SL/NO</td> */}
                  <td>Name</td>
                  <td>Contact </td>
                  <td>Address</td>
                  <td>Status </td>
                  <td>Action </td>
                </tr>
              </thead>
              <tbody>
                {data?.consultants?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    {/* <td>{i + 1}</td> */}

                    <td>{item?.name}</td>
                    <td>{item?.contact}</td>
                    <td>{item?.typeName}</td>
                    <td>
                      {
                        <ToggleSwitch
                          defaultChecked={
                            item?.isActive === false ? false : true
                          }
                          onChange={() => handleUpdate(item?.consultantId)}
                        />
                      }
                    </td>
                    <td>
                      <span
                        className="text-info pointer mr-3"
                        onClick={() => handleEdit(item?.consultantId)}
                      >
                        Edit
                      </span>
                      <span
                        className="text-danger pointer"
                        onClick={() => toggleDanger(item?.consultantId)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* {data?.totalConsultant > 5 && (
              <div className="text-center text-blue">
                <Link to="/consultantList">See All</Link>
              </div>
            )} */}
          </div>
        )}

        <ConfirmModal
          isOpen={deleteModal}
          toggle={() => setDeleteModal(!deleteModal)}
          confirm={handleDeleteData}
          cancel={() => setDeleteModal(false)}
          buttonStatus={buttonStatus}
        />
      </div>
    </>
  );
};

export default ConsultantListForBranch;
