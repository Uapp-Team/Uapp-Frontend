import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  FormGroup,
} from "reactstrap";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import get from "../../../../../helpers/get";
import remove from "../../../../../helpers/remove";
import Select from "react-select";
import Pagination from "../../../Pagination/Pagination";
import ReactTableConvertToXl from "../../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import post from "../../../../../helpers/post";
import ButtonLoader from "../../../Components/ButtonLoader";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const AdmissionOfficerWiseAssignedSubject = () => {
  const history = useHistory();
  const { officerId } = useParams();
  const [data, setData] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [deleteModal, setDeleteModal] = useState(false);
  const [delData, setDelData] = useState({});
  const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [uni, setUni] = useState([]);
  const [uniLabel, setUniLabel] = useState("Select University");
  const [uniValue, setUniValue] = useState(0);
  const [statusLabel, setStatusLabel] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [subData, setSubData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  // for hide/unhide column
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkSubject, setCheckSubject] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkType, setCheckType] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [progress, setProgress] = useState(false);
  const { addToast } = useToasts();
  const location = useLocation();

  useEffect(() => {
    get(`AdmissionOfficerSubject/AssignedSubject/${officerId}`).then((res) => {
      setData(res);
    });

    get(`AdmissionOfficerUniversityDD/AdmissionOfficer/${officerId}`).then(
      (res) => {
        setUni(res);
      }
    );

    get(
      `AdmissionOfficerSubject/GetPagedAssignedSubjects?page=${currentPage}&pageSize=${dataPerPage}&UniversityId=${uniValue}&AdmissionofficerId=${officerId}&AssignedId=${statusValue}`
    ).then((res) => {
      setSubData(res?.models);
      setEntity(res?.totalEntity);
      setSerialNum(res?.firstSerialNumber);
    });
  }, [officerId, currentPage, dataPerPage, uniValue, statusValue, success]);

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const uniOption = uni.map((u) => ({
    label: u?.name,
    value: u?.id,
  }));

  const selectUni = (label, value) => {
    setUniLabel(label);
    setUniValue(value);
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

  const statusName = statusArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectStatus = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    handleSearch();
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // on clear
  const handleClearSearch = () => {
    setUniValue(0);
    setUniLabel("Select University");
    setStatusLabel("Select Status");
    setStatusValue(0);
    setCurrentPage(1);
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
    if (location.officerList != undefined) {
      history.push(`/providerDetails/${location.officerList}`);
    } else {
      history.push(`/admissionOfficerList`);
    }
  };

  const assignSubject = (data) => {
    setProgress(true);
    post(`AdmissionOfficerSubject/Create`, {
      admissionOfficerId: officerId,
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
      `AdmissionOfficerSubject/Remove/${data?.subjectId}/${officerId}`
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

  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  const componentRef = useRef();

  return (
    <div>
      <BreadCrumb
        title="Assigned Courses List"
        backTo={
          location.officerList !== undefined
            ? "Provider Details"
            : "Admission Officer List"
        }
        path={
          location.officerList != undefined
            ? `/providerDetails/${location.officerList}`
            : "/admissionOfficerList"
        }
      />

      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row className="mt-3">
            <Col lg="6" md="6" sm="12" xs="12" className="mb-2">
              <Select
                options={uniOption}
                value={{ label: uniLabel, value: uniValue }}
                onChange={(opt) => selectUni(opt.label, opt.value)}
                name="id"
                id="id"
              />
            </Col>

            <Col lg="6" md="6" sm="12" xs="12">
              <Select
                options={statusName}
                value={{ label: statusLabel, value: statusValue }}
                onChange={(opt) => selectStatus(opt.label, opt.value)}
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
              <Col lg="6" md="6" sm="12" xs="12"></Col>

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
                <thead className="tablehead">
                  <tr style={{ textAlign: "center" }}>
                    {/* {checkSlNo ? <th>SL/NO</th> : null} */}
                    {checkSubject ? <th>Courses</th> : null}
                    {checkAction ? <th>Action</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {subData?.map((list, i) => (
                    <tr key={i} style={{ textAlign: "center" }}>
                      {/* {checkSlNo ? <th scope="row">{i + 1}</th> : null} */}
                      {checkSubject ? <td>{list?.subjectName}</td> : null}
                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          {list?.isAssigned ? (
                            <>
                              {permissions?.includes(
                                permissionList.AdmissionOfficer_Assign_Subject
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
                                permissionList.AdmissionOfficer_Assign_Subject
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
              <b>Please select the university to see the subject list.</b>
            </center>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default AdmissionOfficerWiseAssignedSubject;
