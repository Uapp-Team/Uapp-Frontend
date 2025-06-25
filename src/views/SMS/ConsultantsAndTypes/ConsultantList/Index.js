import React, { useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
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
import ConsultantStatus from "./Component/ConsultantStatus.js";
import ButtonForFunction from "../../Components/ButtonForFunction.js";
import CopyButton from "../../../../components/Refer/CopyButton.js";
import SocialShare from "../../../../components/Refer/SocialShare.js";
import Uget from "../../../../helpers/Uget.js";
import { domain } from "../../../../constants/constants.js";

const Index = () => {
  const ConsultantPaging = JSON.parse(sessionStorage.getItem("consultant"));
  const { type } = useParams();
  const [empList, setEmpList] = useState([]);
  const [empLabel, setEmpLabel] = useState(
    ConsultantPaging?.empLabel
      ? ConsultantPaging?.empLabel
      : "Select Consultant Type"
  );
  const [empValue, setEmpValue] = useState(
    ConsultantPaging?.empValue ? ConsultantPaging?.empValue : 0
  );
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState(
    ConsultantPaging?.branchLabel
      ? ConsultantPaging?.branchLabel
      : "Select Branch"
  );
  const [branchValue, setBranchValue] = useState(
    ConsultantPaging?.branchValue ? ConsultantPaging?.branchValue : 0
  );

  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState(
    ConsultantPaging?.statusLabel
      ? ConsultantPaging?.statusLabel
      : "Account Status"
  );
  const [statusValue, setStatusValue] = useState(
    ConsultantPaging?.statusValue ? ConsultantPaging?.statusValue : 0
  );

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userTypeId = localStorage.getItem("userType");
  const [consultantList, setConsultantList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    ConsultantPaging?.currentPage ? ConsultantPaging?.currentPage : 1
  );
  const [dataPerPage, setDataPerPage] = useState(15);
  const [searchStr, setSearchStr] = useState(
    ConsultantPaging?.searchStr ? ConsultantPaging?.searchStr : ""
  );
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
  // const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  console.log(tableData, "table data");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const userType = localStorage.getItem("userType");
  const history = useHistory();
  const [check, setCheck] = useState(false);
  const [tierLabel, setTierLabel] = useState("Select Tier");
  const [tierValue, setTierValue] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [referID, setReferId] = useState(null);
  console.log(referID);

  useEffect(() => {
    sessionStorage.setItem(
      "consultant",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        branchLabel: branchLabel && branchLabel,
        branchValue: branchValue && branchValue,
        empLabel: empLabel && empLabel,
        empValue: empValue && empValue,
        statusLabel: statusLabel && statusLabel,
        statusValue: statusValue && statusValue,
        searchStr: searchStr && searchStr,
        dataPerPage: dataPerPage && dataPerPage,
      })
    );
  }, [
    branchLabel,
    branchValue,
    empLabel,
    empValue,
    currentPage,
    dataPerPage,
    searchStr,
    statusLabel,
    statusValue,
  ]);

  useEffect(() => {
    get("ConsultantTypeDD/Index").then((res) => {
      setEmpList(res);
    });

    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });

    get("AccountStatusDD/index").then((res) => {
      setStatusType(res);
    });
  }, []);

  // for link

  useEffect(() => {
    Uget("SalesTeamLeader/FetchUappId").then((res) => {
      setReferId(res?.data?.uappId);
    });
  }, []);

  // const url = `${domain}/consultantRegister/${referID}`;
  const url = `${domain}/consultantRegister/${referID}?source=salesTeamLeader`;

  // for link

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
    setCurrentPage(1);
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
    if (!isTyping) {
      setLoading(true);
      get(
        `Consultant/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&searchstring=${searchStr}&consultantTypeId=${empValue}&branchId=${branchValue}&status=${statusValue}&tier=${tierValue}&isfromstudent=${check}`
      ).then((res) => {
        console.log(res?.models);
        setConsultantList(res?.models);
        setSerialNum(res?.firstSerialNumber);
        setEntity(res?.totalEntity);
        setLoading(false);
      });
    }
  }, [
    currentPage,
    dataPerPage,
    callApi,
    searchStr,
    branchValue,
    empValue,
    statusValue,
    success,
    check,
    isTyping,
    tierValue,
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
    if (e.target.value === "") {
      setError("Provide a valid password");
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(e.target.value)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
    } else {
      setError("");
    }
  };

  const verifyPass = (e) => {
    setPassError("");
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
    if (e.target.value === "") {
      setPassError("Confirm your password");
    } else {
      setPassError("");
    }
    if (pass && e.target.value !== pass) {
      setPassError("Passwords doesn't match.");
    } else {
      setPassError("");
    }
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
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(pass)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
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

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);

    localStorage.setItem("ColumnConsultant", JSON.stringify(values));
  };

  const redirectToConsultantDashboard = (consultantId) => {
    history.push(`/consultantDashboard/${consultantId}`);
  };

  const empOptiopns = empList?.map((emp) => ({
    label: emp?.name,
    value: emp?.id,
  }));

  const selectEmployeeType = (label, value) => {
    setEmpLabel(label);
    setEmpValue(value);
    // handleSearch();
  };

  const branchOptions = branch?.map((br) => ({
    label: br?.name,
    value: br?.id,
  }));

  const selectBranch = (label, value) => {
    setBranchLabel(label);
    setBranchValue(value);
    // handleSearch();
  };

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };

  const handleReset = () => {
    setBranchLabel("Select Branch");
    setBranchValue(0);
    setEmpLabel("Select Consultant Type");
    setEmpValue(0);
    setStatusLabel("Account Status");
    setStatusValue(0);
    setSearchStr("");
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  return (
    <div>
      <BreadCrumb title="Consultant List" backTo="" path="/" />
      <>
        {/* filter starts here */}
        <SelectAndClear
          setCheck={setCheck}
          check={check}
          empOptiopns={empOptiopns}
          empLabel={empLabel}
          empValue={empValue}
          selectEmployeeType={selectEmployeeType}
          type={type}
          branchOptions={branchOptions}
          branchLabel={branchLabel}
          branchValue={branchValue}
          selectBranch={selectBranch}
          searchStr={searchStr}
          setSearchStr={setSearchStr}
          setBranchLabel={setBranchLabel}
          setBranchValue={setBranchValue}
          setEmpLabel={setEmpLabel}
          setEmpValue={setEmpValue}
          statusLabel={statusLabel}
          statusValue={statusValue}
          setStatusLabel={setStatusLabel}
          setStatusValue={setStatusValue}
          statusTypeMenu={statusTypeMenu}
          selectStatusType={selectStatusType}
          handleKeyDown={handleKeyDown}
          handleReset={handleReset}
          tierLabel={tierLabel}
          setTierLabel={setTierLabel}
          tierValue={tierValue}
          setTierValue={setTierValue}
          setIsTyping={setIsTyping}
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
                <div className="d-flex">
                  <div>
                    {permissions?.includes(permissionList?.Add_Consultant) ? (
                      <LinkButton
                        url={"/addConsultant"}
                        className={"btn btn-uapp-add "}
                        name={"Add Consultant"}
                        icon={<i className="fas fa-plus"></i>}
                      />
                    ) : null}
                  </div>

                  <div className="mx-3">
                    {userTypeId === userTypes?.SalesTeamLeader ? (
                      <ButtonForFunction
                        func={() => setModalShow(true)}
                        className={"btn btn-uapp-add "}
                        icon={<i className="fas fa-plus"></i>}
                        name={" Invite"}
                      />
                    ) : null}
                  </div>
                </div>
              </Col>

              <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                isOpen={modalShow}
                toggle={() => setModalShow(false)}
                centered
              >
                <div>
                  <h5 className="d-flex justify-content-between px-4 mt-4">
                    <span>Refer Code</span>
                    <i
                      class="fas fa-times cursor-pointer"
                      onClick={() => setModalShow(false)}
                    ></i>
                  </h5>
                  <hr />
                </div>

                <div className="text-center mx-auto mb-4">
                  <p style={{ color: "#7C7C7C" }}>
                    Share link with your friends
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center copy-text mx-auto w-75">
                  <p className="mb-0 text-ellipsis mr-1">{url}</p>
                  <CopyButton text={url} />
                </div>
                <SocialShare
                  description={"this is a basic share page"}
                  url={url}
                ></SocialShare>
              </Modal>

              <Col lg="7" md="7" sm="12" xs="12">
                <div className="d-flex justify-content-end">
                  {/* Dropdown number start */}
                  <div className="mr-3">
                    <div className="d-flex align-items-center">
                      <div className="mr-2">Showing :</div>
                      <div className="ddzindex">
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
                    setTableData={setTableData}
                    handleChecked={handleChecked}
                  ></ConsultantColumnHide>
                </div>
              </Col>
            </Row>

            {permissions?.includes(permissionList?.View_Consultant_list) && (
              <>
                {loading ? (
                  <Loader />
                ) : consultantList?.length === 0 ? (
                  <p className="text-center">No Consultant Found</p>
                ) : (
                  <>
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
                      pass={pass}
                      cPass={cPass}
                    ></ConsultantTable>
                  </>
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
    </div>
  );
};

export default Index;
