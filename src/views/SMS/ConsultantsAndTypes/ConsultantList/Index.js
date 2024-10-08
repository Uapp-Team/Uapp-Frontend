import React, { useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Select from "react-select";
import Pagination from "../../Pagination/Pagination.jsx";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get.js";
import { useState } from "react";
import remove from "../../../../helpers/remove.js";
import LinkButton from "../../Components/LinkButton.js";
import { permissionList } from "../../../../constants/AuthorizationConstant.js";
import put from "../../../../helpers/put.js";
import Loader from "../../Search/Loader/Loader.js";
import { userTypes } from "../../../../constants/userTypeConstant.js";
import { tableIdList } from "../../../../constants/TableIdConstant.js";
import ConsultantColumnHide from "./Component/ConsultantColumnHide.js";
import ConsultantTable from "./Component/ConsultantTable.js";
import SelectAndClear from "./Component/SelectAndClear.js";
import PrintFile from "./Component/PrintFile.js";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb.js";
import { useParams } from "react-router";

const Index = () => {
  const { type } = useParams();
  const [empList, setEmpList] = useState([]);
  const [empLabel, setEmpLabel] = useState("Select Consultant Type");
  const [empValue, setEmpValue] = useState(0);
  const [status, setStatus] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Select Branch");
  const [statusValue, setStatusValue] = useState(0);

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userTypeId = localStorage.getItem("userType");
  const [consultantList, setConsultantList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [searchStr, setSearchStr] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [delData, setDelData] = useState({});
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");
  // for hide/unhide column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const userType = localStorage.getItem("userType");
  const history = useHistory();

  useEffect(() => {
    get("ConsultantTypeDD/Index").then((res) => {
      console.log(res);
      setEmpList(res);
    });
    get(`BranchDD/Index`).then((res) => {
      setStatus(res);
    });
  }, []);

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // on clear
  const handleClearSearch = () => {
    setSearchStr("");
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  useEffect(() => {
    get(
      `Consultant/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&searchstring=${searchStr}&consultantTypeId=${empValue}&branchId=${statusValue}`
    ).then((res) => {
      setConsultantList(res?.models);
      setSerialNum(res?.firstSerialNumber);
      setEntity(res?.totalEntity);
      setLoading(false);
    });

    get(`TableDefination/Index/${tableIdList?.Consultant_List}`).then((res) => {
      console.log("table data", res);
      setTableData(res);
    });
  }, [
    currentPage,
    dataPerPage,
    callApi,
    searchStr,
    statusValue,
    empValue,
    loading,
    success,
  ]);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  // Edit Consultant Information

  const handleEdit = (data) => {
    history.push(`/consultantInformation/${data?.id}`);
  };

  // Delete Modal

  const toggleDanger = (p) => {
    setDelData(p);
    setDeleteModal(true);
  };

  const passValidate = (e) => {
    setPass(e.target.value);
  };

  const verifyPass = (e) => {
    setPassError("");
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
  };

  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  const submitModalForm = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("id", passData?.id);
    subData.append("password", pass);
    if (pass.length < 6) {
      setError("Password length can not be less than six digits");
    } else if (pass !== cPass) {
      setPassError("Passwords do not match");
    } else {
      setProgress(true);
      put(`Password/ChangePasswordForConsultant`, subData).then((res) => {
        setProgress(false);
        if (res?.status == 200 && res.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setPassData({});
          setPassModal(false);
          setPass("");
          setCPass("");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
          setSuccess(!success);
        }
      });
    }
  };

  // Delete Data

  const handleDeleteData = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Consultant/Delete/${delData?.id}`).then((res) => {
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

  const componentRef = useRef();

  const redirectToApplications = (consultantId) => {
    history.push({
      pathname: `/applicationsFromConsultant/${consultantId}`,
      consultantIdFromConsultantList: consultantId,
    });
  };

  const redirectToConsultantProfile = (consultantId) => {
    history.push(`/consultantProfile/${consultantId}`);
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    setCheck(e.target.checked);

    put(
      `TableDefination/Update/${tableIdList?.Consultant_List}/${columnId}`
    ).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        setSuccess(!success);
      }
    });
  };

  const redirectToConsultantDashboard = (consultantId) => {
    history.push(`/consultantDashboard/${consultantId}`);
  };

  const handleUpdate = (data) => {
    put(`Consultant/UpdateAccountStatus/${data?.id}`).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
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

  ///////////////////////////
  const empOptiopns = empList?.map((emp) => ({
    label: emp?.name,
    value: emp?.id,
  }));

  const selectEmployeeType = (label, value) => {
    setEmpLabel(label);
    setEmpValue(value);
    // handleSearch();
  };

  const statusOptions = status?.map((br) => ({
    label: br?.name,
    value: br?.id,
  }));

  const selectStatus = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };
  const handleReset = () => {
    setStatusLabel("Select Branch");
    setStatusValue(0);
    setEmpLabel("Select Consultant Type");
    setEmpValue(0);
    setSearchStr("");
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb title="Consultant List" backTo="" path="/" />

          {/* filter starts here */}
          <SelectAndClear
            empOptiopns={empOptiopns}
            empLabel={empLabel}
            empValue={empValue}
            selectEmployeeType={selectEmployeeType}
            type={type}
            statusOptions={statusOptions}
            statusLabel={statusLabel}
            statusValue={statusValue}
            selectStatus={selectStatus}
            searchStr={searchStr}
            setSearchStr={setSearchStr}
            setStatusLabel={setStatusLabel}
            setStatusValue={setStatusValue}
            setEmpLabel={setEmpLabel}
            setEmpValue={setEmpValue}
            handleKeyDown={handleKeyDown}
            handleReset={handleReset}
          ></SelectAndClear>
          {/* filter starts here */}

          <Card className="uapp-employee-search">
            <CardBody>
              {/* new */}
              <Row className="mb-3">
                <Col
                  lg="5"
                  md="5"
                  sm="12"
                  xs="12"
                  style={{ marginBottom: "10px" }}
                >
                  {permissions?.includes(permissionList?.Add_Consultant) ? (
                    <LinkButton
                      url={"/addConsultant"}
                      className={"btn btn-uapp-add "}
                      name={"Add Consultant"}
                      icon={<i className="fas fa-plus"></i>}
                    />
                  ) : null}
                </Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
                    {/* Dropdown number start */}
                    <div className="mr-3">
                      <div className="d-flex align-items-center">
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
                    {/* Dropdown number end */}

                    <PrintFile
                      dropdownOpen={dropdownOpen}
                      toggle={toggle}
                      componentRef={componentRef}
                    ></PrintFile>

                    <ConsultantColumnHide
                      dropdownOpen1={dropdownOpen1}
                      toggle1={toggle1}
                      tableData={tableData}
                      handleChecked={handleChecked}
                    ></ConsultantColumnHide>
                  </div>
                </Col>
              </Row>

              {permissions?.includes(permissionList?.View_Consultant_list) && (
                <>
                  {loading ? (
                    <h2 className="text-center">Loading...</h2>
                  ) : (
                    <ConsultantTable
                      componentRef={componentRef}
                      tableData={tableData}
                      permissions={permissions}
                      permissionList={permissionList}
                      userTypeId={userTypeId}
                      userTypes={userTypes}
                      consultantList={consultantList}
                      serialNum={serialNum}
                      history={history}
                      handlePass={handlePass}
                      passModal={passModal}
                      handleToggle={handleToggle}
                      passData={passData}
                      submitModalForm={submitModalForm}
                      passValidate={passValidate}
                      setError={setError}
                      error={error}
                      verifyPass={verifyPass}
                      confirmPassword={confirmPassword}
                      setPassModal={setPassModal}
                      progress={progress}
                      passError={passError}
                      handleDate={handleDate}
                      redirectToApplications={redirectToApplications}
                      handleUpdate={handleUpdate}
                      redirectToConsultantProfile={redirectToConsultantProfile}
                      userType={userType}
                      redirectToConsultantDashboard={
                        redirectToConsultantDashboard
                      }
                      handleEdit={handleEdit}
                      toggleDanger={toggleDanger}
                      deleteModal={deleteModal}
                      setDeleteModal={setDeleteModal}
                      handleDeleteData={handleDeleteData}
                      buttonStatus={buttonStatus}
                    ></ConsultantTable>
                  )}
                </>
              )}

              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default Index;
