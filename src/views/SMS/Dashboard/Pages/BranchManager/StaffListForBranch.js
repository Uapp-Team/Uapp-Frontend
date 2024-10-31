import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import remove from "../../../../../helpers/remove";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import PopOverText from "../../../../../components/PopOverText";

const StaffListForBranch = ({ id }) => {
  const [data, setData] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [delData, setDelData] = useState({});
  const history = useHistory();
  const [deleteModal, setDeleteModal] = useState(false);
  const { addToast } = useToasts();

  // user select data per page

  useEffect(() => {
    get(`Employee/Index?branchId=${id}`).then((res) => {
      setData(res);
    });
  }, [success, id]);

  const toggleDanger = (p) => {
    setDelData(p);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    remove(`Employee/Delete/${delData}`).then((res) => {
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
    history.push(`/staffGeneralInformation/${id}`);
  };

  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <div className="d-flex">
          <h5 className="mb-0">Staff List</h5>
          <span className="count-summery">{data?.totalEntity}</span>
        </div>

        {data?.consultants?.length === 0 ? (
          <p className="text-center">No Staff List</p>
        ) : (
          <div className="overflowY-300px">
            <Table responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <td>Name</td>
                  <td>Contact </td>
                  <td>Type</td>
                  <td>Action </td>
                </tr>
              </thead>
              <tbody>
                {data?.models?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    <td>{item?.fullName}</td>
                    <td>
                      <div className="d-flex justify-content-start">
                        <PopOverText
                          value={
                            item.phoneNumber && item.phoneNumber.includes("+")
                              ? item.phoneNumber
                              : item.phoneNumber &&
                                !item.phoneNumber.includes("+")
                              ? "+" + item.phoneNumber
                              : null
                          }
                          btn={<i class="fas fa-phone"></i>}
                          popoverOpen={popoverOpen}
                          setPopoverOpen={setPopoverOpen}
                        />
                        <PopOverText
                          value={item?.email}
                          btn={<i className="far fa-envelope"></i>}
                          popoverOpen={popoverOpen}
                          setPopoverOpen={setPopoverOpen}
                        />
                      </div>
                    </td>
                    <td>{item?.staffType}</td>

                    <td>
                      <span
                        className="text-info pointer mr-3"
                        onClick={() => handleEdit(item?.id)}
                      >
                        Edit
                      </span>
                      <span
                        className="text-danger pointer"
                        onClick={() => toggleDanger(item?.id)}
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

export default StaffListForBranch;
