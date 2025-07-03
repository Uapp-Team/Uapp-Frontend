import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router";
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
import DropDownNumber from "./Component/DropDownNumber.js";
import SelectAndClear from "./Component/SelectAndClear.js";
import SalesManagerColumnHide from "./Component/SalesManagerColumnHide.js";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb.js";
import ColumnStaff from "../../../TableColumn/ColumnStaff.js";
import Loader from "../../../Search/Loader/Loader.js";
import Uget from "../../../../../helpers/Uget.js";
import SalesManagerTable from "./Component/SalesManagerTable.js";
import ColumnSalesManager from "../../../TableColumn/ColumnSalesManager.js";

const Index = (props) => {
  const SaleManagerPaging = JSON.parse(
    sessionStorage.getItem("Sales Team Leader")
  );
  const userType = localStorage.getItem("userType");
  const { type, branchId } = useParams();

  const location = useLocation();
  const history = useHistory();
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    SaleManagerPaging?.currentPage ? SaleManagerPaging?.currentPage : 1
  );
  const [searchStr, setSearchStr] = useState(
    SaleManagerPaging?.searchStr ? SaleManagerPaging?.searchStr : ""
  );
  const [dataPerPage, setDataPerPage] = useState(
    SaleManagerPaging?.dataPerPage ? SaleManagerPaging?.dataPerPage : 15
  );
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const userTypeId = localStorage.getItem("userType");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);

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
  const [isTyping, setIsTyping] = useState(false);
  const [branch, setBranch] = useState([]);

  const [branchValue, setBranchValue] = useState(
    branchId
      ? branchId
      : SaleManagerPaging?.branchValue
      ? SaleManagerPaging?.branchValue
      : 0
  );

  const [branchLabel, setBranchLabel] = useState(
    SaleManagerPaging?.branchLabel
      ? SaleManagerPaging?.branchLabel
      : "Select branch"
  );
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  useEffect(() => {
    const tableColumnSalesManager = JSON.parse(
      localStorage.getItem("ColumnSalesManager")
    );
    tableColumnSalesManager && setTableData(tableColumnSalesManager);
    !tableColumnSalesManager &&
      localStorage.setItem(
        "ColumnSalesManager",
        JSON.stringify(ColumnSalesManager)
      );
    !tableColumnSalesManager && setTableData(ColumnSalesManager);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "Sales Team Leader",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        branchLabel: branchLabel && branchLabel,
        branchValue: branchValue && branchValue,
        searchStr: searchStr && searchStr,
        dataPerPage: dataPerPage && dataPerPage,
      })
    );
  }, [currentPage, branchLabel, branchValue, searchStr, dataPerPage]);

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
      if (branchId) {
        const result = res?.find((ans) => ans?.id == branchId);
        setBranchLabel(result?.name);
      }
    });
    if (!isTyping) {
      Uget(
        `SalesManager/FetchPagedData?page=${currentPage}&pagesize=${dataPerPage}&branchId=${branchValue}&searchText=${searchStr}`
      ).then((action) => {
        setEmployeeList(action?.items);

        setSerialNum(action?.from);
        setEntity(action?.totalFiltered);
        setLoading(false);
      });
    }
  }, [
    callApi,
    currentPage,
    dataPerPage,
    searchStr,
    success,
    branchValue,
    isTyping,
    branchId,
  ]);

  const branchOptions = branch?.map((br) => ({
    label: br?.name,
    value: br?.id,
  }));

  const selectBranch = (label, value) => {
    setBranchLabel(label);
    setBranchValue(value);
  };

  const toggleDanger = (data) => {
    setData(data);
    setDeleteModal(true);
  };

  const handlePass = (data) => {
    setPassData(data);

    setPassModal(true);
  };

  const handleDeleteStaff = (data) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Employee/Delete/${data?.employeeId}`).then((res) => {
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

  const verifyPass = (e) => {
    setPassError("");
  };

  const passValidate = (e) => {
    setPass(e.target.value);
    if (e.target.value === "") {
      setError("Provide a valid password");
      // } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value)) {
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(e.target.value)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
    } else {
      setError("");
    }
  };

  //  on reset
  const handleReset = () => {
    setBranchLabel("Select branch");
    setBranchValue(0);
    setSearchStr("");
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  // useEffect(() => {
  //   handleReset();
  // }, [currentRoute]);

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // add staff handler
  const handleAddStaff = () => {
    history.push("/salesManagerRegistration");
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
      pathname: `/salesTeamLeaderProfile/${id}`,
    });
  };

  const componentRef = useRef(employeeList);

  const redirecttoStaffGeneralInfo = (empId) => {
    history.push(`/salesManagerGeneralInformation/${empId}`);
  };

  const redirectToStaffProfile = (empId) => {
    history.push(`/salesManagerProfile/${empId}`);
  };

  const redirectToAssignPage = (salesTeamLeaderId, branchId) => {
    history.push({
      pathname: `/salesManagerAssignSalesTeam/${salesTeamLeaderId}/${branchId}`,
    });
  };

  // for hide/unhide column
  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnStaff", JSON.stringify(values));
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("id", passData?.employeeId);
    subData.append("password", pass);
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(pass)) {
      setError(
        "Password must be six digits and combination of letters and numbers"
      );
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
      <BreadCrumb title="Sales Manager List" backTo="" path="/" />
      <div>
        <SelectAndClear
          userType={userType}
          type={type}
          branchId={branchId}
          branchOptions={branchOptions}
          branchLabel={branchLabel}
          branchValue={branchValue}
          selectBranch={selectBranch}
          searchStr={searchStr}
          setSearchStr={setSearchStr}
          setBranchLabel={setBranchLabel}
          setBranchValue={setBranchValue}
          handleKeyDown={handleKeyDown}
          handleReset={handleReset}
          setIsTyping={setIsTyping}
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
                {permissions?.includes(permissionList?.Add_SalesManager) ? (
                  <ButtonForFunction
                    func={handleAddStaff}
                    className={"btn btn-uapp-add "}
                    icon={<i className="fas fa-plus"></i>}
                    name={"Add Sales Manager"}
                  />
                ) : null}
              </Col>

              <Col lg="7" md="7" sm="12" xs="12">
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

                  {/* column hide unhide starts here */}

                  <SalesManagerColumnHide
                    dropdownOpen1={dropdownOpen1}
                    toggle1={toggle1}
                    tableData={tableData}
                    setTableData={setTableData}
                    handleChecked={handleChecked}
                  ></SalesManagerColumnHide>

                  {/* column hide unhide ends here */}
                </div>
              </Col>
            </Row>

            {permissions?.includes(permissionList?.View_SalesManager_list) && (
              <>
                {employeeList?.length === 0 ? (
                  <h4 className="text-center">No Data Found</h4>
                ) : (
                  <>
                    {" "}
                    {loading ? (
                      <Loader />
                    ) : (
                      <SalesManagerTable
                        componentRef={componentRef}
                        tableData={tableData}
                        permissions={permissions}
                        permissionList={permissionList}
                        data={data}
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
                        pass={pass}
                        setPass={setPass}
                        setError={setError}
                        error={error}
                        verifyPass={verifyPass}
                        confirmPassword={confirmPassword}
                        passError={passError}
                        setPassModal={setPassModal}
                        redirectToStaffProfile={redirectToStaffProfile}
                        redirecttoStaffGeneralInfo={redirecttoStaffGeneralInfo}
                        handleDeleteStaff={handleDeleteStaff}
                        redirectToAssignPage={redirectToAssignPage}
                      />
                    )}
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employeeTypeList: state.employeeTypeDataReducer.employeeType,
});
export default connect(mapStateToProps)(Index);
