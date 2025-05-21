import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  FormGroup,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useHistory, useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import remove from "../../../../../helpers/remove.js";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import LinkButton from "../../../Components/LinkButton.js";
import ReactTableConvertToXl from "../../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import { permissionList } from "../../../../../constants/AuthorizationConstant.js";
import ButtonLoader from "../../../Components/ButtonLoader.js";
import { tableIdList } from "../../../../../constants/TableIdConstant.js";
import put from "../../../../../helpers/put.js";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import MessageHistoryCardApplicationDetailsPage from "../../ApplicationDetails/Component/RightSide/MessageHistoryCardApplicationDetailsPage.js";
import { Link } from "react-router-dom";
import ColumnApplicationStudent from "../../../TableColumn/ColumnApplicationStudent.js";

const StudentApplication = ({ currentUser }) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [orderLabel, setOrderLabel] = useState("Select Order By");
  const [orderValue, setOrderValue] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [entity, setEntity] = useState(0);
  const [applicationDD, setApplicationDD] = useState([]);
  const [offerDD, setOfferDD] = useState([]);
  const [enrollDD, setEnrollDD] = useState([]);
  const [intakeDD, setIntakeDD] = useState([]);
  const [interviewDD, setInterviewDD] = useState([]);
  const [elptDD, setElptDD] = useState([]);
  const [financeDD, setFinanceDD] = useState([]);

  // for student
  const [studentUniDD, setStudentUniDD] = useState([]);
  const [studentUniLabel, setStudentUniLabel] = useState("University Name");
  const [studentUniValue, setStudentUniValue] = useState(0);

  const [studentConsDD, setStudentConsDD] = useState([]);
  const [studentConsLabel, setStudentConsLabel] = useState("Consultant");
  const [studentConsValue, setStudentConsValue] = useState(0);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // for all
  const [applicationLabel, setApplicationLabel] = useState("Status");
  const [applicationValue, setApplicationValue] = useState(0);
  const [offerLabel, setOfferLabel] = useState("Offer");
  const [offerValue, setOfferValue] = useState(0);
  const [enrollLabel, setEnrollLabel] = useState("Enrolment Status");
  const [enrollValue, setEnrollValue] = useState(0);
  const [intakeLabel, setIntakeLabel] = useState("Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [interviewLabel, setInterviewLabel] = useState("Interview");
  const [interviewValue, setInterviewValue] = useState(0);
  const [elptLabel, setElptLabel] = useState("ELPT");
  const [elptValue, setElptValue] = useState(0);
  const [financeLabel, setFinanceLabel] = useState("SLCs");
  const [financeValue, setFinanceValue] = useState(0);

  // application list
  const [applicationList, setApplicationList] = useState([]);
  const [serialNumber, setSerialNumber] = useState(0);

  const [cId, setConsId] = useState(undefined);
  const [uId, setUniId] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(false);

  // for hide/unhide column
  const [check, setCheck] = useState(true);

  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isHide, setIsHide] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatapp, setchatapp] = useState(null);
  const [TBC, setTBC] = useState(true);

  const isChatOpen = () => {
    setChatOpen(!chatOpen);
  };

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const tableColumnApplicationStudent = JSON.parse(
      localStorage.getItem("ColumnApplicationStudent")
    );
    tableColumnApplicationStudent &&
      setTableData(tableColumnApplicationStudent);
    !tableColumnApplicationStudent &&
      localStorage.setItem(
        "ColumnApplicationStudent",
        JSON.stringify(ColumnApplicationStudent)
      );
    !tableColumnApplicationStudent && setTableData(ColumnApplicationStudent);
  }, []);

  // for all dropdown
  const applicationMenu = applicationDD.map((application) => ({
    label: application?.name,
    value: application?.id,
  }));
  const offerMenu = offerDD.map((offer) => ({
    label: offer?.name,
    value: offer?.id,
  }));
  const enrollMenu = enrollDD.map((enroll) => ({
    label: enroll?.name,
    value: enroll?.id,
  }));
  const intakeMenu = intakeDD.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));
  const interviewMenu = interviewDD.map((interview) => ({
    label: interview?.name,
    value: interview?.id,
  }));
  const elptMenu = elptDD.map((elpt) => ({
    label: elpt?.name,
    value: elpt?.id,
  }));
  const financeMenu = financeDD.map((finance) => ({
    label: finance?.name,
    value: finance?.id,
  }));

  // for student dropdown
  const studentUniMenu = studentUniDD.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));
  const studentConsMenu = studentConsDD.map((consultant) => ({
    label: consultant?.name,
    value: consultant?.id,
  }));

  const selectAppliDD = (label, value) => {
    // setLoading(true);
    setApplicationLabel(label);
    setApplicationValue(value);
    // handleSearch();
  };
  const selectOfferDD = (label, value) => {
    // setLoading(true);
    setOfferLabel(label);
    setOfferValue(value);
    // handleSearch();
  };
  const selectEnrollDD = (label, value) => {
    // setLoading(true);
    setEnrollLabel(label);
    setEnrollValue(value);
    // handleSearch();
  };
  const selectIntakeDD = (label, value) => {
    // setLoading(true);
    setIntakeLabel(label);
    setIntakeValue(value);
    // handleSearch();
  };
  const selectInterviewDD = (label, value) => {
    // setLoading(true);
    setInterviewLabel(label);
    setInterviewValue(value);
    // handleSearch();
  };
  const selectElptDD = (label, value) => {
    // setLoading(true);
    setElptLabel(label);
    setElptValue(value);
    // handleSearch();
  };
  const selectFinanceDD = (label, value) => {
    // setLoading(true);
    setFinanceLabel(label);
    setFinanceValue(value);
    // handleSearch();
  };
  const selectStudentUni = (label, value) => {
    // setLoading(true);
    setStudentUniLabel(label);
    setStudentUniValue(value);
    // handleSearch();
  };
  const selectStdCons = (label, value) => {
    // setLoading(true);
    setStudentConsLabel(label);
    setStudentConsValue(value);
    // handleSearch();
  };

  // on clear
  const handleClearSearch = () => {
    setApplicationLabel("Status");
    setApplicationValue(0);
    setOfferLabel("Offer");
    setOfferValue(0);
    setEnrollLabel("Enrolment Status");
    setEnrollValue(0);
    setIntakeLabel("Intake");
    setIntakeValue(0);
    setInterviewLabel("Interview");
    setInterviewValue(0);
    setElptLabel("ELPT");
    setElptValue(0);
    setFinanceLabel("SLCs");
    setFinanceValue(0);
    setStudentUniLabel("University Name");
    setStudentUniValue(0);
    setStudentConsLabel("Consultant");
    setStudentConsValue(0);
    setCurrentPage(1);
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
  ];

  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    // setLoading(true);
    setOrderLabel(label);
    setOrderValue(value);
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    // setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  useEffect(() => {
    if (currentUser != undefined) {
      get(`Application/GetByStudent`).then((res) => {
        setLoading(false);
        setApplicationList(res);
        // setEntity(res?.totalEntity);
        // setSerialNumber(res?.firstSerialNumber);
      });
    }
  }, [success]);

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleExportXLSX = () => {
    // var wb = XLSX.utils.book_new(),
    // ws = XLSX.utils.json_to_sheet(universityList);
    // XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    // XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const componentRef = useRef();

  // redirect to dashboard
  const backToDashboard = () => {
    if (location.universityIdFromUniList != undefined) {
      history.push("/universityList");
    } else if (location.consultantIdFromConsultantList != undefined) {
      history.push("/consultantList");
    } else {
      history.push("/");
    }
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleDeleteData = () => {
    setProgress(true);
    remove(`Application/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      setDeleteModal(false);
      setDelData({});
    });
  };

  // for hide/unhide column

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnApplicationStudent", JSON.stringify(values));
  };

  return (
    <div>
      <BreadCrumb
        title="Register Interest Applications"
        backTo={
          location.universityIdFromUniList != undefined
            ? "University"
            : location.consultantIdFromConsultantList != undefined
            ? "Consultant"
            : ""
        }
        path={
          location.universityIdFromUniList != undefined
            ? "/universityList"
            : location.consultantIdFromConsultantList != undefined
            ? "/consultantList"
            : ""
        }
      />

      <Card className="uapp-employee-search">
        <CardBody>
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12">
              <h5 className="text-orange fw-700">
                Total {applicationList.length} items
              </h5>
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex flex-wrap justify-content-end">
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
                                name="isAcceptHome"
                                onChange={(e) => {
                                  handleChecked(e, i);
                                }}
                                defaultChecked={table?.isActive}
                              />
                            </FormGroup>
                          </Col>
                        </div>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>

          {permissions?.includes(permissionList.View_Application_List) && (
            <>
              {applicationList?.length === 0 ? (
                <h4 className="text-center">No Data Found</h4>
              ) : (
                <>
                  {loading ? (
                    <div className="d-flex justify-content-center mb-5">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive mb-3" ref={componentRef}>
                      <Table
                        id="table-to-xls"
                        style={{ verticalAlign: "middle" }}
                        className="table-sm table-bordered"
                      >
                        <thead className="thead-uapp-bg">
                          <tr style={{ textAlign: "center" }}>
                            {tableData[0]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                APP ID
                              </th>
                            ) : null}

                            {tableData[1]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                University
                              </th>
                            ) : null}
                            {tableData[2]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Campus
                              </th>
                            ) : null}
                            {tableData[3]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Course
                              </th>
                            ) : null}
                            {tableData[4]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Intake
                              </th>
                            ) : null}
                            {tableData[5]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Application Date
                              </th>
                            ) : null}
                            {tableData[6]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Status
                              </th>
                            ) : null}
                            {/* {tableData[7]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>Offer</th>
                            ) : null} */}
                            {tableData[8]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Interview
                              </th>
                            ) : null}
                            {tableData[9]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>ELPT</th>
                            ) : null}
                            {/* {tableData[10]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>
                                Enrolment Status
                              </th>
                            ) : null} */}
                            {tableData[11]?.isActive ? (
                              <th style={{ verticalAlign: "middle" }}>SLCs</th>
                            ) : null}

                            {tableData[12]?.isActive ? (
                              <th
                                style={{ verticalAlign: "middle" }}
                                className="text-center"
                              >
                                Action
                              </th>
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {applicationList?.map((app, i) => (
                            <tr key={i}>
                              {tableData[0]?.isActive ? (
                                <>
                                  <td style={{ verticalAlign: "middle" }}>
                                    <div className="cursor-pointer hyperlink-hover mb-2">
                                      <Link
                                        className="text-id hover"
                                        to={`/applicationDetails/${app?.id}/${app?.studentId}`}
                                      >
                                        {app?.applicationViewId}
                                      </Link>
                                    </div>
                                    {app?.isTBC === true && (
                                      <span
                                        style={{
                                          borderRadius: "999px",
                                          background: "#C1C6C6",
                                          color: "#fff",
                                          padding: "4px 10px",
                                          fontSize: "12px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        TBC
                                      </span>
                                    )}
                                  </td>
                                </>
                              ) : null}

                              {/* {checkId ? (
                        
                         <td style={{ verticalAlign: "middle" }} className='cursor-pointer hyperlink-hover'>
                         <span onClick={()=>{
                           history.push(`/studentProfile/${app?.studentId}`)
                         }}>{app?.uappId}</span>
                          
                        
                       </td>
                      ) : null} */}

                              {/* {checkApplic ? (
                        
                        <td style={{ verticalAlign: "middle" }} className='cursor-pointer hyperlink-hover'>
                        <span onClick={()=>{
                          history.push(`/applicationDetails/${app?.id}/${app?.studentId}`)
                        }}>{app?.studentName}</span>
                         
                       
                      </td>
                      ) : null} */}

                              {/* {checkContact ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.studentPhone} <br />
                          {app?.studentEmail}
                        </td>
                      ) : null} */}

                              {tableData[1]?.isActive ? (
                                <td
                                  style={{ verticalAlign: "middle" }}
                                  className="cursor-pointer hyperlink-hover"
                                >
                                  <span
                                    onClick={() => {
                                      history.push(
                                        `/universityDetails/${app?.universityId}`
                                      );
                                    }}
                                  >
                                    {app?.universityName}
                                  </span>
                                </td>
                              ) : null}

                              {tableData[2]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.campusName}
                                </td>
                              ) : null}

                              {tableData[3]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.subjectName}
                                </td>
                              ) : null}

                              {tableData[4]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.intakeName}
                                </td>
                              ) : null}

                              {tableData[5]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.createdOn}
                                </td>
                              ) : null}

                              {tableData[6]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.applicationStatusName} <br />
                                  {app?.ApplicationSubStatusName}
                                </td>
                              ) : null}

                              {/* {tableData[7]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.offerStatusName}
                                </td>
                              ) : null} */}

                              {tableData[8]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.interviewStatusName}
                                </td>
                              ) : null}

                              {tableData[9]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.elptStatusName}
                                </td>
                              ) : null}

                              {/* {tableData[10]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.enrollmentStatusName}
                                </td>
                              ) : null} */}

                              {tableData[11]?.isActive ? (
                                <td style={{ verticalAlign: "middle" }}>
                                  {app?.studentFinanceName}
                                </td>
                              ) : null}

                              {/* {checkCons ? (
                        <td style={{ verticalAlign: "middle" }}>
                          {app?.consultantName}
                        </td>
                      ) : null} */}

                              {tableData[12]?.isActive ? (
                                <td
                                  style={{ width: "8%" }}
                                  className="text-center"
                                >
                                  {/* <ButtonGroup variant="text"> */}

                                  <div className="d-flex">
                                    {permissions?.includes(
                                      permissionList.View_Application_Details
                                    ) ? (
                                      <LinkButton
                                        url={`/applicationDetails/${app?.id}/${app?.studentId}`}
                                        color="primary"
                                        className={"mx-1 btn-sm mt-2"}
                                        icon={<i className="fas fa-eye"></i>}
                                      />
                                    ) : null}

                                    <ButtonForFunction
                                      icon={
                                        <i
                                          className="fas fa-comment"
                                          style={{
                                            paddingLeft: "1.8px",
                                            paddingRight: "1.8px",
                                          }}
                                        ></i>
                                      }
                                      color={"info"}
                                      className={"mx-1 btn-sm mt-2"}
                                      func={() => {
                                        setChatOpen(true);
                                        setchatapp(app);
                                      }}
                                    />

                                    {permissions?.includes(
                                      permissionList.Delete_Application_Details
                                    ) ? (
                                      <ButtonForFunction
                                        icon={
                                          <i
                                            className="fas fa-trash-alt"
                                            style={{
                                              paddingLeft: "1.8px",
                                              paddingRight: "1.8px",
                                            }}
                                          ></i>
                                        }
                                        color={"danger"}
                                        className={"mx-1 btn-sm mt-2"}
                                        func={() => toggleDanger(app)}
                                      />
                                    ) : null}
                                  </div>

                                  {/* </ButtonGroup> */}

                                  <Modal
                                    isOpen={deleteModal}
                                    toggle={() => setDeleteModal(!deleteModal)}
                                    className="uapp-modal"
                                  >
                                    <ModalBody>
                                      <p>
                                        Are You Sure to Delete this ? Once
                                        Deleted it can't be Undone!
                                      </p>
                                    </ModalBody>

                                    <ModalFooter>
                                      <Button
                                        color="danger"
                                        onClick={handleDeleteData}
                                      >
                                        {progress ? <ButtonLoader /> : "YES"}
                                      </Button>
                                      <Button
                                        onClick={() => setDeleteModal(false)}
                                      >
                                        NO
                                      </Button>
                                    </ModalFooter>
                                  </Modal>
                                </td>
                              ) : null}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {/* <div className="d-flex justify-content-end mt-3">
            <h5>Total Results Found: {applicationList.length}</h5>
          </div> */}

          {/* <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          /> */}
        </CardBody>
      </Card>

      {chatOpen === true && (
        <div className="messanger">
          <MessageHistoryCardApplicationDetailsPage
            applicationSubStatusId={chatapp.applicationSubStatusId}
            applicationId={`${chatapp.id}`}
            viewId={`${chatapp.applicationViewId}`}
            chatOpen={chatOpen}
            close={() => {
              isChatOpen();
              setchatapp(null);
            }}
            attach={false}
            user={false}
          />
        </div>
      )}
    </div>
  );
};

export default StudentApplication;
