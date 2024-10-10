import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import get from "../../../helpers/get";
import Pagination from "../Pagination/Pagination";
import { useToasts } from "react-toast-notifications";
import Loader from "../Search/Loader/Loader";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import put from "../../../helpers/put";
import remove from "../../../helpers/remove";
import { dateFormate } from "../../../components/date/calenderFormate";

const Notifications = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  // const [working, setWorking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(30);
  const [entity, setEntity] = useState(0);
  const [data, setData] = useState([]);
  // const [menus, setMenus] = useState([]);
  const [checked, setChecked] = useState([]);

  const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [delDadta, setDelData] = useState({});
  const [deleteModalSelect, setDeleteModalSelect] = useState(false);
  const [delDadtaSelect, setDelDataSelect] = useState({});

  useEffect(() => {
    get(`Notification/Index?page=${currentPage}&pageSize=${dataPerPage}`).then(
      (res) => {
        setEntity(res?.totalEntity);
        setData(res?.models);
        setLoading(false);
      }
    );
  }, [dataPerPage, currentPage, success]);

  // user select data per page
  // const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  // const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  // const selectDataSize = (value) => {
  //   setDataPerPage(value);
  //   setCallApi((prev) => !prev);
  // };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // setCallApi((prev) => !prev);
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
        setChecked([]);
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

  const toggleDangerSelect = (data) => {
    setDelDataSelect(data);
    setDeleteModalSelect(true);
  };

  const handleDeleteDataSelect = () => {
    setButtonStatus(true);
    remove(`Notification/DeleteSelected?ids=${checked}`).then((res) => {
      setButtonStatus(false);
      if (res) {
        addToast("Notifications are Deleted", {
          appearance: "error",
          autoDismiss: true,
        });
        setDelDataSelect({});
        setChecked([]);
        setDeleteModalSelect(false);
        setSuccess(!success);
      } else {
        addToast("Something Went Wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  // const deletAllNotification = () => {
  //   setButtonStatus(true);
  //   remove(`Notification/DeleteAll`).then((res) => {
  //     setButtonStatus(false);
  //     addToast(res, {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //     setSuccess(!success);
  //   });
  // };

  // const deletAllSeen = () => {
  //   setButtonStatus(true);
  //   remove(`Notification/DeleteAllOnlySeens`).then((res) => {
  //     setButtonStatus(false);
  //     addToast(res, {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //     setSuccess(!success);
  //   });
  // };

  const markAsReadNotification = (data) => {
    get(`Notification/ViewNotification/${data?.id}`).then((res) => {
      console.log(data, "notifications for one");
      if (res) {
        setSuccess(!success);
      }
      setSuccess(!success);
    });
  };

  const markAsReadNotificationAll = () => {
    put(`Notification/ViewSelected?ids=${checked}`).then((res) => {
      console.log(res, "notifications");
      if (res) {
        setSuccess(!success);
      }
      setSuccess(!success);
      setChecked([]);
    });
  };

  // const handleChange = (e, id) => {
  //   let isChecked = e.target.checked;

  //   if (isChecked === true) {
  //     setWorking([...working, id]);
  //   } else {
  //     const res = working.filter((c) => c !== id);
  //     setWorking(res);
  //   }
  // };

  // handling checkbox
  const handleCheck = (e) => {
    let id = e.target.id;
    let val = e.target.checked;

    if (val === true) {
      let checkedData = [...checked];
      if (!checked?.includes(id)) {
        checkedData.push(id);
      }

      setChecked(checkedData);
    } else {
      let checkedData = [...checked];
      const newD = id;
      const child = checkedData.filter((c) => c != newD);
      checkedData = [...child];

      setChecked(checkedData);
    }
  };

  // on Select All Checkbox
  const handleSelectAll = (e) => {
    let newChecked = [];
    const val = e.target.checked;
    console.log(data);
    if (val === true) {
      data.map((item) => {
        const menuId = item.id.toString();
        newChecked.push(menuId);
        document.getElementById(item?.id).checked = true;
      });
      setChecked([...newChecked]);
    }

    if (val === false) {
      data.map((item) => {
        document.getElementById(item.id).checked = false;
      });
      setChecked([]);
    }
  };

  return (
    <>
      <BreadCrumb title="All Notifications" backTo="" path="" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody className="ml-5">
              {data?.length > 0 ? (
                <div className="d-flex justify-content-start align-item-center">
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input mt-3"
                      onChange={(e) => handleSelectAll(e)}
                      type="checkbox"
                      id="select"
                      name=""
                      checked={
                        data.every((value) =>
                          checked.includes(value.id.toString())
                        ) === true
                          ? true
                          : false
                      }
                    />
                    <label
                      // className="form-check-label"
                      htmlFor="select"
                      // style={{ height: "40px", width: "126px" }}
                      className="d-block notify-btn-color text-center py-2 cursor-pointer ml-3"
                    >
                      <span className="mx-3"> Select All</span>
                    </label>
                  </div>

                  <div>
                    <button
                      // style={{ height: "40px", width: "126px" }}
                      className="d-block  notify-btn-color mx-3 py-2"
                      onClick={(e) => markAsReadNotificationAll(e)}
                    >
                      Mark as Read
                    </button>
                  </div>

                  <div>
                    <button
                      style={{
                        // height: "40px",
                        // width: "82px",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                      className="btn btn-danger py-2"
                      onClick={(e) => toggleDangerSelect(e)}
                    >
                      Delete
                    </button>
                  </div>

                  {/* <Button
                    color="danger mr-1 btn-sm"
                    onClick={deletAllNotification}
                    disabled={buttonStatus}
                  >
                    Delete All
                  </Button>

                  <Button color="danger ml-1 btn-sm" onClick={deletAllSeen}>
                    Delete Only Seen3
                  </Button> */}
                </div>
              ) : (
                <div className="text-center">
                  <span style={{ fontWeight: "500" }}>
                    No Notification Found
                  </span>
                </div>
              )}
            </CardBody>
          </Card>

          {data?.map((list, i) => (
            <Card key={i} className="my-3 notification-div">
              <CardBody>
                <div className="row">
                  <div className="col-md-1 text-center mt-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => handleCheck(e)}
                      name=""
                      id={list.id}
                      checked={checked.includes(`${list?.id}`) ? true : false}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="mb-2">
                      <span className="title" onClick={() => gotoPath(list)}>
                        {list?.title}
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#252525",
                          position: "relative",
                          bottom: "5px",
                        }}
                      >
                        {dateFormate(list?.createdOn)}
                      </span>
                    </div>
                    <span className="description">{list?.description}</span>
                  </div>

                  <div
                    className="col-md-3 d-flex justify-content-end"
                    style={{
                      position: "relative",
                      top: "15px",
                    }}
                  >
                    <div>
                      {!list?.isSeen ? (
                        <button
                          // style={{ height: "40px", width: "126px" }}
                          className="d-block  notify-btn-color mx-3 py-2"
                          onClick={() => markAsReadNotification(list)}
                        >
                          Mark as Read
                        </button>
                      ) : null}
                    </div>

                    <div>
                      <button
                        style={{
                          // height: "40px",
                          // width: "82px",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                        className="btn btn-danger mx-3 py-2"
                        onClick={() => toggleDanger(list)}
                      >
                        Delete
                      </button>
                    </div>
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

      <ConfirmModal
        text="Are You Sure to Delete this ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        buttonStatus={buttonStatus}
        cancel={() => setDeleteModal(false)}
        confirm={handleDeleteData}
      />

      <ConfirmModal
        text="Are you sure to delete all of this? Once deleted it can't be undone!"
        isOpen={deleteModalSelect}
        toggle={() => setDeleteModalSelect(!deleteModalSelect)}
        buttonStatus={buttonStatus}
        cancel={() => setDeleteModalSelect(false)}
        confirm={handleDeleteDataSelect}
      />
    </>
  );
};

export default Notifications;
