import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  FormGroup,
  Input,
  Col,
  Row,
  Table,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Select from "react-select";
import { useHistory, useParams } from "react-router-dom";
import get from "../../../../helpers/get";
import Pagination from "../../Pagination/Pagination";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import { userTypes } from "../../../../constants/userTypeConstant";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { tableIdList } from "../../../../constants/TableIdConstant";
import put from "../../../../helpers/put";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../../components/buttons/TagButton";
import Filter from "../../../../components/Dropdown/Filter";

const Index = () => {
  const userType = localStorage.getItem("userType");
  const history = useHistory();
  const { consultantId } = useParams();
  const [uapp, setUapp] = useState([]);
  const [uappLabel, setUappLabel] = useState("UAPP ID");
  const [uappValue, setUappValue] = useState(0);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [student, setStudent] = useState([]);
  const [studentLabel, setStudentLabel] = useState("Student");
  const [studentValue, setStudentValue] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [consultant, setConsultant] = useState([]);
  const [consultantType, setConsultantType] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [consultantTypeLabel, setConsultantTypeLabel] =
    useState("Consultant Type");
  const [consultantTypeValue, setConsultantTypeValue] = useState(0);
  const [intake, setIntake] = useState([]);
  const [intakeLabel, setIntakeLabel] = useState("Intake Range");
  const [intakeValue, setIntakeValue] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [transactionLabel, setTransactionLabel] =
    useState("Transaction Status");
  const [transactionValue, setTransactionValue] = useState(0);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [callApi, setCallApi] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [loading, setLoading] = useState(true);

  // for hide/unhide table column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [success, setSuccess] = useState(false);

  const selectDataSize = (value) => {
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const componentRef = useRef();

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });

    get(`ConsultantDD/ByUser`).then((res) => {
      setConsultant(res);
    });

    get(`ConsultantTypeDD/index`).then((res) => {
      setConsultantType(res);
    });

    get(`TransactionStatusDD/Index`).then((res) => {
      setTransaction(res);
    });

    get(`StudentDD/Index`).then((res) => {
      setStudent(res);
    });

    get(`AccountIntake/index`).then((res) => {
      setIntake(res);
    });

    get(`UappIdDD/Index`).then((res) => {
      setUapp(res);
    });

    get(
      `TableDefination/Index/${tableIdList?.Application_Transaction_List}`
    ).then((res) => {
      setTableData(res);
      console.log(res, "table data");
    });
  }, [success]);

  useEffect(() => {
    if (consultantId) {
      const result = consultant?.find((ans) => ans?.id == consultantId);
      setConsultantLabel(result?.name);
      setConsultantValue(result?.id);
    }
  }, [consultantId, consultant, success]);

  useEffect(() => {
    if (consultantId !== undefined) {
      get(
        `ApplicationTransaction/Index?page=${currentPage}&pagesize=${dataPerPage}&uappid=${uappValue}&studentid=${studentValue}&typeid=${consultantTypeValue}&consultantid=${consultantId}&intakeid=${intakeValue}&statusid=${transactionValue}&branchid=${branchValue}`
      ).then((res) => {
        setData(res?.models);

        setEntity(res?.totalEntity);
        setLoading(false);
      });
    } else {
      get(
        `ApplicationTransaction/Index?page=${currentPage}&pagesize=${dataPerPage}&uappid=${uappValue}&studentid=${studentValue}&typeid=${consultantTypeValue}&consultantid=${consultantValue}&intakeid=${intakeValue}&statusid=${transactionValue}&branchid=${branchValue}`
      ).then((res) => {
        setData(res?.models);
        setEntity(res?.totalEntity);
        setLoading(false);
      });
    }
  }, [
    currentPage,
    dataPerPage,
    callApi,
    uappValue,
    intakeValue,
    studentValue,
    consultantValue,
    consultantId,
    success,
    transactionValue,
    consultantTypeValue,
    branchValue,
  ]);

  const studentOptions = student?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const selectStudent = (label, value) => {
    setStudentLabel(label);
    setStudentValue(value);
  };

  const consultantOptions = consultant?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const consultantTypeOptions = consultantType?.map((conType) => ({
    label: conType?.name,
    value: conType?.id,
  }));

  const selectConsultantType = (label, value) => {
    console.log(value);
    setConsultantTypeLabel(label);
    setConsultantTypeValue(value);
    get(`Consultantdd/ByUser/${value}`).then((res) => {
      setConsultant(res);
    });
  };
  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };
  const selectTransaction = (label, value) => {
    setTransactionLabel(label);
    setTransactionValue(value);
  };

  const TransactionOptions = transaction?.map((trans) => ({
    label: trans?.name,
    value: trans?.id,
  }));
  const intakeOptions = intake?.map((int) => ({
    label: int?.intakeName,
    value: int?.id,
  }));

  const selectIntake = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
  };

  const uappOptions = uapp?.map((int) => ({
    label: int?.name,
    value: int?.id,
  }));

  const selectUapp = (label, value) => {
    setUappLabel(label);
    setUappValue(value);
  };

  const handleReset = () => {
    setUappLabel("UAPP ID");
    setUappValue(0);
    setStudentLabel("Student");
    setStudentValue(0);
    setConsultantLabel("Consultant");
    setConsultantValue(0);
    setConsultantTypeLabel("Consultant Type");
    setConsultantTypeValue(0);
    setIntakeLabel("Intake");
    setIntakeValue(0);
    setTransactionLabel("Transaction Status");
    setTransactionValue(0);
    setBranchLabel("Select Branch");
    setBranchValue(0);
  };

  const viewDetails = (data) => {
    history.push(`/applicationTransactionDetails/${data?.id}`);
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    setCheck(e.target.checked);

    put(
      `TableDefination/Update/${tableIdList?.Application_Transaction_List}/${columnId}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        // addToast(res?.data?.message, {
        //   appearance: "success",
        //   autoDismiss: true,
        // });
        setSuccess(!success);
      } else {
        // addToast(res?.data?.message, {
        //   appearance: "error",
        //   autoDismiss: true,
        // });
      }
    });
  };

  console.log(consultantValue);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb title="Application Transaction List" backTo="" path="/" />

          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    {userType !== userTypes?.Consultant ? (
                      <div className="col-md-3 mb-3">
                        <Select
                          options={consultantTypeOptions}
                          value={{
                            label: consultantTypeLabel,
                            value: consultantTypeValue,
                          }}
                          onChange={(opt) =>
                            selectConsultantType(opt.label, opt.value)
                          }
                          isDisabled={consultantId !== undefined ? true : false}
                        />
                      </div>
                    ) : null}
                    {userType !== userTypes?.Consultant ? (
                      <div className="col-md-3 mb-3">
                        <Select
                          options={consultantOptions}
                          value={{
                            label: consultantLabel,
                            value: consultantValue,
                          }}
                          onChange={(opt) =>
                            selectConsultant(opt.label, opt.value)
                          }
                          isDisabled={consultantId !== undefined ? true : false}
                        />
                      </div>
                    ) : null}
                    {branch.length > 1 && (
                      <div className="col-md-3 mb-3">
                        <Filter
                          data={branch}
                          label={branchLabel}
                          setLabel={setBranchLabel}
                          value={branchValue}
                          setValue={setBranchValue}
                          action={() => {}}
                        />
                      </div>
                    )}
                    <div className="col-md-3 mb-3">
                      <Select
                        options={uappOptions}
                        value={{ label: uappLabel, value: uappValue }}
                        onChange={(opt) => selectUapp(opt.label, opt.value)}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <Select
                        options={studentOptions}
                        value={{ label: studentLabel, value: studentValue }}
                        onChange={(opt) => selectStudent(opt.label, opt.value)}
                      />
                    </div>{" "}
                    <div className="col-md-3 mb-3">
                      <Select
                        options={intakeOptions}
                        value={{ label: intakeLabel, value: intakeValue }}
                        onChange={(opt) => selectIntake(opt.label, opt.value)}
                      />
                    </div>
                    <div className="col-md-3 md-3">
                      <Select
                        options={TransactionOptions}
                        value={{
                          label: transactionLabel,
                          value: transactionValue,
                        }}
                        onChange={(opt) =>
                          selectTransaction(opt.label, opt.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 d-flex justify-content-start">
                  <div className="d-flex mt-1">
                    {consultantTypeValue !== 0 ? (
                      <TagButton
                        label={consultantTypeLabel}
                        setValue={() => setConsultantTypeValue(0)}
                        setLabel={() =>
                          setConsultantTypeLabel("Consultant Type")
                        }
                      ></TagButton>
                    ) : (
                      ""
                    )}

                    {consultantTypeValue !== 0 &&
                    (uappValue !== 0 ||
                      studentValue !== 0 ||
                      consultantValue !== 0 ||
                      transactionValue !== 0 ||
                      intakeValue !== 0)
                      ? ""
                      : ""}

                    {uappValue !== 0 ? (
                      <TagButton
                        label={uappLabel}
                        setValue={() => setUappValue(0)}
                        setLabel={() => setUappLabel("UAPP ID")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {uappValue !== 0 &&
                    (studentValue !== 0 ||
                      consultantValue !== 0 ||
                      transactionValue !== 0 ||
                      intakeValue !== 0)
                      ? ""
                      : ""}
                    {studentValue !== 0 ? (
                      <TagButton
                        label={studentLabel}
                        setValue={() => setStudentValue(0)}
                        setLabel={() => setStudentLabel("Student")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {studentValue !== 0 &&
                    (consultantValue !== 0 ||
                      intakeValue !== 0 ||
                      transactionValue !== 0)
                      ? ""
                      : ""}
                    {consultantValue !== 0 ? (
                      <TagButton
                        label={consultantLabel}
                        setValue={() => setConsultantValue(0)}
                        setLabel={() => setConsultantLabel("Consultant")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {consultantValue !== 0 &&
                    (intakeValue !== 0 || transactionValue !== 0)
                      ? ""
                      : ""}
                    {intakeValue !== 0 ? (
                      <TagButton
                        label={intakeLabel}
                        setValue={() => setIntakeValue(0)}
                        setLabel={() => setIntakeLabel("Intake Range")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {branchValue !== 0 ? (
                      <TagButton
                        label={branchLabel}
                        setValue={() => setBranchValue(0)}
                        setLabel={() => setBranchLabel("Select Branch")}
                      ></TagButton>
                    ) : (
                      ""
                    )}
                    {transactionValue !== 0 ? (
                      <TagButton
                        label={transactionLabel}
                        setValue={() => setTransactionValue(0)}
                        setLabel={() =>
                          setTransactionLabel("Transaction Status")
                        }
                      ></TagButton>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="mt-1 mx-1 d-flex btn-clear"
                    onClick={handleReset}
                  >
                    {consultantTypeValue !== 0 ||
                    uappValue !== 0 ||
                    studentValue !== 0 ||
                    consultantValue !== 0 ||
                    branchValue !== 0 ||
                    intakeValue !== 0 ||
                    transactionValue !== 0 ? (
                      <button className="tag-clear" onClick={handleReset}>
                        Clear All
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="uapp-employee-search">
            <CardBody>
              {/* new */}
              <Row className="mb-3">
                <Col lg="5" md="5" sm="12" xs="12"></Col>

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
                              {/* <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p> */}
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
                              {i === 13 ? (
                                <>
                                  {" "}
                                  {permissions?.includes(
                                    permissionList?.View_Application_Transactions
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
                                            name="isAcceptHome"
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
                                        name="isAcceptHome"
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
                  </div>
                </Col>
              </Row>

              <div className="table-responsive">
                <Table id="table-to-xls" className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr className="text-center">
                      {tableData[0]?.isActive ? <th>SL/NO</th> : null}
                      {tableData[1]?.isActive ? <th>Id</th> : null}
                      {tableData[2]?.isActive ? <th>Intake</th> : null}
                      {tableData[3]?.isActive ? <th>Consultant</th> : null}
                      {tableData[4]?.isActive ? <th>Student</th> : null}
                      {tableData[5]?.isActive ? <th>University</th> : null}
                      {tableData[6]?.isActive ? <th>Courses</th> : null}
                      {tableData[7]?.isActive ? <th>Intake Range</th> : null}
                      {tableData[8]?.isActive ? <th>Amount</th> : null}
                      {tableData[9]?.isActive ? <th>Reg. Status</th> : null}

                      {tableData[10]?.isActive ? (
                        <th>Transaction Date</th>
                      ) : null}
                      {tableData[11]?.isActive ? <th>Status</th> : null}
                      {tableData[12]?.isActive ? <th>Branch</th> : null}
                      {permissions?.includes(
                        permissionList?.View_Application_Transactions
                      ) ? (
                        <>{tableData[13]?.isActive ? <th>Action</th> : null}</>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((ls, i) => (
                      <tr key={i} className="text-center">
                        {tableData[0]?.isActive ? (
                          <th scope="row">{i + 1}</th>
                        ) : null}
                        {tableData[1]?.isActive ? <td>{ls?.id}</td> : null}
                        {tableData[2]?.isActive ? <td>{ls?.intake}</td> : null}
                        {tableData[3]?.isActive ? (
                          <td>{ls?.consultant}</td>
                        ) : null}
                        {tableData[4]?.isActive ? <td>{ls?.student}</td> : null}
                        {tableData[5]?.isActive ? (
                          <td>{ls?.unviersity}</td>
                        ) : null}
                        {tableData[6]?.isActive ? <td>{ls?.subject}</td> : null}
                        {tableData[7]?.isActive ? (
                          <td>{ls?.accountIntake}</td>
                        ) : null}
                        {tableData[8]?.isActive ? <td>£{ls?.amount}</td> : null}
                        {tableData[9]?.isActive ? (
                          <td> {ls?.registrationStatus}</td>
                        ) : null}

                        {tableData[10]?.isActive ? (
                          <td>{ls?.transactionDate}</td>
                        ) : null}
                        {tableData[11]?.isActive ? (
                          <td>{ls?.transactionStatus}</td>
                        ) : null}
                        {tableData[12]?.isActive ? (
                          <td>{ls?.branchName}</td>
                        ) : null}

                        <>
                          {permissions?.includes(
                            permissionList?.View_Application_Transactions
                          ) ? (
                            <>
                              {" "}
                              {tableData[13]?.isActive ? (
                                <td className="text-center">
                                  <ButtonGroup variant="text">
                                    <Button
                                      className="me-1 btn-sm"
                                      color="primary"
                                      onClick={() => viewDetails(ls)}
                                    >
                                      <i className="fas fa-eye"></i>
                                    </Button>
                                  </ButtonGroup>
                                </td>
                              ) : null}
                            </>
                          ) : null}
                        </>
                        {/* ) : null} */}
                      </tr>
                    ))}
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
        </>
      )}
    </div>
  );
};

export default Index;
