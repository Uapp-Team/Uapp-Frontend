import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import ColumnLeadStudent from "../TableColumn/ColumnLeadStudent";
import get from "../../../helpers/get";
import { userTypes } from "../../../constants/userTypeConstant";
import put from "../../../helpers/put";
import remove from "../../../helpers/remove";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import Loader from "../Search/Loader/Loader";
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { permissionList } from "../../../constants/AuthorizationConstant";
import Select from "react-select";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import Pagination from "../Pagination/Pagination";
import SearchAndClear from "./Component/SearchAndClear";
import LeadTable from "./Component/LeadTable";

const LeadStudentList = () => {
  const student = JSON.parse(sessionStorage.getItem("student"));
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { cId, type, id } = useParams();
  const [serialNum, setSerialNum] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [studentTypeList, setStudentTypeList] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [companionLabel, setCompanionLabel] = useState("Select Referrer");
  const [companionValue, setCompanionValue] = useState(0);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState(
    student?.branchLabel ? student?.branchLabel : "Select Branch"
  );
  const [branchValue, setBranchValue] = useState(
    student?.branchValue ? student?.branchValue : 0
  );
  const [studentTypeLabel, setStudentTypeLabel] = useState(
    student?.studentTypeLabel ? student?.studentTypeLabel : "Type"
  );
  const [studentTypeValue, setStudentTypeValue] = useState(
    student?.studentTypeValue ? student?.studentTypeValue : 0
  );
  const [searchStr, setSearchStr] = useState(
    student?.searchStr ? student?.searchStr : ""
  );
  const [delData, setDelData] = useState({});
  const referenceId = localStorage.getItem("referenceId");
  const userTypeId = localStorage.getItem("userType");
  const [consultant, setConsultant] = useState([]);

  const [consultantLabel, setConsultantLabel] = useState(
    student?.consultantLabel ? student?.consultantLabel : "Select Consultant"
  );
  const [consultantValue, setConsultantValue] = useState(
    student?.consultantValue ? student?.consultantValue : 0
  );
  const [statusLabel, setStatusLabel] = useState(
    student?.statusLabel ? student?.statusLabel : "Accounts Status"
  );
  const [statusValue, setStatusValue] = useState(
    student?.statusValue ? student?.statusValue : 0
  );

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    student?.currentPage ? student?.currentPage : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    student?.dataPerPage ? student?.dataPerPage : 15
  );
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [orderLabel, setOrderLabel] = useState(
    student?.orderLabel ? student?.orderLabel : "Order By"
  );
  const [orderValue, setOrderValue] = useState(
    student?.orderValue ? student?.orderValue : 0
  );
  const history = useHistory();
  const { addToast } = useToasts();
  const [passModal, setPassModal] = useState(false);
  const [passData, setPassData] = useState({});
  const [passError, setPassError] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [error, setError] = useState("");

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [check, setCheck] = useState(false);

  // api starts here
  useEffect(() => {
    const tableColumn = JSON.parse(localStorage.getItem("ColumnLeadStudent"));

    tableColumn && setTableData(tableColumn);

    !tableColumn &&
      localStorage.setItem(
        "ColumnLeadStudent",
        JSON.stringify(ColumnLeadStudent)
      );
    !tableColumn && setTableData(ColumnLeadStudent);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "student",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        studentTypeLabel: studentTypeLabel && studentTypeLabel,
        studentTypeValue: studentTypeValue && studentTypeValue,
        branchLabel: branchLabel && branchLabel,
        branchValue: branchValue && branchValue,
        consultantLabel: consultantLabel && consultantLabel,
        consultantValue: consultantValue && consultantValue,
        statusLabel: statusLabel && statusLabel,
        statusValue: statusValue && statusValue,
        searchStr: searchStr && searchStr,
        dataPerPage: dataPerPage && dataPerPage,
        orderLabel: orderLabel && orderLabel,
        orderValue: orderValue && orderValue,
      })
    );
  }, [
    branchLabel,
    branchValue,
    consultantLabel,
    consultantValue,
    currentPage,
    dataPerPage,
    orderLabel,
    orderValue,
    searchStr,
    statusLabel,
    statusValue,
    studentTypeLabel,
    studentTypeValue,
  ]);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
      if (id) {
        const result = res?.find((ans) => ans?.id.toString() === id);
        setBranchValue(result?.id);
        setBranchLabel(result?.name);
      }
      setBranch(res);
    });

    if (type) {
      get("StudentTypeDD/Index").then((res) => {
        setStudentTypeList(res);

        const result = res?.find((ans) => ans?.id === type);
        setStudentTypeLabel(result?.name);
      });
    } else {
      get("StudentTypeDD/Index").then((res) => {
        setStudentTypeList(res);
      });
    }

    get("ConsultantDD/ByUser").then((res) => {
      setConsultant(res);
      if (cId) {
        const result = res.filter((r) => {
          return r.id.toString() === cId;
        });
        setConsultantLabel(result[0]?.name);
      }
    });
  }, [studentTypeValue, cId, consultantValue, type, id]);

  useEffect(() => {
    type
      ? get(
          `Student/GetLeadPaginated?page=${currentPage}&pageSize=${dataPerPage}&studenttype=${type}&searchstring=${searchStr}&consultantId=${
            userTypeId === userTypes?.Consultant ? referenceId : consultantValue
          }&status=${statusValue}&sortby=${orderValue}&branchid=${branchValue}&isconsultant=${check}`
        ).then((res) => {
          setStudentData(res?.models);
          setEntity(res?.totalEntity);
          setSerialNum(res?.firstSerialNumber);
          setLoading(false);
        })
      : cId
      ? get(
          `Student/GetLeadPaginated?page=${currentPage}&pageSize=${dataPerPage}&studenttype=${studentTypeValue}&searchstring=${searchStr}&consultantId=${
            userTypeId === userTypes?.Consultant ? referenceId : cId
          }&status=${statusValue}&sortby=${orderValue}&branchid=${branchValue}&isconsultant=${check}`
        ).then((res) => {
          setStudentData(res?.models);
          setEntity(res?.totalEntity);
          setSerialNum(res?.firstSerialNumber);
          setLoading(false);
        })
      : get(
          `Student/GetLeadPaginated?page=${currentPage}&pageSize=${dataPerPage}&studenttype=${studentTypeValue}&searchstring=${searchStr}&consultantId=${
            userTypeId === userTypes?.Consultant ? referenceId : consultantValue
          }&status=${statusValue}&sortby=${orderValue}&branchid=${branchValue}&isconsultant=${check}&companionId=${companionValue}`
        ).then((res) => {
          setStudentData(res?.models);
          setEntity(res?.totalEntity);
          setSerialNum(res?.firstSerialNumber);
          setLoading(false);
        });

    // get(`TableDefination/Index/${tableIdList?.Student_List}`).then((res) => {
    //   setTableData(res);
    //   console.log(res, "table data");
    // });
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
    check,
    companionValue,
  ]);

  // api ends here

  // student dropdown options
  const studentTypeOption = studentTypeList?.map((std) => ({
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

  // consultant dropdown

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

  // search handler parts here

  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  // on clear button parts here

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

  // Edit students parts here

  const handleEdit = (data) => {
    history.push(`/addStudentInformation/${data?.id}/${1}`);
  };

  // on enter press parts here

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  //go to student register page starts here

  const handleAddStudent = () => {
    history.push("/addStudentRegister");
  };

  const componentRef = useRef();

  // Delete Modal parts here

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  //password parts starts here
  const handlePass = (data) => {
    setPassData(data);
    setPassModal(true);
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

  //Update and change password submitting starts here

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

  //Update and change password submitting ends here

  //student delete parts here
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

  //for date parts here

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  //Student black list parts here

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

  //go to student profile parts here

  const redirectToStudentProfile = (studentId) => {
    history.push(`/studentProfile/${studentId}`);
  };

  // for hide/unhide column

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnLeadStudent", JSON.stringify(values));
  };
  return (
    <div>
      <BreadCrumb title="Lead Students" backTo="" path="/" />
      {loading ? (
        <Loader />
      ) : (
        <>
          {/*SearchAndClear starts here */}

          <SearchAndClear
            check={check}
            setCheck={setCheck}
            branchId={id}
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
            setCompanionValue={setCompanionValue}
            companionValue={companionValue}
            setCompanionLabel={setCompanionLabel}
            companionLabel={companionLabel}
          />

          {/*SearchAndClear ends here */}

          <Card className="uapp-employee-search">
            <CardBody>
              {/* add student, order by, showing and column hide starts here */}

              <Row className="mb-3">
                <Col lg="5" md="5" sm="12" xs="12">
                  {/* {permissions?.includes(permissionList?.Add_New_Student) ? (
                    <ButtonForFunction
                      color="primary"
                      icon={<i className="fas fa-plus"></i>}
                      func={handleAddStudent}
                      name={" Add Student"}
                    ></ButtonForFunction>
                  ) : null} */}
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
                            {/* <div className="cursor-pointer">
                              <ReactToPrint
                                trigger={() => (
                                  <p>
                                    <i className="fas fa-file-pdf"></i>
                                  </p>
                                )}
                                content={() => componentRef.current}
                              />
                            </div> */}
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
                          {tableData?.map((table, i) => (
                            <div key={i}>
                              {i === 3 ? (
                                <>
                                  {userTypeId !== userTypes?.Consultant && (
                                    <div className="d-flex justify-content-between">
                                      <Col md="8" className="">
                                        <p className="">{table?.title}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="check"
                                            onChange={(e) => {
                                              handleChecked(e, i);
                                            }}
                                            checked={table?.isActive}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </div>
                                  )}
                                </>
                              ) : i === 6 ? (
                                <>
                                  {permissions?.includes(
                                    permissionList.Change_Student_Password
                                  ) && (
                                    <div className="d-flex justify-content-between">
                                      <Col md="8" className="">
                                        <p className="">{table?.title}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="check"
                                            onChange={(e) => {
                                              handleChecked(e, i);
                                            }}
                                            checked={table?.isActive}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </div>
                                  )}
                                </>
                              ) : i === 7 ? (
                                <>
                                  {permissions?.includes(
                                    permissionList.Change_Student_Account_Status
                                  ) && (
                                    <div className="d-flex justify-content-between">
                                      <Col md="8" className="">
                                        <p className="">{table?.title}</p>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <FormGroup check inline>
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            id=""
                                            name="check"
                                            onChange={(e) => {
                                              handleChecked(e, i);
                                            }}
                                            checked={table?.isActive}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="d-flex justify-content-between">
                                  <Col md="8" className="">
                                    <p className="">{table?.title}</p>
                                  </Col>

                                  <Col md="4" className="text-center">
                                    <FormGroup check inline>
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id=""
                                        name="check"
                                        onChange={(e) => {
                                          handleChecked(e, i);
                                        }}
                                        checked={table?.isActive}
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

              {/* add student, order by, showing and column hide starts here */}

              {/* Student Table starts here */}

              {permissions?.includes(permissionList?.View_Student_list) ? (
                <>
                  {studentData?.length === 0 ? (
                    <h4 className="text-center">No Data Found</h4>
                  ) : (
                    <>
                      {loading ? (
                        <h2 className="text-center">Loading...</h2>
                      ) : (
                        <LeadTable
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
                          pass={pass}
                          cPass={cPass}
                        />
                      )}
                    </>
                  )}
                </>
              ) : null}

              {/* Student Table starts here */}

              {/*Pagination starts here */}

              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />

              {/*Pagination ends here */}
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};

export default LeadStudentList;
