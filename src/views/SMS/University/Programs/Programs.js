import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { permissionList } from "../../../../constants/AuthorizationConstant";

import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import remove from "../../../../helpers/remove";
import Pagination from "../../../SMS/Pagination/Pagination.jsx";
import { connect, useDispatch } from "react-redux";
// import { StoreUniversityCampusListData } from '../../../redux/actions/SMS/UniversityAction/UniversityCampusListAction';
import { StoreUniversityCampusListData } from "../../../../redux/actions/SMS/UniversityAction/UniversityCampusListAction";
// import { StoreUniversityListData } from '../../../redux/actions/SMS/UniversityAction/UniversityListAction';
import { StoreUniversityListData } from "../../../../redux/actions/SMS/UniversityAction/UniversityListAction";
import ButtonForFunction from "../../Components/ButtonForFunction";
import LinkButton from "../../Components/LinkButton";
import { userTypes } from "../../../../constants/userTypeConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import put from "../../../../helpers/put";
import { tableIdList } from "../../../../constants/TableIdConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../../components/buttons/TagButton";
import ReactHTMLTableToExcel from "../Subjects/ReactTableToXl";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const Programs = (props) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [subList, setSubList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);
  const [progress, setProgress] = useState(false);
  const [universityList, setUniversityList] = useState([]);
  const [uniLabel, setUniLabel] = useState("Select University");
  const [uniValue, setUniValue] = useState(0);
  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [intakeList, setIntakeList] = useState([]);
  const [educationLabel, setEducationLabel] = useState(
    "Select Education Level"
  );
  const [educationValue, setEducationValue] = useState(0);
  const [educationList, setEducationList] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [uniTypeId, setUTypeId] = useState(0);
  const [ulist, setUList] = useState([]);
  const [cam, setCam] = useState([]);
  const [submitData, setSubmitData] = useState(false);
  const [providerValue, setProviderValue] = useState(0);

  const [uniName, setUniName] = useState(undefined);

  const [orderLabel, setOrderLabel] = useState("Order By");
  const [orderValue, setOrderValue] = useState(0);

  const [subId, setSubId] = useState(0);
  const [subName, setSubName] = useState("");

  // for tab
  const [activetab, setActivetab] = useState("1");

  // for hide/unhide table column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [buttonStatus, setButtonStatus] = useState(false);

  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");

  const history = useHistory();
  const { addToast } = useToasts();
  const [id, setId] = useState(0);

  const uniIDD = id;

  // add university handler
  const handleAddSubject = () => {
    localStorage.removeItem("subjectId");
    history.push(`/add-University-course/${id}`);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  useEffect(() => {
    get(`ProviderHelper/GetProviderId/${userType}/${referenceId}`).then(
      (res) => {
        setProviderValue(res != 0 ? res : 0);
        // if(res != 0){
        //   localStorage.setItem("providerValue", res);
        // }
      }
    );
  }, [userType, referenceId]);

  useEffect(() => {
    if (userType === userTypes?.ProviderAdmin) {
      get("UniversityDD/ProviderAdmin")
        .then((res) => {
          setUniversityList(res);
        })
        .catch();
    } else {
      get("UniversityDD/Index").then((res) => {
        setUniversityList(res);
      });
    }
  }, [providerValue]);

  useEffect(() => {
    get("IntakeDD/Index").then((res) => {
      setIntakeList(res);
    });
  }, []);
  useEffect(() => {
    get("EducationLevelDD/Index").then((res) => {
      setEducationList(res);
    });
  }, []);

  useEffect(() => {
    if (id) {
      get(`UniversityCampus/GetbyUniversity/${id}`).then((res) => {
        setCam(res);

        setUniName(res[0]?.university?.name);
        dispatch(StoreUniversityCampusListData(res));
      });
    } else {
      return;
    }
  }, [success1, id]);

  useEffect(() => {
    get(`TableDefination/Index/${tableIdList?.University_Subject_List}`).then(
      (res) => {
        console.log("table data", res);
        setTableData(res);
      }
    );
  }, [success1]);

  useEffect(() => {
    setLoading(true);

    get(
      `Subject/TableShowPaged?page=${currentPage}&pageSize=${dataPerPage}&educationLevelId=${educationValue}&UniversityId=${id}&intakeid=${intakeValue}&search=${searchStr}&sortby=${orderValue}`
    ).then((res) => {
      console.log(res);
      setSubList(res?.models);

      setSerialNum(res?.firstSerialNumber);
      setEntity(res?.totalEntity);
      setLoading(false);
    });
  }, [
    success,
    currentPage,
    dataPerPage,
    intakeValue,
    educationValue,
    // callApi,
    searchStr,
    // uniTypeId,
    // univerSList,
    uniValue,
    id,
    orderValue,
  ]);

  // const searchCampusByUniversity = (universityValue) =>{
  //   get(`UniversityCampus/GetbyUniversity/${universityValue}`)
  //   .then(res =>{
  //
  //   setCampList(res);
  // })
  // }

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setLoading(true);
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
  // const orderName = orderArr.map((dsn) => ({ label: dsn.label, value: dsn.value }));
  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    //
    setLoading(true);
    setOrderLabel(label);
    setOrderValue(value);
    setCallApi((prev) => !prev);
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

  // university dropdown options

  // campus dropdown options
  const intakeOption = intakeList?.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));
  const UniversityOption = universityList?.map((university) => ({
    label: university?.name,
    value: university?.id,
  }));
  const EducationLevelOption = educationList?.map((education) => ({
    label: education?.name,
    value: education?.id,
  }));

  // const selectUni = (label, value) => {
  //   setUniLabel(label);
  //   setUniValue(value);
  //   setCampLabel("Select Campus");
  //   setCampValue(0);
  //   searchCampusByUniversity(value);
  //   handleSearch();
  // };

  const selectUniversity = (label, value) => {
    setUniLabel(label);
    setUniValue(value);
    setId(value);
  };

  const selectIntake = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
    handleSearch();
  };

  const selectEducationLevel = (label, value) => {
    setEducationLabel(label);
    setEducationValue(value);
    handleSearch();
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  const handleDelete = (id) => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Subject/Delete/${id}`).then((action) => {
      setButtonStatus(false);
      setProgress(false);
      setSuccess(!success);
      setDeleteModal(false);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
    });
  };

  const toggleDanger = (name, id) => {
    setSubName(name);
    setSubId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSubName("");
    setSubId(0);
  };

  // on clear
  const handleClearSearch = () => {
    setUniLabel("Select University");
    setUniValue(0);
    setIntakeLabel("Select Intake");
    setIntakeValue(0);
    setEducationLabel("Select Education Level");
    setEducationValue(0);
    setCallApi((prev) => !prev);
    setSearchStr("");
    history.replace({
      universityId: null,
    });
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(subList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const handleView = (id) => {
    // localStorage.setItem('subIdPro', id);
    localStorage.removeItem("campIdSubProfile");
    history.push({
      pathname: `/subjectProfile/${id}`,
      uniSubList: uniIDD,
    });
  };

  // localStorage.removeItem("uniIdForSubList");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const handleEdit = (subId) => {
    history.push(`/add-University-course/${id}/${subId}`);
  };

  // for hide/unhide column

  const handleChecked = (e, columnId) => {
    // setCheckSlNo(e.target.checked);
    setCheck(e.target.checked);

    put(
      `TableDefination/Update/${tableIdList?.University_Subject_List}/${columnId}`
    ).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        // addToast(res?.data?.message, {
        //   appearance: "success",
        //   autoDismiss: true,
        // });
        setSuccess1(!success1);
      } else {
        // addToast(res?.data?.message, {
        //   appearance: "error",
        //   autoDismiss: true,
        // });
      }
    });
  };

  return (
    <div>
      <BreadCrumb
        title={
          uniName !== undefined ? <>Course List of {uniName}</> : "Course List"
        }
        backTo="University"
        path={`/universityList`}
      />

      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row>
            <Col md="3" sm="12">
              <Select
                options={UniversityOption}
                value={{ label: uniLabel, value: uniValue }}
                onChange={(opt) => selectUniversity(opt.label, opt.value)}
                name="campusId"
                id="campusId"
              />
            </Col>
            <Col md="3" sm="12">
              <Select
                options={intakeOption}
                value={{ label: intakeLabel, value: intakeValue }}
                onChange={(opt) => selectIntake(opt.label, opt.value)}
                name="campusId"
                id="campusId"
              />
            </Col>
            <Col md="3" sm="12">
              <Select
                options={EducationLevelOption}
                value={{ label: educationLabel, value: educationValue }}
                onChange={(opt) => selectEducationLevel(opt.label, opt.value)}
                name="campusId"
                id="campusId"
              />
            </Col>

            <Col md="3" sm="12">
              <Input
                style={{ height: "2.7rem" }}
                type="text"
                name="search"
                value={searchStr}
                id="search"
                placeholder="Course Title"
                onChange={searchValue}
                onKeyDown={handleKeyDown}
              />
            </Col>
          </Row>

          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div className="mt-1 mx-1" style={{ display: "flex" }}>
                  {uniValue !== 0 || intakeValue !== 0 || educationValue !== 0
                    ? ""
                    : ""}
                  {uniValue !== 0 ? (
                    <TagButton
                      label={uniLabel}
                      setValue={() => setUniValue(0)}
                      setLabel={() => setUniLabel("Select University")}
                    ></TagButton>
                  ) : (
                    ""
                  )}
                  {uniValue !== 0 && intakeValue !== 0 && educationValue !== 0
                    ? ""
                    : ""}
                  {intakeValue !== 0 ? (
                    <TagButton
                      label={intakeLabel}
                      setValue={() => setIntakeValue(0)}
                      setLabel={() => setIntakeLabel("Select Intake")}
                    ></TagButton>
                  ) : (
                    ""
                  )}
                  {intakeValue !== 0 && educationValue !== 0 ? "" : ""}
                  {educationValue !== 0 ? (
                    <TagButton
                      label={educationLabel}
                      setValue={() => setEducationValue(0)}
                      setLabel={() =>
                        setEducationLabel("Select Education Level")
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-1 mx-0 d-flex btn-clear">
                  {uniValue !== 0 ||
                  intakeValue !== 0 ||
                  educationValue !== 0 ? (
                    <button className="tag-clear" onClick={handleClearSearch}>
                      Clear All
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12">
              {permissions?.includes(permissionList?.Add_Subjects) ? (
                <ButtonForFunction
                  func={handleAddSubject}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={"Add"}
                  permission={6}
                />
              ) : null}
            </Col>

            <Col lg="7" md="7" sm="12" xs="12">
              <div className="d-flex flex-wrap justify-content-end">
                {/* <Col lg="2">
                    
                    <div className='ms-2'>
                      <ReactToPrint
                        trigger={()=><div className="uapp-print-icon">
                          <div className="text-right">
                            <span title="Print to pdf"> <i className="fas fa-print"></i> </span>
                          </div>
                        </div>}
                        content={() => componentRef.current}
                      />
                    </div>
                </Col> */}
                <div className="me-3 mb-2">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Order By :</div>
                    <div>
                      <Select
                        className="mr-md-2 mr-sm-0"
                        options={orderName}
                        value={{ label: orderLabel, value: orderValue }}
                        onChange={(opt) => selectOrder(opt.label, opt.value)}
                      />
                    </div>
                  </div>
                </div>

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

                          {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                            /> */}

                          <ReactHTMLTableToExcel
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
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>

          {loading ? (
            <div class="d-flex justify-content-center mb-5">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {tableData[0]?.isActive ? <th>Course Title</th> : null}
                    {tableData[1]?.isActive ? <th>Campus</th> : null}
                    {/* <th>Description</th>
                    <th>Duration</th> */}
                    {/* {checkUni ? <th>University</th> : null} */}
                    {tableData[2]?.isActive ? <th>Education Level</th> : null}
                    {tableData[3]?.isActive ? <th>Current Intake</th> : null}
                    {tableData[4]?.isActive ? <th>Applications</th> : null}
                    {tableData[5]?.isActive ? <th>Status</th> : null}

                    {tableData[6]?.isActive ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {subList?.map((sub, i) => (
                    <tr key={sub.id} style={{ textAlign: "center" }}>
                      {tableData[0]?.isActive ? (
                        <td>{sub?.courseTitle}</td>
                      ) : null}
                      {/* <td>{sub?.description}</td>

                      <td>
                        {sub?.duration}
                      </td> */}

                      {/* {checkUni ? <td>{sub?.universityName}</td> : null} */}

                      {tableData[1]?.isActive ? (
                        <td>{sub?.campus[0]}</td>
                      ) : null}

                      {tableData[2]?.isActive ? (
                        <td>{sub?.educationLevel}</td>
                      ) : null}

                      {tableData[3]?.isActive ? (
                        <td>{sub?.nextIntake}</td>
                      ) : null}
                      {tableData[4]?.isActive ? (
                        <td>{sub?.applicationCount}</td>
                      ) : null}
                      {tableData[5]?.isActive ? <td>{sub?.status}</td> : null}

                      {tableData[6]?.isActive ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {/* <Link to= "">
                          <Button onClick={()=>handleView(sub?.id)} color="primary" className="mx-1 btn-sm">
                            {" "}
                            <i className="fas fa-eye"></i>{" "}
                          </Button>
                        </Link> */}
                            {permissions?.includes(
                              permissionList?.View_Subject
                            ) ? (
                              <ButtonForFunction
                                func={() => handleView(sub?.id)}
                                color={"primary"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-eye"></i>}
                                permission={6}
                              />
                            ) : null}

                            {/* <Link to={`editSubject/${sub?.id}`}>
                            <Button color="dark" className="mx-1 btn-sm">
                              {" "}
                              <i className="fas fa-edit"></i>{" "}
                            </Button>
                          </Link> */}
                            {permissions?.includes(
                              permissionList?.Edit_Subjects
                            ) ? (
                              <LinkButton
                                url={`/add-University-course/${id}/${sub.id}`}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            ) : null}

                            {permissions?.includes(
                              permissionList?.Edit_Subjects
                            ) ? (
                              <LinkButton
                                url={`/copyAndAddUniversitySubject/${id}/${sub.id}`}
                                color={"primary"}
                                className={"mx-1 btn-sm"}
                                icon={
                                  <i
                                    style={{ paddingBottom: "4px" }}
                                    className="fas fa-file-import"
                                  ></i>
                                }
                                permission={6}
                              />
                            ) : null}

                            {/* <Button onClick={() => toggleDanger(sub?.name, sub?.id)} color="danger" className="mx-1 btn-sm">
                            <i className="fas fa-trash-alt"></i>
                          </Button> */}

                            {permissions?.includes(
                              permissionList?.Delete_Subjects
                            ) ? (
                              <ButtonForFunction
                                func={() => toggleDanger(sub?.name, sub?.id)}
                                color={"danger"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            ) : null}
                          </ButtonGroup>

                          <ConfirmModal
                            text="Do You Want To Delete This Subject ?"
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            confirm={() => handleDelete(subId)}
                            cancel={closeDeleteModal}
                            buttonStatus={buttonStatus}
                            progress={progress}
                          />
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />

          {/* <Row className="mb-3">
            <Col lg="6">
              
            </Col>

            <Col lg="6" md="7" sm="6" xs="8">
               <div className='d-flex justify-content-end'>
               <Button
                   onClick={handleNextTab}
                   className="btn btn-uapp-add "
                    >
                    {" "}
                     Next tab
                    {" "}
               </Button>
               </div>
             </Col>
          </Row> */}
        </CardBody>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  univerSityDropDownList: state.universityListReducer.universityList,
  campusDropDownList: state.universityCampusListReducer.universityCampusList,
});
export default Programs;
