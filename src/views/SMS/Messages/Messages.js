import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import get from "../../../helpers/get";
import Select from "react-select";
import Pagination from "../Pagination/Pagination";
import { useToasts } from "react-toast-notifications";
import remove from "../../../helpers/remove";
import loader from "../../../assets/img/uappLoader.gif";
import Loader from "../Search/Loader/Loader";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { dateFormate } from "../../../components/date/calenderFormate";

const Messages = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(30);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delDadta, setDelData] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    get(
      `MessageNotification/Index?page=${currentPage}&pagesize=${dataPerPage}`
    ).then((res) => {
      console.log("messages", res);
      setEntity(res?.totalEntity);
      setData(res?.models);
      setLoading(false);
    });
  }, [dataPerPage, currentPage, success]);

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const backToDashboard = () => {
    history.push("/");
  };

  const gotoPath = (data) => {
    history.push(data?.targetUrl);
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    get(`Notification/Delete/${delDadta?.id}`).then((res) => {
      setButtonStatus(false);
      if (res) {
        addToast("Notification Deleted", {
          appearance: "error",
          autoDismiss: true,
        });
        setDelData({});
        setDeleteModal(false);
        setSuccess(!success);
      } else {
        addToast("Something Went Wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const deletAllNotification = () => {
    setButtonStatus(true);
    remove(`Notification/DeleteAll`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  const deletAllSeen = () => {
    setButtonStatus(true);
    remove(`Notification/DeleteAllOnlySeens`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  const markAsReadNotification = (data) => {
    history.push(
      `/applicationDetails/${data?.applicationId}/${data?.studentId}`
    );
  };

  return (
    <>
      <BreadCrumb title="All Messages" backTo="" path="" />
      {data?.length < 1 ? (
        <Loader />
      ) : (
        <div>
          <Modal
            isOpen={deleteModal}
            toggle={() => setDeleteModal(!deleteModal)}
            className="uapp-modal2"
          >
            <ModalBody>
              <p>
                Are You Sure to Delete this ? Once Deleted it can't be Undone!
              </p>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                onClick={handleDeleteData}
                disabled={buttonStatus}
              >
                YES
              </Button>
              <Button onClick={() => setDeleteModal(false)}>NO</Button>
            </ModalFooter>
          </Modal>

          {/* <Card>

          <CardBody>

            {
              data?.length > 0 ? 
              <div className='d-flex justify-content-end'>

              <Button color='danger mr-1 btn-sm' onClick={deletAllNotification} disabled={buttonStatus}>
                Delete All

              </Button>

              <Button color='danger ml-1 btn-sm' onClick={deletAllSeen}>
                Delete Only Seen

              </Button>

            </div>

            :

            <div className='text-center'>

              <span style={{fontWeight: '500'}}>No Notification Found</span>

            </div>
            }

          </CardBody>


        </Card> */}

          {/* map data from array and show */}

          {data?.map((list, i) => (
            <Card key={i} className="my-3 notification-div">
              <CardBody>
                <div className="row">
                  <div className="col-md-9">
                    <div className="mb-2">
                      <span className="title" onClick={() => gotoPath(list)}>
                        {list?.senderName}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#252525",
                          position: "relative",
                          zIndex: "500",
                          bottom: "5px",
                        }}
                      >
                        {dateFormate(list?.createdOn)}
                      </span>
                    </div>
                    <span className="description">{list?.messageBody}</span>
                  </div>

                  <div
                    className="col-md-3 d-flex justify-content-end"
                    style={{ position: "relative", top: "15px", zIndex: "500" }}
                  >
                    <div>
                      {!list?.isSeen ? (
                        <button
                          style={{ height: "40px", width: "126px" }}
                          className="d-block  notify-btn-color mx-2"
                          onClick={() => markAsReadNotification(list)}
                        >
                          Mark as Read
                        </button>
                      ) : null}
                    </div>

                    {/* <div>
                       <button style={{height: '40px', width: '82px', fontSize: '13px', fontWeight: '500'}} className='btn btn-danger mx-2' onClick={()=> toggleDanger(list)}>
                            Delete

                        </button>
                       </div> */}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}

          <Card>
            <CardBody>
              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default Messages;
