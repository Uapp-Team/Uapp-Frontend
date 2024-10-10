import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Input,
  Form,
  FormGroup,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Select from "react-select";
import { useHistory, useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import get from "../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import remove from "../../../helpers/remove";
import Pagination from "../../SMS/Pagination/Pagination.jsx";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../Components/ButtonForFunction";
import LinkSpanButton from "../Components/LinkSpanButton";
import LinkButton from "../Components/LinkButton";
import put from "../../../helpers/put";
import post from "../../../helpers/post";
import { permissionList } from "../../../constants/AuthorizationConstant";
import ButtonLoader from "../Components/ButtonLoader";
import { tableIdList } from "../../../constants/TableIdConstant";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import ColumnCampusCourse from "../TableColumn/ColumnCampusCourse.js";

const CampusSubjectList = () => {
  const { camId } = useParams();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [subList, setSubList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [callApi, setCallApi] = useState(false);

  const [subId, setSubId] = useState(0);
  const [subName, setSubName] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [orderLabel, setOrderLabel] = useState("order by");
  const [orderValue, setOrderValue] = useState(0);

  // const univerSList = props.univerSityDropDownList[0];
  // const camppus = props.campusDropDownList[0];

  const [uniLabel, setUniLabel] = useState("Select University");
  const [uniValue, setUniValue] = useState(0);
  const [campLabel, setCampLabel] = useState("Select Campus");
  const [campValue, setCampValue] = useState(0);
  const [campList, setCampList] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [uniTypeId, setUTypeId] = useState(0);
  const [ulist, setUList] = useState([]);
  const [cam, setCam] = useState([]);
  const [campus, setCampus] = useState({});

  const [universityId, setUniversityId] = useState(undefined);

  const [subLabel, setSubLabel] = useState("Select Course");
  const [subValue, setSubValue] = useState(0);
  const [radioIsAcceptHome, setRadioIsAcceptHome] = useState("false");
  const [radioIsAcceptUk, setRadioIsAcceptUk] = useState("true");
  const [radioIsAcceptInt, setRadioIsAcceptInt] = useState("false");
  const [data, setData] = useState({});

  const [subError, setSubError] = useState(false);

  const [subListDD, setSubListDD] = useState([]);

  // for hide/unhide table column
  const [check1, setCheck1] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

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


  useEffect(() => {
    const tableColumnCampusCourse = JSON.parse(localStorage.getItem("ColumnCampusCourse"));
    tableColumnCampusCourse && setTableData(tableColumnCampusCourse);
    !tableColumnCampusCourse &&
      localStorage.setItem(
        "ColumnCampusCourse",
        JSON.stringify(ColumnCampusCourse)
      );

    !tableColumnCampusCourse && setTableData(ColumnCampusCourse)
  }, []);

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

  // redirect to dashboard
  const backToCampusList = () => {
    history.push(`/campusList/${universityId}`);
  };

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  useEffect(() => {
    // Course get by university
    get(`UniversityCampusSubject/GetUnassigned/${camId}`).then((res) => {
      setSubListDD(res);
    });

    get(
      `Subject/GetByCampusId?page=${currentPage}&pageSize=${dataPerPage}&CampusId=${camId}&search=${searchStr}&sortby=${orderValue}`
    ).then((res) => {
      setLoading(false);
      setSubList(res?.models);
      setEntity(res?.totalEntity);
    });
    get(`UniversityCampus/Get/${camId}`).then((res) => {
      setUniversityId(res?.university?.id);
      setCampus(res);
    });
  }, [
    success,
    currentPage,
    dataPerPage,
    callApi,
    searchStr,
    camId,
    orderValue,
  ]);

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
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

  const handleDelete = (id) => {
    setButtonStatus1(true);
    setProgress(true);
    const returnValue = remove(`UniversityCampusSubject/Delete/${id}`).then(
      (action) => {
        setButtonStatus1(false);
        setProgress(false);
        //

        setDeleteModal(false);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setSubName("");
        setSubId(0);
        setSuccess(false);
        setSuccess(true);
      }
    );
  };

  // add university handler
  const handleAddSubject = () => {
    // history.push("/addSubject");
    setModalOpen(true);
  };

  // on clear
  const handleClearSearch = () => {
    setCurrentPage(1);
    setUniLabel("Select University");
    setUniValue(0);
    setCampLabel("Select Campus");
    setCampValue(0);
    setCallApi((prev) => !prev);
    setSearchStr("");
  };

  // for subject dropdown
  const subMenu = subListDD.map((subOptions) => ({
    label: subOptions.name,
    value: subOptions.id,
  }));

  const selectSubject = (label, value) => {
    setSubError(false);
    setSubLabel(label);
    setSubValue(value);
  };

  // search handler
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

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(subList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const handleRedirectSubProfile = (id) => {
    // localStorage.setItem("campIdSubProfile", camId);
    history.push({
      pathname: `/subjectProfile/${id}`,
      campId: camId,
    });
  };

  // on change radio button starts here
  const onValueChangeIsAcceptHome = (event) => {
    setRadioIsAcceptHome(event.target.value);
  };

  const onValueChangeIsAcceptUk = (event) => {
    setRadioIsAcceptUk(event.target.value);
  };

  const onValueChangeIsAcceptInt = (event) => {
    setRadioIsAcceptInt(event.target.value);
  };
  // on change radio button ends here

  const taggleModal = () => {
    setRadioIsAcceptHome("false");
    setRadioIsAcceptUk("true");
    setRadioIsAcceptInt("false");
    setSubValue(0);
    setSubLabel("Select Course");
    setData({});
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = {
      campusId: camId,
      subjectId: subValue,
      isAcceptHome: radioIsAcceptHome == "true" ? true : false,
      isAcceptEU_UK: radioIsAcceptUk == "true" ? true : false,
      isAcceptInternational: radioIsAcceptInt == "true" ? true : false,
    };

    const subData1 = {
      id: data?.campusSubjectId,
      campusId: camId,
      subjectId: subValue,
      isAcceptHome: radioIsAcceptHome == "true" ? true : false,
      isAcceptEU_UK: radioIsAcceptUk == "true" ? true : false,
      isAcceptInternational: radioIsAcceptInt == "true" ? true : false,
    };

    if (data?.id != undefined) {
      setButtonStatus(true);
      setProgress1(true);
      put(`UniversityCampusSubject/Update`, subData1).then((res) => {
        setButtonStatus(false);
        setProgress1(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setData({});
          setModalOpen(false);
          setRadioIsAcceptHome("false");
          setRadioIsAcceptUk("true");
          setRadioIsAcceptInt("false");
          setSubValue(0);
          setSubLabel("Select Course");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      if (subValue == 0) {
        setSubError(true);
      } else {
        setButtonStatus(true);
        setProgress1(true);
        post(`UniversityCampusSubject/Create`, subData).then((res) => {
          setButtonStatus(false);
          setProgress1(false);

          if (res?.data?.isSuccess == true && res?.status == 200) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setRadioIsAcceptHome("false");
            setRadioIsAcceptUk("true");
            setRadioIsAcceptInt("false");
            setSubValue(0);
            setSubLabel("Select Course");
            setModalOpen(false);
          } else {
            addToast(res?.data?.message, {
              appearance: "danger",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const toggleEdit = (data) => {
    setData(data);
    setRadioIsAcceptHome(`${data?.isAcceptHome}`);
    setRadioIsAcceptInt(`${data?.isAcceptInternational}`);
    setRadioIsAcceptUk(`${data?.isAcceptEU_UK}`);
    setSubLabel(data?.name);
    setSubValue(data?.id);
    // setSubLabel("Select Course");
    setModalOpen(true);
  };

  // for hide/unhide column

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnCampusCourse", JSON.stringify(values));
  };


  return (
    <div>
      <BreadCrumb
        title="Campus Course"
        backTo="Campus"
        path={`/campusList/${universityId}`}
      />

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
                placeholder="Name"
                onChange={searchValue}
                onKeyDown={handleKeyDown}
              />
            </Col>

            {/* <Col lg="3" md="3" sm="6" xs="6">
              <div className="uapp-Search-div">
                <span>Reset</span>
            
              </div>
            </Col> */}
          </Row>

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div
                  className="mt-1 mx-1 d-flex btn-clear"
                  onClick={handleClearSearch}
                >
                  {/* <Icon.X  className='text-danger' />*/}
                  <span className="text-danger">
                    <i className="fa fa-times"></i> Clear
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          {campus?.name != undefined ? (
            <div className="test-score-div-1-style mt-1 mb-4">
              <span className="test-score-span-1-style">
                Showing Course list of <b>{campus?.name}</b>
              </span>
            </div>
          ) : null}

          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12">
              {permissions?.includes(permissionList.Add_Subjects) ? (
                <ButtonForFunction
                  func={handleAddSubject}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Assign Course"}
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
                          {i === 6 ? (
                            <>
                              {permissions?.includes(
                                permissionList.Edit_Subjects
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

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>

                    {tableData[0]?.isActive ? <th>Course</th> : null}
                    {tableData[1]?.isActive ? <th>Accept Home</th> : null}
                    {tableData[2]?.isActive ? <th>Accept EU/UK</th> : null}
                    {tableData[3]?.isActive ? (
                      <th>Accept International</th>
                    ) : null}
                    {tableData[4]?.isActive ? <th>Education Level</th> : null}
                    {tableData[5]?.isActive ? <th>Department</th> : null}

                    {permissions?.includes(permissionList.Edit_Subjects) ? (
                      <>{tableData[6]?.isActive ? <th>Intake</th> : null}</>
                    ) : null}
                    {tableData[7]?.isActive ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {subList?.map((sub, i) => (
                    <tr key={sub?.id} style={{ textAlign: "center" }}>

                      {tableData[0]?.isActive ? <td>{sub?.name}</td> : null}
                      {tableData[1]?.isActive ? (
                        <td>{sub?.isAcceptHome === false ? "No" : "Yes"}</td>
                      ) : null}
                      {tableData[2]?.isActive ? (
                        <td>{sub?.isAcceptEU_UK === false ? "No" : "Yes"}</td>
                      ) : null}
                      {tableData[3]?.isActive ? (
                        <td>
                          {sub?.isAcceptInternational === false ? "No" : "Yes"}
                        </td>
                      ) : null}

                      {tableData[4]?.isActive ? (
                        <td>{sub?.educationLevel?.name}</td>
                      ) : null}

                      {tableData[5]?.isActive ? (
                        <td>
                          {sub?.department?.name} ({sub?.subDepartment?.name})
                        </td>
                      ) : null}


                      {permissions?.includes(permissionList.Edit_Subjects) ? (
                        <>
                          {tableData[6]?.isActive ? (
                            <td>
                              {" "}
                              <span
                                className="badge badge-secondary"
                                style={{ cursor: "pointer" }}
                              >
                                {/* <Link className="text-decoration-none" to = {`/subjectIntake/${camId}/${sub?.id}`}> 
                          <span> View </span>
                          </Link> */}

                                <LinkSpanButton
                                  url={`/subjectIntake/${camId}/${sub?.id}`}
                                  className={"text-decoration-none"}
                                  data={"View"}
                                  permission={6}
                                />
                              </span>{" "}
                            </td>
                          ) : null}
                        </>
                      ) : null}

                      {tableData[7]?.isActive ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {/* <Link to= ""> */}
                            {/* <Button onClick={()=>handleRedirectSubProfile(sub?.id)} color="primary" className="mx-1 btn-sm">
                            {" "}
                            <i className="fas fa-eye"></i>{" "}
                          </Button> */}

                            {permissions?.includes(
                              permissionList.View_Subject
                            ) ? (
                              <ButtonForFunction
                                func={() => handleRedirectSubProfile(sub?.id)}
                                color={"primary"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-eye"></i>}
                                permission={6}
                              />
                            ) : null}

                            {/* </Link> */}

                            {/* <Link to={`/editSubject/${sub?.id}`}>
                            <Button color="dark" className="mx-1 btn-sm">
                              {" "}
                              <i className="fas fa-edit"></i>{" "}
                            </Button>
                          </Link> */}

                            {/* <LinkButton
                            url={`/addSubject/${sub?.id}`}
                            color={"warning"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-edit"></i>}
                            permission={6}
                          /> */}
                            {permissions?.includes(
                              permissionList.Edit_Subjects
                            ) ? (
                              <ButtonForFunction
                                func={() => toggleEdit(sub)}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            ) : null}

                            {/* <Button onClick={() => toggleDanger(sub?.name, sub?.id)} color="danger" className="mx-1 btn-sm">
                            <i className="fas fa-trash-alt"></i>
                          </Button> */}

                            {permissions?.includes(
                              permissionList.Delete_Subjects
                            ) ? (
                              <ButtonForFunction
                                func={() =>
                                  toggleDanger(sub?.name, sub?.campusSubjectId)
                                }
                                color={"danger"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            ) : null}
                          </ButtonGroup>

                          <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this <b>{subName}</b> ?
                                Once Deleted it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                disabled={buttonStatus1}
                                color="danger"
                                onClick={() => handleDelete(subId)}
                              >
                                {progress ? <ButtonLoader /> : "YES"}
                              </Button>
                              <Button onClick={closeDeleteModal}>NO</Button>
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

          {/* add or delete subject feature starts here */}
          <Modal
            isOpen={modalOpen}
            toggle={taggleModal}
            className="uapp-modal2"
          >
            <ModalBody>
              <div className="hedding-titel d-flex justify-content-between mb-4">
                <div>
                  <h5>
                    {" "}
                    <b>Course</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
                {/* <div className="text-right edit-style  p-3">
                               <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                               </div> */}
              </div>

              <Form onSubmit={handleSubmit}>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      Course <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={subMenu}
                      value={{ label: subLabel, value: subValue }}
                      onChange={(opt) => selectSubject(opt.label, opt.value)}
                      isDisabled={data?.id != undefined}
                      name="id"
                      id="id"
                    />
                    {subError ? (
                      <span className="text-danger">Course is required</span>
                    ) : null}
                  </Col>
                </FormGroup>

                <p className="mt-4">
                  <b>Course Features</b>
                </p>

                <FormGroup row className="">
                  <Col md="6">
                    <span>Is Accept Home</span>
                  </Col>

                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptHome"
                        onChange={onValueChangeIsAcceptHome}
                        name="isAcceptHome"
                        value="true"
                        checked={radioIsAcceptHome == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptHome"
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptHome"
                        onChange={onValueChangeIsAcceptHome}
                        name="isAcceptHome"
                        value="false"
                        checked={radioIsAcceptHome == "false"}
                      />

                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptHome"
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="">
                  <Col md="6">
                    <span>Is Accept EU/UK</span>
                  </Col>

                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptEU_UK"
                        onChange={onValueChangeIsAcceptUk}
                        name="isAcceptEU_UK"
                        value="true"
                        checked={radioIsAcceptUk == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptEU_UK"
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptEU_UK"
                        onChange={onValueChangeIsAcceptUk}
                        name="isAcceptEU_UK"
                        value="false"
                        checked={radioIsAcceptUk == "false"}
                      />

                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptEU_UK"
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup row className="">
                  <Col md="6">
                    <span>Is Accept International </span>
                  </Col>

                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptInternational"
                        onChange={onValueChangeIsAcceptInt}
                        name="isAcceptInternational"
                        value="true"
                        checked={radioIsAcceptInt == "true"}
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptInternational"
                      >
                        Yes
                      </Label>
                    </FormGroup>

                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptInternational"
                        onChange={onValueChangeIsAcceptInt}
                        name="isAcceptInternational"
                        value="false"
                        checked={radioIsAcceptInt == "false"}
                      />

                      <Label
                        className="form-check-label"
                        check
                        htmlFor="isAcceptInternational"
                      >
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>

                <FormGroup
                  className="has-icon-left position-relative"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    color="danger"
                    className="mr-2 mt-3"
                    onClick={taggleModal}
                  >
                    Cancel
                  </Button>

                  <Button.Ripple
                    disabled={buttonStatus}
                    type="submit"
                    color="primary"
                    className="mt-3"
                  >
                    {progress1 ? <ButtonLoader /> : "Submit"}
                  </Button.Ripple>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
          {/* add or delete subject feature ends here */}

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

export default CampusSubjectList;
