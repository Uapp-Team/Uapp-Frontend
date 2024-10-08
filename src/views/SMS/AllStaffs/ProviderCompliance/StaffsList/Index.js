import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Select from "react-select";
import Pagination from "../../../Pagination/Pagination.jsx";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get.js";
import remove from "../../../../../helpers/remove.js";
import ButtonForFunction from "../../../Components/ButtonForFunction.js";
import { permissionList } from "../../../../../constants/AuthorizationConstant.js";
import loader from "../../../../../assets/img/load.gif";
import put from "../../../../../helpers/put.js";
import { tableIdList } from "../../../../../constants/TableIdConstant.js";
import StaffTable from "./Component/StaffTable.js";
import DropDownNumber from "./Component/DropDownNumber.js";
import SelectAndClear from "./Component/SelectAndClear.js";
import StuffColumnHide from "./Component/StuffColumnHide.js";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb.js";

const Index = (props) => {
  const { type } = useParams();
  const history = useHistory();
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStr, setSearchStr] = useState("");
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const userTypeId = localStorage.getItem("userType");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [empList, setEmpList] = useState([]);
  const [empLabel, setEmpLabel] = useState("Select Provider Compliance  Type");
  const [empValue, setEmpValue] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // for hide/unhide table column
  const [check, setCheck] = useState(true);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [cPass, setCPass] = useState("");
  const [pass, setPass] = useState("");
  const [progress, setProgress] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Provider");
  const [branchValue, setBranchValue] = useState(0);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  useEffect(() => {
    get(`ProviderDD/Index`).then((res) => {
      setBranch(res);
    });
  }, []);

  useEffect(() => {
    // type
    //   ? get(
    //       `Employee/Index?page=${currentPage}&pagesize=${dataPerPage}&branchId=${branchValue}&employeetypeid=${type}&searchstring=${searchStr}`
    //     ).then((action) => {
    //       setEmployeeList(action.models);

    //       setLoading(false);
    //       setEntity(action.totalEntity);
    //       setSerialNum(action.firstSerialNumber);
    //       setLoading(false);
    //     })
    //   : get(
    //       `Employee/Index?page=${currentPage}&pagesize=${dataPerPage}&branchId=${branchValue}&employeetypeid=${empValue}&searchstring=${searchStr}`
    //     ).then((action) => {
    //       setEmployeeList(action.models);

    //       setLoading(false);
    //       setEntity(action.totalEntity);
    //       setSerialNum(action.firstSerialNumber);
    //       setLoading(false);
    //     });

    // type
    //   ? get(`EmployeeTypeDD/Index`).then((res) => {
    //       setEmpList(res);
    //       const result = res?.find((ans) => ans?.id == type);
    //       setLoading(false);
    //       setEmpLabel(result?.name);
    //     })
    //   : get(`EmployeeTypeDD/Index`).then((res) => {
    //       setEmpList(res);
    //       setLoading(false);
    //     });

    get(
      `ProviderCompliance/Index?page=${currentPage}&pagesize=${dataPerPage}&providerid=${branchValue}`
    ).then((action) => {
      console.log(action);
      setEmployeeList(action.models);

      setLoading(false);
      setEntity(action.totalEntity);
      setSerialNum(action.firstSerialNumber);
      setLoading(false);
    });

    get(`TableDefination/Index/${tableIdList?.Staff_List}`).then((res) => {
      setTableData(res);
      console.log(res, "motka");
    });
  }, [
    type,
    callApi,
    currentPage,
    dataPerPage,
    empValue,
    searchStr,
    success,
    branchValue,
  ]);

  const branchOptions = branch?.map((br) => ({
    label: br?.name,
    value: br?.id,
  }));

  const selectBranch = (label, value) => {
    setBranchLabel(label);
    setBranchValue(value);
  };

  const empOptiopns = empList?.map((emp) => ({
    label: emp?.name,
    value: emp?.id,
  }));

  const selectEmployeeType = (label, value) => {
    setEmpLabel(label);
    setEmpValue(value);
    setCallApi((prev) => !prev);
  };

  const toggleDanger = (data) => {
    setData(data);

    setDeleteModal(true);
  };

  const handlePass = (data) => {
    setPassData(data);

    setPassModal(true);
  };

  const handleDeleteStaff = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Employee/Delete/${data?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
      });

      setDeleteModal(false);
      setSuccess(!success);
      setButtonStatus(false);
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
  };

  const verifyPass = (e) => {
    setPassError("");
  };

  const passValidate = (e) => {
    setPass(e.target.value);
  };

  //  on reset
  const handleReset = () => {
    setBranchLabel("Select branch");
    setBranchValue(0);
    setEmpLabel("Select Provider Compliance  Type");
    setEmpValue(0);
    setSearchStr("");
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // add providerCompliance handler
  const handleAddStaff = () => {
    history.push("/providerComplianceRegistration");
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // employee click handler
  const handleEmpClick = (id) => {
    history.push({
      pathname: `/providerComplianceProfile/${id}`,
    });
  };

  const componentRef = useRef(employeeList);

  const redirecttoStaffGeneralInfo = (empId) => {
    history.push(`/providerComplianceGeneralInformation/${empId}`);
  };

  const redirectToStaffProfile = (empId) => {
    history.push(`/providerComplianceProfile/${empId}`);
  };

  // for hide/unhide column
  const handleChecked = (e, columnId) => {
    setCheck(e.target.checked);

    put(`TableDefination/Update/${tableIdList?.Staff_List}/${columnId}`).then(
      (res) => {
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          setSuccess(!success);
        } else {
        }
      }
    );
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
      setButtonStatus(true);
      put(`Password/ChangePasswordForEmployee`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status === 200 && res.data?.isSuccess === true) {
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

  return (
    <div>
      {loading ? (
        <div className="text-center">
          <img className="img-fluid" src={loader} alt="uapp_loader" />
        </div>
      ) : (
        <div>
          <BreadCrumb title="Provider Compliance  List" backTo="" path="/" />

          <SelectAndClear
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
            handleKeyDown={handleKeyDown}
            handleReset={handleReset}
          ></SelectAndClear>

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
                  {permissions?.includes(permissionList?.Add_Provider) ? (
                    <ButtonForFunction
                      func={handleAddStaff}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={"Add Provider Compliance "}
                    />
                  ) : null}
                </Col>

                {/* <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
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

                    <div className="mr-3">
                      <DropDownNumber
                        dropdownOpen={dropdownOpen}
                        toggle={toggle}
                        componentRef={componentRef}
                      ></DropDownNumber>
                    </div>

                  

                    <StuffColumnHide
                      dropdownOpen1={dropdownOpen1}
                      toggle1={toggle1}
                      tableData={tableData}
                      handleChecked={handleChecked}
                    ></StuffColumnHide>

              
                  </div>
                </Col> */}
              </Row>

              {permissions?.includes(permissionList?.View_Employee_list) && (
                <>
                  {loading ? (
                    <h2 className="text-center">Loading...</h2>
                  ) : (
                    <StaffTable
                      componentRef={componentRef}
                      tableData={tableData}
                      permissions={permissions}
                      permissionList={permissionList}
                      toggleDanger={toggleDanger}
                      deleteModal={deleteModal}
                      closeDeleteModal={closeDeleteModal}
                      buttonStatus={buttonStatus}
                      progress={progress}
                      userTypeId={userTypeId}
                      employeeList={employeeList}
                      handleEmpClick={handleEmpClick}
                      handlePass={handlePass}
                      serialNum={serialNum}
                      passModal={passModal}
                      handleToggle={handleToggle}
                      passData={passData}
                      submitModalForm={submitModalForm}
                      passValidate={passValidate}
                      setError={setError}
                      error={error}
                      verifyPass={verifyPass}
                      confirmPassword={confirmPassword}
                      passError={passError}
                      setPassModal={setPassModal}
                      redirectToStaffProfile={redirectToStaffProfile}
                      redirecttoStaffGeneralInfo={redirecttoStaffGeneralInfo}
                      handleDeleteStaff={handleDeleteStaff}
                    ></StaffTable>
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
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  employeeTypeList: state.employeeTypeDataReducer.employeeType,
});
export default connect(mapStateToProps)(Index);
