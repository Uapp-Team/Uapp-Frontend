import React, { useEffect, useState } from "react";
import get from "../../../helpers/get";
import Select from "react-select";
import {
  CardBody,
  Table,
  Card,
  CardHeader,
  Row,
  Col,
  Input,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import ButtonForFunction from "../Components/ButtonForFunction";
import ButtonLoader from "../Components/ButtonLoader";
import remove from "../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import ToggleSwitch from "../Components/ToggleSwitch";
import put from "../../../helpers/put";
import { permissionList } from "../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { userTypes } from "../../../constants/userTypeConstant";

const AllLoginHistory = () => {
  const current_user = JSON.parse(localStorage.getItem("current_user"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const history = useHistory();
  const [serialNum, setSerialNum] = useState(1);

  const [searchStr, setSearchStr] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");

  const { addToast } = useToasts();

  useEffect(() => {
    get(
      `LoginHistory/IndexForSysAdmin?page=${currentPage}&pageSize=${dataPerPage}&Username=${searchStr}`
    ).then((res) => {
      setEntity(res?.totalEntity);
      setData(res?.models);
      setSerialNum(res?.firstSerialNumber);
    });
  }, [currentPage, dataPerPage, callApi, searchStr, success]);

  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
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

  const handleDate1 = (date) => {
    const d = date.split("T")[0];
    return d;
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  // on clear
  const handleClearSearch = () => {
    setCallApi((prev) => !prev);
    setSearchStr("");
  };

  const toggleDelete = (userHistoryId) => {
    setDeleteId(userHistoryId);
    // setManagerId(manager?.id);
    // setManagerName(manager?.firstName);
    // setDeleteData(manager);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    // setManagerId(0);
    // setManagerName("");
    // setDeleteData({});
    setDeleteId(undefined);
  };

  const handleDelete = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`LoginHistory/Delete/${deleteId}`).then((res) => {
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setProgress(false);
      //   setDeleteData({});
      setDeleteModal(false);
      //   setManagerId(0);
      //   setManagerName("");
      setSuccess(!success);
      setButtonStatus(false);
      setDeleteId(undefined);
    });
  };

  const handleAccountStatus = (e, ipAddress) => {
    const subData = {
      IpAddress: ipAddress,
    };

    put(`LoginHistory/DeviceBlock/${ipAddress}`, subData).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <div>
      <BreadCrumb title="All Users Login History" backTo="" path="/" />

      {userType === userTypes?.SystemAdmin.toString() ||
      userType === userTypes?.Admin.toString() ? (
        <>
          <Card className="uapp-employee-search">
            <CardBody className="search-card-body">
              <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                  <Input
                    style={{ height: "2.7rem" }}
                    type="text"
                    name="search"
                    value={searchStr}
                    id="search"
                    placeholder="Email"
                    onChange={searchValue}
                    onKeyDown={handleKeyDown}
                  />
                </Col>
              </Row>

              {/* <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <div className="mt-2 mx-1 d-flex btn-clear">
                  <button className="tag-clear" onClick={handleClearSearch}>
                    Clear All
                  </button>
                </div>
              </div>
            </Col>
          </Row> */}
            </CardBody>
          </Card>
        </>
      ) : null}

      <Card>
        <CardBody>
          <div className="">
            <div className="d-flex align-items-center justify-content-end">
              <div className="mr-2">Showing :</div>
              <div>
                <Select
                  options={dataSizeName}
                  value={{ label: dataPerPage, value: dataPerPage }}
                  onChange={(opt) => selectDataSize(opt.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <Table id="table-to-xls" className="table-sm table-bordered my-4">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>IP Address</th>
                  <th>Geolocation</th>
                  <th>Blocked</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((d, i) => (
                  <tr key={i} style={{ textAlign: "center" }}>
                    <th scope="row">{i + serialNum}</th>
                    <td>{d?.fullName}</td>
                    <td>{d?.email}</td>
                    <td>{handleDate1(d?.lastLoginDate)}</td>
                    <td>{d?.ipAddress}</td>
                    <td>{d?.geoLocationInfo}</td>
                    <td>
                      {
                        <ToggleSwitch
                          defaultChecked={
                            d?.isDeviceBlocked == false ? false : true
                          }
                          onChange={(e) => {
                            handleAccountStatus(e, d?.ipAddress);
                          }}
                        />
                      }

                      {/* {d?.isDeviceBlocked ? "Yes" : "No"} */}
                    </td>
                    <td>
                      <ButtonGroup variant="text">
                        <ButtonForFunction
                          func={() => toggleDelete(d?.id)}
                          color={"danger"}
                          className={"mx-1 btn-sm"}
                          icon={<i className="fas fa-trash-alt"></i>}
                          permission={6}
                        />
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}

                {/* <Modal
                  isOpen={deleteModal}
                  toggle={closeDeleteModal}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this ? Once Deleted it can't be
                      Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      disabled={buttonStatus}
                      color="danger"
                      onClick={handleDelete}
                    >
                      {progress ? <ButtonLoader /> : "YES"}
                    </Button>
                    <Button onClick={closeDeleteModal}>NO</Button>
                  </ModalFooter>
                </Modal> */}

                <ConfirmModal
                  // text="Do You Want To Delete This Subject ?"
                  isOpen={deleteModal}
                  toggle={closeDeleteModal}
                  confirm={() => handleDelete()}
                  cancel={closeDeleteModal}
                  buttonStatus={buttonStatus}
                  progress={progress}
                />
              </tbody>
            </Table>
          </div>

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AllLoginHistory;
