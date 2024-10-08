import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";
import ButtonForFunction from "../../Components/ButtonForFunction";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import Select from "react-select";
import Pagination from "../../Pagination/Pagination";
import post from "../../../../helpers/post";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AdmissionManagerWiseAssignedSubject = () => {
  const history = useHistory();
  const { managerId } = useParams();
  const [data, setData] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [deleteModal, setDeleteModal] = useState(false);
  const [delData, setDelData] = useState({});
  const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkSubject, setCheckSubject] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkType, setCheckType] = useState(true);
  const [checkAction, setCheckAction] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [uni, setUni] = useState([]);
  const [uniLabel, setUniLabel] = useState("Select University");
  const [uniValue, setUniValue] = useState(0);

  const [statusLabel, setStatusLabel] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [serialNum, setSerialNum] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [subData, setSubData] = useState([]);
  const [progress, setProgress] = useState(false);

  const { addToast } = useToasts();
  const location = useLocation();

  useEffect(() => {
    get(`AdmissionManagerSubject/AssignedSubject/${managerId}`).then((res) => {
      setData(res);
    });

    get(`AdmissionManagerUniversityDD/UniversityList/${managerId}`).then(
      (res) => {
        setUni(res);
      }
    );

    get(
      `AdmissionManagerSubject/GetPagedAssignedSubjects?page=${currentPage}&pageSize=${dataPerPage}&UniversityId=${uniValue}&AdmissionManagerId=${managerId}&AssignedId=${statusValue}`
    ).then((res) => {
      setSubData(res?.models);
      setEntity(res?.totalEntity);
      setSerialNum(res?.firstSerialNumber);
    });
  }, [success, currentPage, dataPerPage, uniValue, managerId, statusValue]);

  const uniOption = uni.map((u) => ({
    label: u?.name,
    value: u?.id,
  }));

  const selectUni = (label, value) => {
    // setUniError(false);
    setUniLabel(label);
    setUniValue(value);
    handleSearch();
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    // setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  // user select status
  const statusArr = [
    {
      label: "Assigned",
      value: 1,
    },
    {
      label: "Unassigned",
      value: 2,
    },
    {
      label: "All",
      value: 3,
    },
  ];
  // const orderName = orderArr.map((dsn) => ({ label: dsn.label, value: dsn.value }));
  const statusName = statusArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectStatus = (label, value) => {
    //
    // setLoading(true);
    setStatusLabel(label);
    setStatusValue(value);
    // setCallApi((prev) => !prev);
    handleSearch();
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const backToDashboard = () => {
    if (location.proviiderId != undefined) {
      history.push(`/providerDetails/${location.proviiderId}`);
    } else {
      history.push("/admissionManagerList");
    }
  };

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelData({});
  };

  const handleDelete = () => {
    setButtonStatus(true);
    remove(`AdmissionManagerSubject/Remove/${delData?.id}/${managerId}`).then(
      (res) => {
        setButtonStatus(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setSuccess(!success);
        setDelData({});
        setDeleteModal(false);
      }
    );
  };

  const taggleModal = () => {
    // setRadioIsAcceptHome("false");
    // setRadioIsAcceptUk("true");
    // setRadioIsAcceptInt("false");
    // setSubValue(0);
    // setSubLabel("Select Course");
    // setData({});
    setModalOpen(false);
  };

  const componentRef = useRef();

  // on clear
  const handleClearSearch = () => {
    setUniValue(0);
    setUniLabel("Select University");
    setStatusLabel("Select Status");
    setStatusValue(0);
    setCallApi((prev) => !prev);
    // setReportData({});
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const assignSubject = (data) => {
    setProgress(true);
    post(`AdmissionManagerSubject/Create`, {
      admissionManagerId: managerId,
      subjectId: data?.subjectId,
    }).then((res) => {
      setProgress(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
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

  const removeSubject = (data) => {
    setProgress(true);
    remove(
      `AdmissionManagerSubject/Remove/${data?.subjectId}/${managerId}`
    ).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedSubject = (e) => {
    setCheckSubject(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedType = (e) => {
    setCheckType(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      <BreadCrumb
        title="Assigned Courses List"
        backTo={
          location.proviiderId != undefined
            ? "Provider Details"
            : "Admission Manager List"
        }
        path="/admissionManagerList"
      />

      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row className="mt-3">
            <Col lg="6" md="6" sm="12" xs="12" className="mb-2">
              <Select
                options={uniOption}
                value={{ label: uniLabel, value: uniValue }}
                onChange={(opt) => selectUni(opt.label, opt.value)}
                // isDisabled={data?.id != undefined}
                name="id"
                id="id"
              />
            </Col>

            <Col lg="6" md="6" sm="12" xs="12">
              <Select
                options={statusName}
                value={{ label: statusLabel, value: statusValue }}
                onChange={(opt) => selectStatus(opt.label, opt.value)}
                // isDisabled={data?.id != undefined}
                name="id"
                id="id"
              />
            </Col>
          </Row>

          <Row className="calenderProperty" style={{ position: "relative" }}>
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

      {uniValue !== 0 ? (
        <Card className="uapp-employee-search">
          <CardBody>
            <Row className="mb-3">
              <Col lg="6" md="5" sm="6" xs="4">
                {/* {
                permissions?.includes(permissionList.Assign_AdmissionManager_Subject) ?
                <ButtonForFunction
                func={() => setModalOpen(true)}
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                name={" Assign Course"}
                permission={6}
              />
              :
              null 
              } */}
              </Col>

              {/* assign sub modal starts here */}
              {/* <Modal
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

              </div>

              <Form onSubmit={handleSubmit}>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>
                      University <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="8">
                    <Select
                      options={uniOption}
                      value={{ label: uniLabel, value: uniValue }}
                      onChange={(opt) => selectUni(opt.label, opt.value)}
                      name="id"
                      id="id"
                    />
                    
                  </Col>
                </FormGroup>

                <p className="mt-4">
                  <b>Course List</b>
                </p>

                <FormGroup row className="">
                  <Col md="6">
                    <span>
                      Is Accept Home 
                    </span>
                  </Col>

                  <Col md="6">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="isAcceptHome"
                        name="isAcceptHome"
                        value="true"
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
                        name="isAcceptHome"
                        value="false"
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

                  <Button.Ripple disabled={buttonStatus1} type="submit" color="primary" className="mt-3">
                    Submit
                  </Button.Ripple>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal> */}
              {/* assign sub modal ends here */}

              <Col lg="6" md="6" sm="12" xs="12">
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
                      <DropdownMenu className="bg-dd-2">
                        <div className="d-flex justify-content-between">
                          <Col md="8" className="">
                            <p className="">SL/NO</p>
                          </Col>

                          <Col md="4" className="text-center">
                            <FormGroup check inline>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                onChange={(e) => {
                                  handleCheckedSLNO(e);
                                }}
                                defaultChecked={checkSlNo}
                              />
                            </FormGroup>
                          </Col>
                        </div>

                        <div className="d-flex justify-content-between">
                          <Col md="8" className="">
                            <p className="">Course</p>
                          </Col>

                          <Col md="4" className="text-center">
                            <FormGroup check inline>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                onChange={(e) => {
                                  handleCheckedSubject(e);
                                }}
                                defaultChecked={checkSubject}
                              />
                            </FormGroup>
                          </Col>
                        </div>

                        {/* <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">University</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedName(e);
                              }}
                              defaultChecked={checkName}
                            />
                          </FormGroup>
                        </Col>
                      </div> */}

                        {/* <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Requirement Type</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedType(e);
                              }}
                              defaultChecked={checkType}
                            />
                          </FormGroup>
                        </Col>
                      </div> */}

                        <div className="d-flex justify-content-between">
                          <Col md="8" className="">
                            <p className="">Action</p>
                          </Col>

                          <Col md="4" className="text-center">
                            <FormGroup check inline>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                onChange={(e) => {
                                  handleCheckedAction(e);
                                }}
                                defaultChecked={checkAction}
                              />
                            </FormGroup>
                          </Col>
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  {/* column hide unhide ends here */}
                </div>
              </Col>
            </Row>

            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {checkSlNo ? <th>SL/NO</th> : null}
                    {checkSubject ? <th>Courses</th> : null}
                    {/* {checkName ? <th>University</th> : null}   */}
                    {/* {checkType ? <th>Requirement Type</th> : null}    */}
                    {/* {
                    permissions?.includes(permissionList.Delete_AdmissionManager_Subject) ?
                    <> */}
                    {checkAction ? <th>Action</th> : null}
                    {/* </> :
                    null
                  } */}
                  </tr>
                </thead>
                <tbody>
                  {subData?.map((list, i) => (
                    <tr key={i} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{i + 1}</th> : null}
                      {checkSubject ? <td>{list?.subjectName}</td> : null}
                      {/* {checkName ? <td>{list?.university?.name}</td> : null} */}

                      {/* {checkType ? <td>{list?.isAcceptEU_UK ? 'EU_UK ': null} {list?.isAcceptHome ? 'Home ': null} {list.isAcceptInternational? 'International ' : null}</td> : null} */}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          {list?.isAssigned ? (
                            <>
                              {permissions?.includes(
                                permissionList.AdmissionManager_Assign_Subject
                              ) ? (
                                <Button
                                  color="danger"
                                  onClick={() => removeSubject(list)}
                                >
                                  {progress ? <ButtonLoader /> : "Remove"}
                                </Button>
                              ) : null}
                            </>
                          ) : (
                            <>
                              {permissions?.includes(
                                permissionList.Delete_AdmissionManager_Subject
                              ) ? (
                                <Button
                                  color="primary"
                                  onClick={() => assignSubject(list)}
                                >
                                  {progress ? <ButtonLoader /> : "Assign"}
                                </Button>
                              ) : null}
                            </>
                          )}

                          {/* <ButtonGroup variant="text">

                            {

                              permissions?.includes(permissionList.Delete_AdmissionManager_Subject) ?
                              <ButtonForFunction
                              color={"success"}
                              func={() => toggleDanger(list)}
                              className={"mx-1 btn-sm"}
                              // icon={<i className="fas fa-trash-alt"></i>}
                              name={"Assign"}
                              permission={6}
                            />
                            :
                            null
                            }
                         
                            {

                              permissions?.includes(permissionList.Delete_AdmissionManager_Subject) ?
                              <ButtonForFunction
                              color={"danger"}
                              func={() => toggleDanger(list)}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                            />
                            :
                            null
                            }
                            
                          </ButtonGroup>

                         {
                            permissions?.includes(permissionList.Delete_AdmissionOfficer_Subject) ?
                            <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this 
                                ? Once Deleted it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                            
                              <Button color="danger" onClick={handleDelete} disabled={buttonStatus}>
                                YES
                              </Button>
                              <Button
                                
                                onClick={closeDeleteModal}
                              >
                                NO
                              </Button>
                            </ModalFooter>
                          </Modal>
                          :
                          null
                         } */}
                        </td>
                      ) : null}
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
      ) : (
        <Card>
          <CardBody>
            <center>
              <b>Please select the university to see the Course list.</b>
            </center>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default AdmissionManagerWiseAssignedSubject;
