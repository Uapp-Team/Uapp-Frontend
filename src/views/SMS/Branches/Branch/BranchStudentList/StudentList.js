import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  Input,
  Col,
  Row,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
} from "reactstrap";
import Select from "react-select";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";

import ReactTableConvertToXl from "../../../ReactTableConvertToXl/ReactTableConvertToXl.js";
import ReactToPrint from "react-to-print";

import SearchAndClear from "./Component/SearchAndClear.js";
import StudentTable from "./Component/StudentTable.js";
import get from "../../../../../helpers/get.js";
import put from "../../../../../helpers/put.js";
import remove from "../../../../../helpers/remove.js";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb.js";
import { tableIdList } from "../../../../../constants/TableIdConstant.js";
import Loader from "../../../Search/Loader/Loader.js";
import { permissionList } from "../../../../../constants/AuthorizationConstant.js";
import { userTypes } from "../../../../../constants/userTypeConstant.js";
import Pagination from "../../../Pagination/Pagination.jsx";
import ButtonForFunction from "../../../Components/ButtonForFunction.js";

const StudentList = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { cId, type, id } = useParams();
  const [serialNum, setSerialNum] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [studentTypeLabel, setStudentTypeLabel] = useState("Type");
  const [studentTypeValue, setStudentTypeValue] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [delData, setDelData] = useState({});
  const referenceId = localStorage.getItem("referenceId");
  const userTypeId = localStorage.getItem("userType");
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [statusLabel, setStatusLabel] = useState("Accounts Status");
  const [statusValue, setStatusValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [orderLabel, setOrderLabel] = useState("Order By");
  const [orderValue, setOrderValue] = useState(0);
  const history = useHistory();
  const { addToast } = useToasts();
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

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      if (id) {
        const result = res?.find((ans) => ans?.id == id);
        setBranchLabel(result?.name);
      }
      setBranch(res);
    });

    if (type) {
      get("StudentTypeDD/Index").then((res) => {
        setStudentList(res);

        const result = res?.find((ans) => ans?.id === type);
        setStudentTypeLabel(result?.name);
      });
    } else {
      get("StudentTypeDD/Index").then((res) => {
        setStudentList(res);
      });
    }

    if (cId) {
      get("ConsultantDD/ByUser").then((res) => {
        setConsultant(res);

        const result = res.find((r) => r?.id === cId);
        setConsultantLabel(result?.name);
        setConsultantValue(result?.id);
      });
    } else {
      get("ConsultantDD/ByUser").then((res) => {
        setConsultant(res);
      });
    }
  }, [studentTypeValue, cId, consultantValue, type]);

  useEffect(() => {
    type
      ? get(
          `Student/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&StudentType=${type}&searchstring=${searchStr}&consultantId=${
            userTypeId === userTypes?.Consultant ? referenceId : consultantValue
          }&status=${statusValue}&sortby=${orderValue}&branchid=${id}`
        ).then((res) => {
          setStudentData(res?.models);
          setEntity(res?.totalEntity);
          setSerialNum(res?.firstSerialNumber);
          setLoading(false);
        })
      : cId
      ? get(
          `Student/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&StudentType=${studentTypeValue}&searchstring=${searchStr}&consultantId=${
            userTypeId === userTypes?.Consultant ? referenceId : cId
          }&status=${statusValue}&sortby=${orderValue}&branchid=${id}`
        ).then((res) => {
          setStudentData(res?.models);
          setEntity(res?.totalEntity);
          setSerialNum(res?.firstSerialNumber);
          setLoading(false);
        })
      : get(
          `Student/GetPaginated?page=${currentPage}&pageSize=${dataPerPage}&StudentType=${studentTypeValue}&searchstring=${searchStr}&consultantId=${
            userTypeId === userTypes?.Consultant ? referenceId : consultantValue
          }&status=${statusValue}&sortby=${orderValue}&branchid=${id}`
        ).then((res) => {
          setStudentData(res?.models);
          setEntity(res?.totalEntity);
          setSerialNum(res?.firstSerialNumber);
          setLoading(false);
        });

    get(`TableDefination/Index/${tableIdList?.Student_List}`).then((res) => {
      setTableData(res);
      console.log(res, "table data");
    });
  }, [
    userTypeId,
    referenceId,
    currentPage,
    dataPerPage,
    callApi,
    searchStr,
    studentTypeValue,
    success,
    statusValue,
    cId,
    consultantValue,
    type,
    orderValue,
    branchValue,
    id,
  ]);

  // student dropdown options
  const studentTypeOption = studentList?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const selectStudentType = (label, value) => {
    setStudentTypeLabel(label);
    setStudentTypeValue(value);
    handleSearch();
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // user select order
  const orderArr = [
    {
      label: "Newest",
      value: 1,
    },
    {
      label: "Oldest",
      value: 2,
    },
    {
      label: "A-Z",
      value: 3,
    },
    {
      label: "Z-A",
      value: 4,
    },
  ];
  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    setOrderLabel(label);
    setOrderValue(value);
    setCallApi((prev) => !prev);
  };

  const passValidate = (e) => {
    setPass(e.target.value);
  };

  const handleToggle = () => {
    setPassError("");
    setError("");
    setPassModal(!passModal);
  };

  const status = [
    {
      id: 1,
      name: "Active",
    },

    {
      id: 2,
      name: "Inactive",
    },
  ];

  const statusOption = status?.map((s) => ({
    label: s?.name,
    value: s?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    handleSearch();
  };

  const consultantOption = consultant?.map((c) => ({
    label: c?.name,
    value: c?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
    handleSearch();
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  // on clear
  const handleClearSearch = () => {
    setCurrentPage(1);
    setStudentTypeLabel("Type");
    setStudentTypeValue(0);
    setStatusValue(0);
    setStatusLabel("Accounts Status");
    setConsultantValue(0);
    !id && setBranchLabel("Select Branch");
    !id && setBranchValue(0);
    setConsultantLabel("Select Consultant");
    setSearchStr("");
    setCallApi((prev) => !prev);
  };

  const handleEdit = (data) => {
    history.push(`/addStudentInformation/${data?.id}/${1}`);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  // add university handler
  const handleAddStudent = () => {
    history.push("/addStudentRegister");
  };

  const componentRef = useRef();

  // Delete Modal

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
  };

  const verifyPass = (e) => {
    setPassError("");
  };

  const confirmPassword = (e) => {
    setCPass(e.target.value);
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
      setProgress(true);
      put(`Password/ChangePasswordForStudent`, subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
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

  const handleDeleteData = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Student/Delete/${delData?.id}`).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleBlacklist = (e, id) => {
    const subData = {
      id: id,
    };
    setButtonStatus(true);

    put(`Student/UpdateAccountStatus/${id}`, subData).then((res) => {
      setButtonStatus(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const redirectToStudentProfile = (studentId) => {
    history.push(`/studentProfile/${studentId}`);
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    setCheck(e.target.checked);

    put(`TableDefination/Update/${tableIdList?.Student_List}/${columnId}`).then(
      (res) => {
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          setSuccess(!success);
        }
      }
    );
  };

  return (
    <div>
      <BreadCrumb title="Student List" backTo="" path="/" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchAndClear
            id={id}
            branch={branch}
            setBranch={setBranch}
            branchLabel={branchLabel}
            setBranchLabel={setBranchLabel}
            branchValue={branchValue}
            setBranchValue={setBranchValue}
            studentTypeOption={studentTypeOption}
            studentTypeLabel={studentTypeLabel}
            studentTypeValue={studentTypeValue}
            selectStudentType={selectStudentType}
            type={type}
            searchStr={searchStr}
            searchValue={searchValue}
            handleClearSearch={handleClearSearch}
            handleKeyDown={handleKeyDown}
            userTypes={userTypes}
            consultantLabel={consultantLabel}
            consultantValue={consultantValue}
            consultantOption={consultantOption}
            selectConsultant={selectConsultant}
            cId={cId}
            statusLabel={statusLabel}
            statusValue={statusValue}
            selectStatusType={selectStatusType}
            statusOption={statusOption}
            setStudentTypeLabel={setStudentTypeLabel}
            setStudentTypeValue={setStudentTypeValue}
            setStatusValue={setStatusValue}
            setStatusLabel={setStatusLabel}
            setConsultantValue={setConsultantValue}
            setConsultantLabel={setConsultantLabel}
          ></SearchAndClear>

          <Card className="uapp-employee-search">
            <CardBody>
              {/* new */}
              <Row className="mb-3">
                <Col lg="5" md="5" sm="12" xs="12">
                  {permissions?.includes(permissionList?.Add_New_Student) ? (
                    <ButtonForFunction
                      color="primary"
                      icon={<i className="fas fa-plus"></i>}
                      func={handleAddStudent}
                      name={" Add Student"}
                    ></ButtonForFunction>
                  ) : null}
                </Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex flex-wrap justify-content-end">
                    <div className="me-3 mb-2">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">Order By :</div>
                        <div className="ddzindex">
                          <Select
                            className="mr-2"
                            options={orderName}
                            value={{ label: orderLabel, value: orderValue }}
                            onChange={(opt) =>
                              selectOrder(opt.label, opt.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

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

                    <div className="mr-3">
                      <Dropdown
                        className="uapp-dropdown"
                        style={{ float: "right" }}
                        isOpen={dropdownOpen}
                        toggle={toggle}
                      >
                        <DropdownToggle caret>
                          <i className="fas fa-print fs-7"></i>
                        </DropdownToggle>
                        <DropdownMenu className="bg-dd-4">
                          <div className="d-flex justify-content-around align-items-center mt-2">
                            <div className="cursor-pointer">
                              <ReactTableConvertToXl
                                id="test-table-xls-button"
                                table="table-to-xls"
                                filename="tablexls"
                                sheet="tablexls"
                                icon={<i className="fas fa-file-excel"></i>}
                              />
                            </div>
                            <div className="cursor-pointer">
                              <ReactToPrint
                                trigger={() => (
                                  <p>
                                    <i className="fas fa-file-pdf"></i>
                                  </p>
                                )}
                                content={() => componentRef.current}
                              />
                            </div>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide starts here */}

                    <div className="">
                      <Dropdown
                        className="uapp-dropdown"
                        style={{ float: "right" }}
                        isOpen={dropdownOpen1}
                        toggle={toggle1}
                      >
                        <DropdownToggle caret>
                          <i className="fas fa-bars"></i>
                        </DropdownToggle>
                        <DropdownMenu className="bg-dd-1">
                          {tableData.map((table, i) => (
                            <div key={i}>
                              {i === 8 ? (
                                <>
                                  {permissions?.includes(
                                    permissionList.Change_Student_Password
                                  ) && (
                                    <div className="d-flex justify-content-between">
                                      <Col md="8" className="">
                                        <p className="">{table?.collumnName}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="check"
                                            onChange={(e) => {
                                              handleChecked(e, table?.id);
                                            }}
                                            defaultChecked={table?.isActive}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </div>
                                  )}
                                </>
                              ) : i === 9 ? (
                                <>
                                  {permissions?.includes(
                                    permissionList.Change_Student_Account_Status
                                  ) && (
                                    <div className="d-flex justify-content-between">
                                      <Col md="8" className="">
                                        <p className="">{table?.collumnName}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="check"
                                            onChange={(e) => {
                                              handleChecked(e, table?.id);
                                            }}
                                            defaultChecked={table?.isActive}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="d-flex justify-content-between">
                                  <Col md="8" className="">
                                    <p className="">{table?.collumnName}</p>
                                  </Col>

                                  <Col md="4" className="text-center">
                                    <FormGroup check inline>
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id=""
                                        name="check"
                                        onChange={(e) => {
                                          handleChecked(e, table?.id);
                                        }}
                                        defaultChecked={table?.isActive}
                                      />
                                    </FormGroup>
                                  </Col>
                                </div>
                              )}
                            </div>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide ends here */}
                  </div>
                </Col>
              </Row>
              {permissions?.includes(permissionList?.View_Student_list) ? (
                <>
                  {loading ? (
                    <h2 className="text-center">Loading...</h2>
                  ) : (
                    <StudentTable
                      componentRef={componentRef}
                      tableData={tableData}
                      permissions={permissions}
                      permissionList={permissionList}
                      userTypeId={userTypeId}
                      userTypes={userTypes}
                      history={history}
                      studentData={studentData}
                      serialNum={serialNum}
                      handleDate={handleDate}
                      handlePass={handlePass}
                      passModal={passModal}
                      passData={passData}
                      submitModalForm={submitModalForm}
                      passValidate={passValidate}
                      handleToggle={handleToggle}
                      setError={setError}
                      error={error}
                      verifyPass={verifyPass}
                      confirmPassword={confirmPassword}
                      passError={passError}
                      setPassModal={setPassModal}
                      buttonStatus={buttonStatus}
                      progress={progress}
                      handleBlacklist={handleBlacklist}
                      redirectToStudentProfile={redirectToStudentProfile}
                      handleEdit={handleEdit}
                      toggleDanger={toggleDanger}
                      deleteModal={deleteModal}
                      setDeleteModal={setDeleteModal}
                      handleDeleteData={handleDeleteData}
                    ></StudentTable>
                  )}
                </>
              ) : null}

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

export default StudentList;
