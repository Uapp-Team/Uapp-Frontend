import React, { useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  FormGroup,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  Form,
  ModalHeader,
} from "reactstrap";
import Select from "react-select";
import Pagination from "../../SMS/Pagination/Pagination.jsx";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get.js";
import { useState } from "react";
import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import Loader from "../Search/Loader/Loader.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb.js";
import post from "../../../helpers/post.js";
import CancelButton from "../../../components/buttons/CancelButton.js";
import SaveButton from "../../../components/buttons/SaveButton.js";
import PopOverText from "../../../components/PopOverText.js";
import ColumnAssociates from "../TableColumn/ColumnAssociates.js";
import { CurrentUserInfo } from "../../../components/core/User.js";

const ConsultantByConsultant = () => {
  const associates = JSON.parse(sessionStorage.getItem("associates"));
  const { id } = useParams();
  const [consultantList, setConsultantList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [consultantError, setConsultantError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    associates?.currentPage ? associates?.currentPage : 1
  );
  const [dataPerPage, setDataPerPage] = useState(
    associates?.dataPerPage ? associates?.dataPerPage : 15
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  // const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  // const [delData, setDelData] = useState({});

  // for hide/unhide column
  const [tableData, setTableData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [progress, setProgress] = useState(false);
  const referenceId = localStorage.getItem("referenceId");
  const branchId = CurrentUserInfo?.tenantId;

  const userTypeId = localStorage.getItem("userType");
  const userType = localStorage.getItem("userType");
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  // const [InvitationList, setInvitationList] = useState([]);
  const [LevelReportList, setLevelReportList] = useState({});
  const [emailError, setEmailError] = useState("");
  const [popoverOpen, setPopoverOpen] = useState("");

  useEffect(() => {
    const tableColumnAssociates = JSON.parse(
      localStorage.getItem("ColumnAssociates")
    );
    tableColumnAssociates && setTableData(tableColumnAssociates);
    !tableColumnAssociates &&
      localStorage.setItem(
        "ColumnAssociates",
        JSON.stringify(ColumnAssociates)
      );
    !tableColumnAssociates && setTableData(ColumnAssociates);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "associates",
      JSON.stringify({
        currentPage: currentPage && currentPage,
        dataPerPage: dataPerPage && dataPerPage,
      })
    );
  }, [currentPage, dataPerPage]);

  useEffect(() => {
    if (id === undefined) {
      get(`Associate/Index?page=${currentPage}&pageSize=${dataPerPage}`).then(
        (res) => {
          console.log("Response", res);
          setConsultantList(res?.models);
          setEntity(res?.totalEntity);

          setLoading(false);
          setPageLoad(false);
        }
      );
    } else {
      get(`Associate/Index?page=${currentPage}&pageSize=${dataPerPage}`).then(
        (res) => {
          console.log(res);
          setConsultantList(res?.models);
          setEntity(res?.totalEntity);

          setLoading(false);
          setPageLoad(false);
        }
      );
    }
  }, [currentPage, dataPerPage, callApi, loading, success, id]);

  useEffect(() => {
    get(`LevelReport/Get`).then((action) => {
      setLevelReportList(action);

      console.log(action, "Level Report");
    });
  }, [id, referenceId, success]);

  useEffect(() => {
    get(`ConsultantDD/ByUserNew/${branchId}`).then((res) => {
      setConsultant(res);
    });
  }, [branchId]);

  const consultantOption = consultant?.map((c) => ({
    label: c?.name,
    value: c?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantError(false);
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
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

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // const handleDeleteData = () => {
  //   setProgress(true);
  //   remove(`Consultant/Delete/${delData?.id}`).then((res) => {
  //     setProgress(false);
  //     //
  //     addToast(res, {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //     setDeleteModal(false);
  //     setSuccess(!success);
  //   });
  // };

  const handleEdit = (data) => {
    history.push(`/consultantInformation/${data?.id}`);
  };

  const componentRef = useRef();

  const handleView = (consultantId) => {
    console.log(consultantId);
    if (userTypeId === userTypes?.Consultant.toString()) {
      history.push(`/associateDetails/${consultantId}`);
    } else {
      history.push(`/consultantProfile/${consultantId}`);
    }
  };

  // for hide/unhide column

  const handleChecked = (e, i) => {
    const values = [...tableData];
    values[i].isActive = e.target.checked;
    setTableData(values);
    localStorage.setItem("ColumnAssociates", JSON.stringify(values));
  };

  const handleAddAssociate = () => {
    id ? history.push(`/addConAssociate/${id}`) : history.push(`/addAssociate`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEmail("");
    setEmailError("");
    // setTitle("");
  };

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (!email) {
      isFormValid = false;
      setEmailError("Email is required");
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      isFormValid = false;
      setEmailError("Email is not Valid");
    }

    if (
      (userType === userTypes?.SalesManager ||
        userType === userTypes?.SystemAdmin) &&
      consultantValue === 0
    ) {
      isFormValid = false;
      setConsultantError(true);
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    console.log(consultantValue, "consultant value");

    event.preventDefault();
    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm();

    if (formIsValid === true) {
      setButtonStatus(true);
      setProgress(true);
      post(
        `Invitation/Send?${referenceId}=1& ${email}=asdfs@mial.com`,
        subData
      ).then((action) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
        setModalOpen(false);
        setEmail("");
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });

        // setTitle("");
      });
    }
  };

  const handleEmailError = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  return (
    <div>
      {pageLoad ? (
        <Loader />
      ) : (
        <>
          <BreadCrumb
            title="My Team"
            backTo={id === undefined ? "" : "Consultant"}
            path={id === undefined ? "" : "/consultantList"}
          />

          <Card className="uapp-employee-search zindex-100">
            <CardBody>
              <Row className="mb-3">
                <Col lg="5" md="5" sm="12" xs="12">
                  <div className="d-flex">
                    <div>
                      {permissions?.includes(permissionList?.Add_Associate) ? (
                        <ButtonForFunction
                          func={handleAddAssociate}
                          className={"btn btn-uapp-add "}
                          icon={<i className="fas fa-plus"></i>}
                          name={" Add Associate"}
                          permission={6}
                        />
                      ) : null}
                    </div>

                    <div className="mx-3">
                      {permissions?.includes(permissionList?.Add_Associate) ? (
                        <ButtonForFunction
                          func={() => setModalOpen(true)}
                          className={"btn btn-uapp-add "}
                          icon={<i className="fas fa-plus"></i>}
                          name={" Invite"}
                          permission={6}
                        />
                      ) : null}
                    </div>
                  </div>
                </Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
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

                    <div className="mr-2">
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

                    <div className="mr-2">
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

                    {/* <div className="me-3">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen1}
                    toggle={toggle1}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd">
                      <div className="d-flex justify-content-around align-items-center mt-2">
                        <div className="text-white cursor-pointer">
                          <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p>
                        </div>
                        <div className="text-white cursor-pointer">
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
                </div> */}
                  </div>
                </Col>
              </Row>

              <div>
                <Modal
                  isOpen={modalOpen}
                  toggle={closeModal}
                  className="uapp-modal2"
                >
                  <ModalHeader>Send an invitation to email </ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      {userType === userTypes?.Consultant && (
                        <input
                          type="hidden"
                          name="consultantId"
                          id="consultantId"
                          value={referenceId}
                        />
                      )}

                      {(userType === userTypes?.SalesManager ||
                        userType === userTypes?.SystemAdmin) && (
                        <FormGroup
                          row
                          className="has-icon-left position-relative"
                        >
                          <Col md="4">
                            {" "}
                            <span className="text-danger">*</span>Consultant
                          </Col>
                          <Col md="8">
                            <Select
                              options={consultantOption}
                              value={{
                                label: consultantLabel,
                                value: consultantValue,
                              }}
                              onChange={(opt) =>
                                selectConsultant(opt.label, opt.value)
                              }
                              name="consultantId"
                              id="consultantId"
                            />
                            {consultantError && (
                              <span className="text-danger">
                                consultant is required
                              </span>
                            )}
                          </Col>
                        </FormGroup>
                      )}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>
                            <span className="text-danger">*</span>Email
                          </span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            placeholder="Write Email"
                            onChange={(e) => {
                              handleEmailError(e);
                            }}
                          />
                          <span className="text-danger">{emailError}</span>
                        </Col>
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-between mt-3">
                        <CancelButton cancel={closeModal} />

                        <SaveButton
                          text="Send Email"
                          progress={progress}
                          buttonStatus={buttonStatus}
                        />
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>

              {loading ? (
                <h2 className="text-center">Loading...</h2>
              ) : (
                <div
                  className="table-responsive my-4 fixedhead"
                  ref={componentRef}
                >
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>Name</th> : null}
                        {tableData[1]?.isActive ? <th>Contact</th> : null}
                        {tableData[2]?.isActive ? <th>Designation</th> : null}
                        {tableData[3]?.isActive ? <th>C.Type</th> : null}
                        {tableData[4]?.isActive ? <th>Student</th> : null}
                        {tableData[5]?.isActive ? <th>Applications</th> : null}
                        {tableData[6]?.isActive ? <th>Associates</th> : null}
                        {tableData[7]?.isActive ? <th>Action</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {consultantList?.map((consultant, i) => (
                        <tr
                          key={consultant?.id}
                          style={{ textAlign: "center" }}
                        >
                          {tableData[0]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <span
                                onClick={() => {
                                  history.push(
                                    userTypeId === userTypes?.Consultant
                                      ? `/associateDetails/${consultant?.id}`
                                      : `/consultantProfile/${consultant?.id}`
                                  );
                                }}
                              >
                                {consultant?.fullName}
                              </span>
                            </td>
                          ) : null}
                          {tableData[1]?.isActive ? (
                            <td>
                              <div className="d-flex justify-content-center">
                                <PopOverText
                                  value={
                                    consultant?.phoneNumber &&
                                    consultant?.phoneNumber.includes("+")
                                      ? consultant?.phoneNumber
                                      : consultant?.phoneNumber &&
                                        !consultant?.phoneNumber.includes("+")
                                      ? "+" + consultant?.phoneNumber
                                      : null
                                  }
                                  // value={consultant?.phoneNumber}
                                  btn={<i class="fas fa-phone"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                                <PopOverText
                                  value={consultant?.email}
                                  btn={<i className="far fa-envelope"></i>}
                                  popoverOpen={popoverOpen}
                                  setPopoverOpen={setPopoverOpen}
                                />
                              </div>
                            </td>
                          ) : null}

                          {tableData[2]?.isActive ? (
                            <td>{consultant?.designation}</td>
                          ) : null}
                          {tableData[3]?.isActive ? (
                            <td>{consultant?.typeName}</td>
                          ) : null}
                          {tableData[4]?.isActive ? (
                            <>
                              {" "}
                              {userType !== userTypes?.Consultant ? (
                                <>
                                  {" "}
                                  {permissions?.includes(
                                    permissionList.View_Student_list
                                  ) ? (
                                    <>
                                      <td>
                                        <div style={{ marginTop: "5px" }}>
                                          <span
                                            onClick={() => {
                                              history.push(
                                                `/studentByConsultant/${consultant?.id}`
                                              );
                                            }}
                                            className="Count-first"
                                          >
                                            {consultant?.studentCount}
                                          </span>
                                        </div>
                                      </td>
                                    </>
                                  ) : null}
                                </>
                              ) : (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      className="Count-first"
                                      onClick={() => {
                                        history.push(
                                          `/studentByConsultant/${consultant?.id}`
                                        );
                                      }}
                                    >
                                      {consultant?.studentCount}
                                    </span>
                                  </div>
                                </td>
                              )}
                            </>
                          ) : null}

                          {tableData[5]?.isActive ? (
                            <>
                              {" "}
                              {userType === userTypes?.Consultant ? (
                                <>
                                  {permissions?.includes(
                                    permissionList.View_Application_List
                                  ) ? (
                                    <>
                                      <td>
                                        <div style={{ marginTop: "5px" }}>
                                          <span
                                            onClick={() => {
                                              history.push(
                                                `/applicationsFromAssociate/${consultant?.id}`
                                              );
                                            }}
                                            className="Count-second"
                                          >
                                            {consultant?.applicationCount}
                                          </span>
                                        </div>
                                      </td>
                                    </>
                                  ) : null}
                                </>
                              ) : (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span className="Count-second-no-pointer">
                                      {consultant?.applicationCount}
                                    </span>
                                  </div>
                                </td>
                              )}
                            </>
                          ) : null}

                          {/* <span
                            className="Count-second"
                            onClick={() => {
                              history.push(
                                `/applicationsFromAssociates/${consultant?.id}`
                              );
                            }}
                          >
                            {consultant?.applicationCount}
                          </span> */}

                          {tableData[6]?.isActive ? (
                            <>
                              {" "}
                              {userType !== userTypes?.Consultant ? (
                                <>
                                  {" "}
                                  {permissions?.includes(
                                    permissionList.View_Associate
                                  ) ? (
                                    <>
                                      <td>
                                        <div style={{ marginTop: "5px" }}>
                                          <span
                                            onClick={() => {
                                              history.push(
                                                `/associates/${consultant?.id}`
                                              );
                                            }}
                                            className="Count-third"
                                          >
                                            {consultant?.associateCount}
                                          </span>
                                        </div>
                                      </td>
                                    </>
                                  ) : null}{" "}
                                </>
                              ) : (
                                <td>
                                  <div style={{ marginTop: "5px" }}>
                                    <span
                                      className="Count-third"
                                      onClick={() => {
                                        history.push(
                                          `/associates/${consultant?.id}`
                                        );
                                      }}
                                    >
                                      {consultant?.associateCount}
                                    </span>
                                  </div>
                                </td>
                              )}
                            </>
                          ) : null}

                          {tableData[7]?.isActive ? (
                            <>
                              {" "}
                              <td
                                style={{ width: "8%" }}
                                className="text-center"
                              >
                                <ButtonGroup variant="text">
                                  {permissions?.includes(
                                    permissionList?.View_Associate
                                  ) ? (
                                    <ButtonForFunction
                                      func={() => handleView(consultant?.id)}
                                      color={"primary"}
                                      className={"mx-1 btn-sm"}
                                      icon={<i className="fas fa-eye"></i>}
                                      permission={6}
                                    />
                                  ) : null}

                                  {userType === userTypes.BranchManager ||
                                  userType === userTypes?.Admin ||
                                  userType === userTypes?.SystemAdmin ? (
                                    <ButtonForFunction
                                      func={() => handleEdit(consultant)}
                                      color={"warning"}
                                      className={"mx-1 btn-sm"}
                                      icon={<i className="fas fa-edit"></i>}
                                      permission={6}
                                    />
                                  ) : null}

                                  {/* {permissions?.includes(
                                  permissionList.Delete_Associate
                                ) ? (
                                  <>
                                    {consultant?.id !== 1 ? (
                                      <ButtonForFunction
                                        color={"danger"}
                                        className={"mx-1 btn-sm"}
                                        func={() => toggleDanger(consultant)}
                                        icon={
                                          <i className="fas fa-trash-alt"></i>
                                        }
                                        permission={6}
                                      />
                                    ) : // <Button color="danger" className="mx-1 btn-sm" disabled><i className="fas fa-trash-alt"></i></Button>
                                    null}
                                  </>
                                ) : null} */}
                                </ButtonGroup>
                                {/* <Modal
                                  isOpen={deleteModal}
                                  toggle={() => setDeleteModal(!deleteModal)}
                                  className="uapp-modal"
                                >
                                  <ModalBody>
                                    <p>
                                      Are You Sure to Delete this ? Once Deleted
                                      it can't be Undone!
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
                                </Modal> */}
                              </td>
                            </>
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
            </CardBody>
          </Card>

          {userType !== userTypes?.SalesManager && (
            <Card>
              <CardBody>
                <h5>Level Report</h5>

                <div className="table-responsive  mt-3">
                  <Table id="table-to-xls">
                    <thead className="tablehead">
                      <tr style={{ textAlign: "center" }}>
                        <th>Designation</th>
                        <th>Total Associates</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ textAlign: "center" }}>
                        <td>Business Development Manager</td>

                        <td>{LevelReportList?.businessDevelopmentManager}</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>Executive Director</td>

                        <td>{LevelReportList?.executiveDirector}</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>Senior Business Development Manager</td>

                        <td>
                          {LevelReportList?.seniorBusinessDevelopmentManager}
                        </td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>Senior Executive Marketing Officer</td>

                        <td>
                          {LevelReportList?.seniorExecutiveMarketingOfficer}
                        </td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>Student Advisor Marketing Officer</td>

                        <td>
                          {LevelReportList?.studentAdvisorMarketingOfficer}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default ConsultantByConsultant;
